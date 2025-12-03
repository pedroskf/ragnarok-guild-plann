import { Member } from '@/lib/types'
import { getClassColor, getClassAbbr, getClassIcon } from '@/lib/classMapping'
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
  const classIcon = getClassIcon(member.classe)
  
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, member)}
      onDragEnd={onDragEnd}
      className={cn(
        'bg-card border border-border rounded cursor-grab active:cursor-grabbing',
        'transition-all duration-200',
        'hover:shadow-md hover:border-accent/50',
        isDragging && 'opacity-50 scale-95',
        compact ? 'p-1' : 'p-3'
      )}
    >
      <div className={cn(
        "flex items-center",
        compact ? "gap-1.5" : "gap-3"
      )}>
        <div className="flex-shrink-0">
          {classIcon ? (
            <div
              className={cn(
                'rounded flex items-center justify-center overflow-hidden bg-muted/50',
                compact ? 'w-8 h-8' : 'w-12 h-12'
              )}
            >
              <img 
                src={classIcon} 
                alt={member.classe}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={cn(
                'rounded flex items-center justify-center text-white font-bold',
                getClassColor(member.classe),
                compact ? 'w-8 h-8 text-[9px]' : 'w-12 h-12 text-xs'
              )}
            >
              {getClassAbbr(member.classe)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={cn(
            'font-semibold text-foreground truncate',
            compact ? 'text-xs' : 'text-sm'
          )}>
            {member.char}
          </p>
          {compact ? (
            <div className="flex items-center gap-1">
              <p className="text-[9px] text-muted-foreground truncate">
                {member.nome}
              </p>
              <span className="text-[9px] text-muted-foreground flex-shrink-0">
                Lv{member.nivel}
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <p className="text-xs text-muted-foreground truncate">
                  {member.nome}
                </p>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  Lv{member.nivel}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground/70 truncate">
                {member.classe}
              </p>
            </>
          )}
        </div>

        <DotsSixVertical 
          className="flex-shrink-0 text-muted-foreground" 
          size={compact ? 12 : 20}
          weight="bold"
        />
      </div>
    </div>
  )
}
