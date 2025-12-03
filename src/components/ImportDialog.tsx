import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { PresencaData } from '@/lib/types'
import { toast } from 'sonner'

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (woeData: PresencaData[], teData: PresencaData[]) => void
}

export function ImportDialog({ open, onOpenChange, onImport }: ImportDialogProps) {
  const [woeJson, setWoeJson] = useState('')
  const [teJson, setTeJson] = useState('')

  const handleImport = () => {
    try {
      let woeData: PresencaData[] = []
      let teData: PresencaData[] = []

      if (woeJson.trim()) {
        woeData = JSON.parse(woeJson)
        if (!Array.isArray(woeData)) {
          throw new Error('WOE data deve ser um array')
        }
      }

      if (teJson.trim()) {
        teData = JSON.parse(teJson)
        if (!Array.isArray(teData)) {
          throw new Error('TE data deve ser um array')
        }
      }

      if (woeData.length === 0 && teData.length === 0) {
        toast.error('Insira pelo menos um conjunto de dados')
        return
      }

      onImport(woeData, teData)
      toast.success(`Importados ${woeData.length} WOE e ${teData.length} TE membros`)
      onOpenChange(false)
      setWoeJson('')
      setTeJson('')
    } catch (error) {
      toast.error('Erro ao importar: JSON inválido')
      console.error(error)
    }
  }

  const loadSampleData = () => {
    const sampleWoe = [
      {
        user_id: '96717004202844160',
        char: 'analmad',
        nome: 'kr1s',
        classe: 'Sorcerer',
        nivel: 175,
        data: '2025-12-02T19:44:32.153782'
      }
    ]

    const sampleTe = [
      {
        user_id: '51234567890123460',
        char: 'OldKnight',
        nome: 'Marcos',
        classe: 'Lord Knight',
        nivel: 99,
        data: '2025-12-02T21:25:00.000000'
      }
    ]

    setWoeJson(JSON.stringify(sampleWoe, null, 2))
    setTeJson(JSON.stringify(sampleTe, null, 2))
    toast.info('Dados de exemplo carregados')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Importar Dados de Presença</DialogTitle>
          <DialogDescription>
            Cole os dados JSON do bot do Discord. Formato esperado: array de objetos com
            user_id, char, nome, classe, nivel, data.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="woe" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="woe">WOE</TabsTrigger>
            <TabsTrigger value="te">WOE TE</TabsTrigger>
          </TabsList>

          <TabsContent value="woe" className="space-y-2">
            <Textarea
              placeholder='[{"user_id": "123", "char": "nome", "nome": "player", "classe": "Rune Knight", "nivel": 175, "data": "2025-12-02T19:44:32.153782"}]'
              value={woeJson}
              onChange={(e) => setWoeJson(e.target.value)}
              className="font-mono text-xs h-[300px]"
            />
          </TabsContent>

          <TabsContent value="te" className="space-y-2">
            <Textarea
              placeholder='[{"user_id": "456", "char": "nome", "nome": "player", "classe": "Lord Knight", "nivel": 99, "data": "2025-12-02T21:25:00.000000"}]'
              value={teJson}
              onChange={(e) => setTeJson(e.target.value)}
              className="font-mono text-xs h-[300px]"
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={loadSampleData}>
            Carregar Exemplo
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleImport}>
              Importar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
