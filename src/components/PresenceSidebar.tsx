import { Member, EventType } from '@/lib/types'
import { MemberCard } from './MemberCard'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { MagnifyingGlass, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PresenceSidebarProps {
  members: Member[]
  totalMembers: number
  allocatedCount: number
  onDragStart: (e: React.DragEvent, member: Member) => void
  onDragEnd: () => void
  draggingMemberId: string | null
  activeEvent: EventType
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function PresenceSidebar({
  members,
  totalMembers,
  allocatedCount,
  onDragStart,
  onDragEnd,
  draggingMemberId,
  activeEvent,
  isCollapsed,
  onToggleCollapse
}: PresenceSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMembers = useMemo(() => {
    let filtered = members

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
      if (a.classe !== b.classe) {
        return a.classe.localeCompare(b.classe)
      }
      return b.nivel - a.nivel
    })
  }, [members, searchQuery])

  return (
    <div className={cn(
      "bg-muted/30 border-r border-border flex flex-col h-full transition-all duration-300 relative",
      isCollapsed ? "w-16" : "w-96"
    )}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="absolute top-4 -right-3 z-10 h-6 w-6 rounded-full bg-card border border-border shadow-md hover:bg-accent"
      >
        {isCollapsed ? (
          <CaretRight size={16} weight="bold" />
        ) : (
          <CaretLeft size={16} weight="bold" />
        )}
      </Button>

      {!isCollapsed && (
        <>
          <div className="p-4 border-b border-border space-y-4 flex-shrink-0">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">
            Disponíveis {activeEvent.toUpperCase()}
          </h2>
          <p className="text-xs text-muted-foreground">
            {members.length} disponíveis · {allocatedCount} alocados · {totalMembers} total
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
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                {searchQuery 
                  ? 'Nenhum membro encontrado' 
                  : members.length === 0 
                    ? 'Todos os membros foram alocados!' 
                    : 'Nenhum membro disponível'}
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
        </>
      )}

      {isCollapsed && (
        <div className="flex items-center justify-center h-full">
          <div className="transform -rotate-90 whitespace-nowrap text-sm font-mono text-muted-foreground">
            {members.length}/{totalMembers}
          </div>
        </div>
      )}
    </div>
  )
}
