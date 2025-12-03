import { Button } from '@/components/ui/button'
import { Group, EventType } from '@/lib/types'
import { Export, ArrowClockwise, Upload, UserPlus, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ActionsToolbarProps {
  groups: Group[]
  onResetAll: () => void
  onImportData: () => void
  onAddMember: () => void
  onClearPresence: () => void
  activeEvent: EventType
}

export function ActionsToolbar({ groups, onResetAll, onImportData, onAddMember, onClearPresence, activeEvent }: ActionsToolbarProps) {
  const handleExport = () => {
    const totalMembers = groups.reduce((acc, g) => acc + g.members.length, 0)
    
    if (totalMembers === 0) {
      toast.error('Nenhum membro nos grupos para exportar')
      return
    }

    let exportText = `=== PLANTEL DE GUERRA ${activeEvent.toUpperCase()} ===\n\n`
    
    groups.forEach(group => {
      if (group.members.length > 0) {
        exportText += `${group.name} (${group.members.length}/12)\n`
        exportText += '─'.repeat(40) + '\n'
        
        group.members.forEach((member, idx) => {
          exportText += `${idx + 1}. ${member.char} (${member.nome}) - ${member.classe} Lv${member.nivel}\n`
        })
        
        exportText += '\n'
      }
    })

    exportText += `\nTotal: ${totalMembers} membros distribuídos em ${groups.filter(g => g.members.length > 0).length} grupos`

    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `plantel-${activeEvent}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`Plantel ${activeEvent.toUpperCase()} exportado com sucesso!`)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button onClick={handleExport} variant="outline" size="sm">
        <Export size={16} className="mr-2" weight="bold" />
        Exportar TXT
      </Button>

      <Button onClick={onAddMember} variant="outline" size="sm">
        <UserPlus size={16} className="mr-2" weight="bold" />
        Adicionar Membro
      </Button>

      <Button onClick={onImportData} variant="outline" size="sm">
        <Upload size={16} className="mr-2" weight="bold" />
        Importar Dados
      </Button>

      <Button 
        onClick={onClearPresence} 
        variant="outline" 
        size="sm"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash size={16} className="mr-2" weight="bold" />
        Limpar Presenças
      </Button>

      <Button 
        onClick={onResetAll} 
        variant="outline" 
        size="sm"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <ArrowClockwise size={16} className="mr-2" weight="bold" />
        Resetar Todos
      </Button>
    </div>
  )
}
