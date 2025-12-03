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
        'bg-card border-2 rounded-lg p-4 min-h-[400px] flex flex-col',
        'transition-all duration-200',
        isDragOver && !isFull && 'border-accent shadow-lg shadow-accent/20 bg-accent/5',
        isDragOver && isFull && 'border-destructive shadow-lg shadow-destructive/20 bg-destructive/5',
        !isDragOver && isFull && 'border-destructive/50',
        !isDragOver && !isFull && 'border-border hover:border-border/70'
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">
            {group.name}
          </h3>
          <Badge
            variant={isFull ? 'destructive' : isNearCapacity ? 'secondary' : 'outline'}
            className={cn(
              'font-mono text-xs',
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
            className="h-7 px-2 text-muted-foreground hover:text-destructive"
          >
            <X size={16} weight="bold" />
          </Button>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {group.members.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Arraste membros aqui
          </div>
        ) : (
          group.members.map((member) => (
            <div key={member.id} className="relative group/member">
              <MemberCard member={member} compact />
              <button
                onClick={() => onRemoveMember(group.id, member.id)}
                className="absolute top-1 right-1 opacity-0 group-hover/member:opacity-100 transition-opacity bg-destructive text-destructive-foreground rounded p-1 hover:bg-destructive/90"
              >
                <X size={12} weight="bold" />
              </button>
            </div>
          ))
        )}
      </div>

      {isFull && (
        <div className="mt-3 text-xs text-destructive font-medium text-center">
          Grupo cheio (máximo 12)
        </div>
      )}
    </div>
  )
}
