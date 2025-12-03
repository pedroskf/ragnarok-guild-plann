import { Member, EventType } from '@/lib/types'
import { MemberCard } from './MemberCard'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MagnifyingGlass, Sword, Shield } from '@phosphor-icons/react'
import { useState, useMemo } from 'react'

interface PresenceSidebarProps {
  members: Member[]
  onDragStart: (e: React.DragEvent, member: Member) => void
  onDragEnd: () => void
  draggingMemberId: string | null
}

export function PresenceSidebar({
  members,
  onDragStart,
  onDragEnd,
  draggingMemberId
}: PresenceSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [eventFilter, setEventFilter] = useState<EventType | 'all'>('all')

  const filteredMembers = useMemo(() => {
    let filtered = members

    if (eventFilter !== 'all') {
      filtered = filtered.filter(m => m.eventType === eventFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        m =>
          m.char.toLowerCase().includes(query) ||
          m.nome.toLowerCase().includes(query) ||
          m.classe.toLowerCase().includes(query)
      )
    }

    return filtered.sort((a, b) => {
      if (a.eventType !== b.eventType) {
        return a.eventType === 'woe' ? -1 : 1
      }
      if (a.classe !== b.classe) {
        return a.classe.localeCompare(b.classe)
      }
      return b.nivel - a.nivel
    })
  }, [members, searchQuery, eventFilter])

  const woeCount = members.filter(m => m.eventType === 'woe').length
  const teCount = members.filter(m => m.eventType === 'te').length

  return (
    <div className="w-80 bg-muted/30 border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">
            Lista de Presença
          </h2>
          <p className="text-xs text-muted-foreground">
            {members.length} confirmados · {woeCount} WOE · {teCount} TE
          </p>
        </div>

        <div className="relative">
          <MagnifyingGlass
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Buscar por nome ou classe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs value={eventFilter} onValueChange={(v) => setEventFilter(v as EventType | 'all')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="text-xs">
              Todos
            </TabsTrigger>
            <TabsTrigger value="woe" className="text-xs">
              <Sword size={14} className="mr-1" />
              WOE
            </TabsTrigger>
            <TabsTrigger value="te" className="text-xs">
              <Shield size={14} className="mr-1" />
              TE
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {searchQuery ? 'Nenhum membro encontrado' : 'Nenhum membro confirmado'}
            </div>
          ) : (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                isDragging={draggingMemberId === member.id}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
