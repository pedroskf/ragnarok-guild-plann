import { useState, useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { Member, Group, PresencaData, EventType } from '@/lib/types'
import { PresenceSidebar } from '@/components/PresenceSidebar'
import { GroupCard } from '@/components/GroupCard'
import { ActionsToolbar } from '@/components/ActionsToolbar'
import { ImportDialog } from '@/components/ImportDialog'
import { MOCK_WOE_DATA, MOCK_TE_DATA } from '@/lib/mockData'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const [woePresenceData, setWoePresenceData] = useKV<PresencaData[]>('woe-presence', MOCK_WOE_DATA)
  const [tePresenceData, setTePresenceData] = useKV<PresencaData[]>('te-presence', MOCK_TE_DATA)
  const [groups, setGroups] = useKV<Group[]>('groups-config', [])
  
  const [draggingMember, setDraggingMember] = useState<Member | null>(null)
  const [dragOverGroupId, setDragOverGroupId] = useState<number | null>(null)
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  const allMembers: Member[] = [
    ...(woePresenceData || []).map((p) => ({
      ...p,
      id: `woe-${p.user_id}`,
      eventType: 'woe' as EventType
    })),
    ...(tePresenceData || []).map((p) => ({
      ...p,
      id: `te-${p.user_id}`,
      eventType: 'te' as EventType
    }))
  ]

  useEffect(() => {
    if (!groups || groups.length === 0) {
      const initialGroups: Group[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Grupo ${i + 1}`,
        members: []
      }))
      setGroups(initialGroups)
    }
  }, [groups, setGroups])

  const handleDragStart = useCallback((e: React.DragEvent, member: Member) => {
    setDraggingMember(member)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', member.id)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggingMember(null)
    setDragOverGroupId(null)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, groupId: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverGroupId(groupId)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverGroupId(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, groupId: number) => {
    e.preventDefault()
    
    if (!draggingMember) return

    setGroups((currentGroups) => {
      if (!currentGroups) return []
      
      const updatedGroups = currentGroups.map(group => {
        if (group.id === groupId) {
          if (group.members.length >= 12) {
            toast.error(`${group.name} já está cheio (12/12)`)
            return group
          }

          const memberExists = group.members.some(m => m.id === draggingMember.id)
          if (memberExists) {
            toast.info('Membro já está neste grupo')
            return group
          }

          return {
            ...group,
            members: [...group.members, draggingMember]
          }
        }
        return group
      })
      
      return updatedGroups
    })

    setDraggingMember(null)
    setDragOverGroupId(null)
  }, [draggingMember, setGroups])

  const handleRemoveMember = useCallback((groupId: number, memberId: string) => {
    setGroups((currentGroups) => {
      if (!currentGroups) return []
      return currentGroups.map(group =>
        group.id === groupId
          ? { ...group, members: group.members.filter(m => m.id !== memberId) }
          : group
      )
    })
    toast.success('Membro removido')
  }, [setGroups])

  const handleResetGroup = useCallback((groupId: number) => {
    setGroups((currentGroups) => {
      if (!currentGroups) return []
      return currentGroups.map(group =>
        group.id === groupId ? { ...group, members: [] } : group
      )
    })
    toast.success('Grupo resetado')
  }, [setGroups])

  const handleResetAll = useCallback(() => {
    if (window.confirm('Tem certeza que deseja resetar todos os grupos?')) {
      setGroups((currentGroups) => {
        if (!currentGroups) return []
        return currentGroups.map(group => ({ ...group, members: [] }))
      })
      toast.success('Todos os grupos foram resetados')
    }
  }, [setGroups])

  const handleImportData = useCallback((woeData: PresencaData[], teData: PresencaData[]) => {
    if (woeData.length > 0) {
      setWoePresenceData(woeData)
    }
    if (teData.length > 0) {
      setTePresenceData(teData)
    }
    
    setGroups((currentGroups) => {
      if (!currentGroups) return []
      return currentGroups.map(group => ({ ...group, members: [] }))
    })
  }, [setWoePresenceData, setTePresenceData, setGroups])

  if (!groups || groups.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <PresenceSidebar
        members={allMembers}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggingMemberId={draggingMember?.id || null}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border p-4 bg-card/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Gerenciador de Plantel WOE
              </h1>
              <p className="text-sm text-muted-foreground">
                Organize os membros da guild em grupos táticos
              </p>
            </div>
            
            <ActionsToolbar
              groups={groups}
              onResetAll={handleResetAll}
              onImportData={() => setImportDialogOpen(true)}
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onDrop={handleDrop}
                onDragOver={(e) => handleDragOver(e, group.id)}
                onDragLeave={handleDragLeave}
                onRemoveMember={handleRemoveMember}
                onResetGroup={handleResetGroup}
                isDragOver={dragOverGroupId === group.id}
                isOverCapacity={group.members.length > 12}
              />
            ))}
          </div>
        </main>
      </div>

      <ImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImportData}
      />

      <Toaster position="bottom-right" />
    </div>
  )
}

export default App