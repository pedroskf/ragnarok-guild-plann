import { useState, useEffect, useCallback, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Member, Group, PresencaData, EventType } from '@/lib/types'
import { PresenceSidebar } from '@/components/PresenceSidebar'
import { GroupCard } from '@/components/GroupCard'
import { ActionsToolbar } from '@/components/ActionsToolbar'
import { ImportDialog } from '@/components/ImportDialog'
import { AddMemberDialog } from '@/components/AddMemberDialog'
import { MOCK_WOE_DATA, MOCK_TE_DATA } from '@/lib/mockData'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sword, Shield } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

function App() {
  const [woePresenceData, setWoePresenceData] = useKV<PresencaData[]>('woe-presence', MOCK_WOE_DATA)
  const [tePresenceData, setTePresenceData] = useKV<PresencaData[]>('te-presence', MOCK_TE_DATA)
  const [woeGroups, setWoeGroups] = useKV<Group[]>('woe-groups-config', [])
  const [teGroups, setTeGroups] = useKV<Group[]>('te-groups-config', [])
  const [activeEvent, setActiveEvent] = useState<EventType>('woe')
  
  const [draggingMember, setDraggingMember] = useState<Member | null>(null)
  const [dragOverGroupId, setDragOverGroupId] = useState<number | null>(null)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const woeMembers: Member[] = (woePresenceData || []).map((p) => ({
    ...p,
    id: `woe-${p.user_id}`,
    eventType: 'woe' as EventType
  }))

  const teMembers: Member[] = (tePresenceData || []).map((p) => ({
    ...p,
    id: `te-${p.user_id}`,
    eventType: 'te' as EventType
  }))

  const activeGroups = activeEvent === 'woe' ? woeGroups : teGroups
  const setActiveGroups = activeEvent === 'woe' ? setWoeGroups : setTeGroups
  
  // Calcular membros alocados em grupos
  const allocatedMemberIds = useMemo(() => {
    const ids = new Set<string>()
    ;(activeGroups || []).forEach(group => {
      group.members.forEach(member => ids.add(member.id))
    })
    return ids
  }, [activeGroups])
  
  // Membros disponíveis (não alocados)
  const allMembers = activeEvent === 'woe' ? woeMembers : teMembers
  const availableMembers = useMemo(() => {
    return allMembers.filter(member => !allocatedMemberIds.has(member.id))
  }, [allMembers, allocatedMemberIds])

  useEffect(() => {
    if (!woeGroups || woeGroups.length === 0) {
      const initialGroups: Group[] = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `Grupo WOE ${i + 1}`,
        members: [],
        eventType: 'woe' as EventType
      }))
      setWoeGroups(initialGroups)
    }
  }, [woeGroups, setWoeGroups])

  useEffect(() => {
    if (!teGroups || teGroups.length === 0) {
      const initialGroups: Group[] = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `Grupo TE ${i + 1}`,
        members: [],
        eventType: 'te' as EventType
      }))
      setTeGroups(initialGroups)
    }
  }, [teGroups, setTeGroups])

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

    // Validar se o membro pertence ao evento correto
    if (draggingMember.eventType !== activeEvent) {
      toast.error(`Não é possível adicionar membros ${draggingMember.eventType.toUpperCase()} em grupos ${activeEvent.toUpperCase()}`)
      setDraggingMember(null)
      setDragOverGroupId(null)
      return
    }

    setActiveGroups((currentGroups) => {
      if (!currentGroups) return []
      
      // Verificar se está tentando dropar no mesmo grupo onde já está
      const sourceGroup = currentGroups.find(g => g.members.some(m => m.id === draggingMember.id))
      if (sourceGroup && sourceGroup.id === groupId) {
        toast.info('Membro já está neste grupo')
        return currentGroups
      }

      // Verificar capacidade do grupo de destino
      const targetGroup = currentGroups.find(g => g.id === groupId)
      if (targetGroup && targetGroup.members.length >= 12) {
        toast.error(`${targetGroup.name} já está cheio (12/12)`)
        return currentGroups
      }

      // Remover membro de qualquer grupo que ele esteja e adicionar ao novo grupo
      const updatedGroups = currentGroups.map(group => {
        // Remover de qualquer grupo existente
        if (group.members.some(m => m.id === draggingMember.id)) {
          return {
            ...group,
            members: group.members.filter(m => m.id !== draggingMember.id)
          }
        }
        // Adicionar ao grupo de destino
        if (group.id === groupId) {
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
  }, [draggingMember, activeEvent, setActiveGroups])

  const handleRemoveMember = useCallback((groupId: number, memberId: string) => {
    setActiveGroups((currentGroups) => {
      if (!currentGroups) return []
      return currentGroups.map(group =>
        group.id === groupId
          ? { ...group, members: group.members.filter(m => m.id !== memberId) }
          : group
      )
    })
    toast.success('Membro removido')
  }, [setActiveGroups])

  const handleResetGroup = useCallback((groupId: number) => {
    setActiveGroups((currentGroups) => {
      if (!currentGroups) return []
      return currentGroups.map(group =>
        group.id === groupId ? { ...group, members: [] } : group
      )
    })
    toast.success('Grupo resetado')
  }, [setActiveGroups])

  const handleResetAll = useCallback(() => {
    if (window.confirm(`Tem certeza que deseja resetar todos os grupos ${activeEvent.toUpperCase()}?`)) {
      setActiveGroups((currentGroups) => {
        if (!currentGroups) return []
        return currentGroups.map(group => ({ ...group, members: [] }))
      })
      toast.success(`Todos os grupos ${activeEvent.toUpperCase()} foram resetados`)
    }
  }, [setActiveGroups, activeEvent])

  const handleClearPresence = useCallback(() => {
    const eventName = activeEvent.toUpperCase()
    const currentData = activeEvent === 'woe' ? woePresenceData : tePresenceData
    const memberCount = currentData?.length || 0

    if (memberCount === 0) {
      toast.info(`Não há presenças ${eventName} para limpar`)
      return
    }

    if (window.confirm(`Tem certeza que deseja limpar todas as ${memberCount} confirmações de presença ${eventName}? Esta ação também removerá os membros dos grupos.`)) {
      if (activeEvent === 'woe') {
        setWoePresenceData([])
        setWoeGroups((currentGroups) => {
          if (!currentGroups) return []
          return currentGroups.map(group => ({ ...group, members: [] }))
        })
      } else {
        setTePresenceData([])
        setTeGroups((currentGroups) => {
          if (!currentGroups) return []
          return currentGroups.map(group => ({ ...group, members: [] }))
        })
      }
      toast.success(`Todas as presenças ${eventName} foram limpas`)
    }
  }, [activeEvent, woePresenceData, tePresenceData, setWoePresenceData, setTePresenceData, setWoeGroups, setTeGroups])

  const handleAddMember = useCallback((memberData: PresencaData, eventType: EventType) => {
    if (eventType === 'woe') {
      setWoePresenceData((current) => [...(current || []), memberData])
    } else {
      setTePresenceData((current) => [...(current || []), memberData])
    }
  }, [setWoePresenceData, setTePresenceData])

  const handleImportData = useCallback((woeData: PresencaData[], teData: PresencaData[]) => {
    if (woeData.length > 0) {
      setWoePresenceData(woeData)
      // Reset grupos WOE ao importar novos dados
      setWoeGroups((currentGroups) => {
        if (!currentGroups) return []
        return currentGroups.map(group => ({ ...group, members: [] }))
      })
    }
    if (teData.length > 0) {
      setTePresenceData(teData)
      // Reset grupos TE ao importar novos dados
      setTeGroups((currentGroups) => {
        if (!currentGroups) return []
        return currentGroups.map(group => ({ ...group, members: [] }))
      })
    }
  }, [setWoePresenceData, setTePresenceData, setWoeGroups, setTeGroups])

  if ((!woeGroups || woeGroups.length === 0) && (!teGroups || teGroups.length === 0)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <PresenceSidebar
        members={availableMembers}
        totalMembers={allMembers.length}
        allocatedCount={allocatedMemberIds.size}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggingMemberId={draggingMember?.id || null}
        activeEvent={activeEvent}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
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
              groups={activeGroups || []}
              onResetAll={handleResetAll}
              onImportData={() => setImportDialogOpen(true)}
              onAddMember={() => setAddMemberDialogOpen(true)}
              onClearPresence={handleClearPresence}
              activeEvent={activeEvent}
            />
          </div>
        </header>

        <div className="border-b border-border p-4 bg-muted/20">
          <Tabs value={activeEvent} onValueChange={(v) => setActiveEvent(v as EventType)}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger 
                value="woe" 
                className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Sword size={16} className="mr-2" weight="bold" />
                WOE ({woeMembers.length} membros)
              </TabsTrigger>
              <TabsTrigger 
                value="te" 
                className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Shield size={16} className="mr-2" weight="bold" />
                WOE TE ({teMembers.length} membros)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <main className="flex-1 overflow-y-auto p-4">
          <div 
            data-groups-container
            className={cn(
              "grid gap-3 transition-all duration-300",
              sidebarCollapsed 
                ? "grid-cols-4"
                : "grid-cols-3"
            )}
          >
            {(activeGroups || []).map((group) => (
              <GroupCard
                key={`${group.eventType}-${group.id}`}
                group={group}
                onDrop={handleDrop}
                onDragOver={(e) => handleDragOver(e, group.id)}
                onDragLeave={handleDragLeave}
                onRemoveMember={handleRemoveMember}
                onResetGroup={handleResetGroup}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggingMemberId={draggingMember?.id || null}
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

      <AddMemberDialog
        open={addMemberDialogOpen}
        onOpenChange={setAddMemberDialogOpen}
        onAddMember={handleAddMember}
        activeEvent={activeEvent}
      />

      <Toaster position="bottom-right" />
    </div>
  )
}

export default App