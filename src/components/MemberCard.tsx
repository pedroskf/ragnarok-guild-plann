import { Member } from '@/lib/types'
import { getClassColor, getClassAbbr } from '@/lib/classMapping'
import { cn } from '@/lib/utils'
import { DotsSixVertical } from '@phosphor-icons/react'

interface MemberCardProps {
  member: Member
  isDragging?: boolean
  onDragStart?: (e: React.DragEvent, member: Member) => void
  onDragEnd?: () => void
  compact?: boolean
}

export function MemberCard({ 
  member, 
  isDragging, 
  onDragStart, 
  onDragEnd,
  compact = false 
}: MemberCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, member)}
      onDragEnd={onDragEnd}
      className={cn(
        'bg-card border border-border rounded-lg cursor-grab active:cursor-grabbing',
        'transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] hover:border-accent/50',
        isDragging && 'opacity-50 scale-95',
        compact ? 'p-2' : 'p-3'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div
            className={cn(
              'rounded-md flex items-center justify-center text-white font-bold text-xs',
              getClassColor(member.classe),
              compact ? 'w-10 h-10' : 'w-12 h-12'
            )}
          >
            {getClassAbbr(member.classe)}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={cn(
              'font-semibold text-foreground truncate',
              compact ? 'text-xs' : 'text-sm'
            )}>
              {member.char}
            </p>
            <span className={cn(
              'text-muted-foreground',
              compact ? 'text-[10px]' : 'text-xs'
            )}>
              Lv{member.nivel}
            </span>
          </div>
          <p className={cn(
            'text-muted-foreground truncate',
            compact ? 'text-[10px]' : 'text-xs'
          )}>
            {member.nome}
          </p>
          {!compact && (
            <p className="text-[10px] text-muted-foreground/70 truncate">
              {member.classe}
            </p>
          )}
        </div>

        <DotsSixVertical 
          className="flex-shrink-0 text-muted-foreground" 
          size={compact ? 16 : 20}
          weight="bold"
        />
      </div>
    </div>
  )
}
