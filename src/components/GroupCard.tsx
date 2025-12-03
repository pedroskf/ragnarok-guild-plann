import { Group, Member } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MemberCard } from './MemberCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from '@phosphor-icons/react'

interface GroupCardProps {
  group: Group
  onDrop: (e: React.DragEvent, groupId: number) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onRemoveMember: (groupId: number, memberId: string) => void
  onResetGroup: (groupId: number) => void
  onDragStart?: (e: React.DragEvent, member: Member) => void
  onDragEnd?: () => void
  draggingMemberId?: string | null
  isDragOver?: boolean
  isOverCapacity?: boolean
}

export function GroupCard({
  group,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemoveMember,
  onResetGroup,
  onDragStart,
  onDragEnd,
  draggingMemberId,
  isDragOver,
  isOverCapacity
}: GroupCardProps) {
  const memberCount = group.members.length
  const isNearCapacity = memberCount >= 10
  const isFull = memberCount >= 12

  return (
    <div
      onDrop={(e) => onDrop(e, group.id)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        'bg-card border-2 rounded-lg p-3 flex flex-col min-h-[200px]',
        'transition-all duration-200',
        isDragOver && !isFull && 'border-accent shadow-lg shadow-accent/20 bg-accent/5',
        isDragOver && isFull && 'border-destructive shadow-lg shadow-destructive/20 bg-destructive/5',
        !isDragOver && isFull && 'border-destructive/50',
        !isDragOver && !isFull && 'border-border hover:border-border/70'
      )}
    >
      <div className="flex items-center justify-center mb-2 flex-shrink-0 relative">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-foreground">
            {group.name}
          </h3>
          <Badge
            variant={isFull ? 'destructive' : isNearCapacity ? 'secondary' : 'outline'}
            className={cn(
              'font-mono text-[10px] px-1.5 py-0',
              !isFull && !isNearCapacity && 'border-accent/50 text-accent'
            )}
          >
            {memberCount}/12
          </Badge>
        </div>
        
        {memberCount > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onResetGroup(group.id)}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive absolute right-0"
          >
            <X size={14} weight="bold" />
          </Button>
        )}
      </div>

      <div className="flex-1">
        {group.members.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[150px] text-muted-foreground text-xs">
            Arraste membros aqui
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1">
            {group.members.map((member) => (
              <div key={member.id} className="relative group/member">
                <MemberCard 
                  member={member} 
                  compact 
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  isDragging={draggingMemberId === member.id}
                />
                <button
                  onClick={() => onRemoveMember(group.id, member.id)}
                  className="absolute top-0.5 right-0.5 opacity-0 group-hover/member:opacity-100 transition-opacity bg-destructive text-destructive-foreground rounded p-0.5 hover:bg-destructive/90 z-10"
                >
                  <X size={10} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFull && (
        <div className="mt-2 text-[10px] text-destructive font-medium text-center flex-shrink-0">
          Cheio (12/12)
        </div>
      )}
    </div>
  )
}
