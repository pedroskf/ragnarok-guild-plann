import { Button } from '@/components/ui/button'
import { Group } from '@/lib/types'
import { Export, ArrowClockwise, Upload } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ActionsToolbarProps {
  groups: Group[]
  onResetAll: () => void
  onImportData: () => void
}

export function ActionsToolbar({ groups, onResetAll, onImportData }: ActionsToolbarProps) {
  const handleExport = () => {
    const totalMembers = groups.reduce((acc, g) => acc + g.members.length, 0)
    
    if (totalMembers === 0) {
      toast.error('Nenhum membro nos grupos para exportar')
      return
    }

    let exportText = '=== PLANTEL DE GUERRA ===\n\n'
    
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
    a.download = `plantel-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Plantel exportado com sucesso!')
  }

  const handleExportJSON = () => {
    const totalMembers = groups.reduce((acc, g) => acc + g.members.length, 0)
    
    if (totalMembers === 0) {
      toast.error('Nenhum membro nos grupos para exportar')
      return
    }

    const exportData = {
      exportDate: new Date().toISOString(),
      groups: groups.filter(g => g.members.length > 0).map(g => ({
        id: g.id,
        name: g.name,
        memberCount: g.members.length,
        members: g.members.map(m => ({
          char: m.char,
          nome: m.nome,
          classe: m.classe,
          nivel: m.nivel,
          eventType: m.eventType
        }))
      })),
      summary: {
        totalMembers,
        totalGroups: groups.filter(g => g.members.length > 0).length
      }
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `plantel-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Plantel exportado em JSON!')
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button onClick={handleExport} variant="default" size="sm">
        <Export size={16} className="mr-2" weight="bold" />
        Exportar TXT
      </Button>
      
      <Button onClick={handleExportJSON} variant="outline" size="sm">
        <Export size={16} className="mr-2" weight="bold" />
        Exportar JSON
      </Button>

      <Button onClick={onImportData} variant="outline" size="sm">
        <Upload size={16} className="mr-2" weight="bold" />
        Importar Dados
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
