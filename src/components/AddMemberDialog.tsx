import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EventType, PresencaData } from '@/lib/types'
import { WOE_CLASSES, TE_CLASSES } from '@/lib/types'
import { toast } from 'sonner'

interface AddMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMember: (member: PresencaData, eventType: EventType) => void
  activeEvent: EventType
}

export function AddMemberDialog({ open, onOpenChange, onAddMember, activeEvent }: AddMemberDialogProps) {
  const [formData, setFormData] = useState({
    char: '',
    nome: '',
    classe: '',
    nivel: '175'
  })

  const classes = activeEvent === 'woe' ? WOE_CLASSES : TE_CLASSES
  const defaultLevel = activeEvent === 'woe' ? '175' : '99'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.char.trim()) {
      toast.error('Nome do personagem é obrigatório')
      return
    }

    if (!formData.nome.trim()) {
      toast.error('Nome do jogador é obrigatório')
      return
    }

    if (!formData.classe) {
      toast.error('Classe é obrigatória')
      return
    }

    const nivel = parseInt(formData.nivel)
    const maxLevel = activeEvent === 'woe' ? 175 : 99

    if (nivel > maxLevel) {
      toast.error(`Nível máximo para ${activeEvent.toUpperCase()} é ${maxLevel}`)
      return
    }

    const newMember: PresencaData = {
      user_id: `manual-${Date.now()}`,
      char: formData.char.trim(),
      nome: formData.nome.trim(),
      classe: formData.classe,
      nivel: nivel || (activeEvent === 'woe' ? 175 : 99),
      data: new Date().toISOString()
    }

    onAddMember(newMember, activeEvent)
    
    // Reset form
    setFormData({
      char: '',
      nome: '',
      classe: '',
      nivel: defaultLevel
    })
    
    onOpenChange(false)
    toast.success('Membro adicionado com sucesso!')
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setFormData({
        char: '',
        nome: '',
        classe: '',
        nivel: defaultLevel
      })
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Membro {activeEvent.toUpperCase()}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="char">Nome do Personagem</Label>
              <Input
                id="char"
                value={formData.char}
                onChange={(e) => setFormData({ ...formData, char: e.target.value })}
                placeholder="Ex: Swordmaster"
                autoComplete="off"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do Jogador</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: João"
                autoComplete="off"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="classe">Classe</Label>
              <Select
                value={formData.classe}
                onValueChange={(value) => setFormData({ ...formData, classe: value })}
              >
                <SelectTrigger id="classe">
                  <SelectValue placeholder="Selecione uma classe" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classe) => (
                    <SelectItem key={classe} value={classe}>
                      {classe}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nivel">Nível</Label>
              <Input
                id="nivel"
                type="number"
                value={formData.nivel}
                onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                min="1"
                max={activeEvent === 'woe' ? '175' : '99'}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
