# 🚀 Como Publicar no GitHub Pages

Este guia mostra como publicar a aplicação gratuitamente no GitHub Pages.

## 📋 Pré-requisitos

1. Ter uma conta no GitHub
2. Ter o Git instalado no seu computador
3. O projeto já está configurado para deploy!

## 🔧 Configuração Inicial (fazer apenas uma vez)

### 1. Criar repositório no GitHub

1. Acesse https://github.com e faça login
2. Clique no botão `+` no canto superior direito
3. Selecione "New repository"
4. Nome do repositório: **ragnarok-guild-plann**
5. Deixe como **Public** (necessário para GitHub Pages gratuito)
6. **NÃO** marque "Initialize this repository with a README"
7. Clique em "Create repository"

### 2. Conectar seu projeto ao GitHub

Abra o terminal/PowerShell na pasta do projeto e execute:

```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Ragnarok Guild Planner"

# Conectar ao repositório remoto (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/ragnarok-guild-plann.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 3. Ativar GitHub Pages

1. No GitHub, vá até o repositório **ragnarok-guild-plann**
2. Clique em **Settings** (⚙️ Configurações)
3. No menu lateral, clique em **Pages**
4. Em "Source", selecione **gh-pages** no dropdown de branch
5. Clique em **Save**

## 🎯 Como Fazer Deploy

Toda vez que fizer alterações e quiser publicar:

```bash
# Fazer commit das alterações
git add .
git commit -m "Descrição das alterações"
git push

# Fazer deploy
npm run deploy
```

Aguarde alguns minutos e a aplicação estará disponível em:
**https://SEU_USUARIO.github.io/ragnarok-guild-plann/**

## 🔄 Atualizações Futuras

Para atualizar a aplicação publicada:

```bash
# 1. Faça suas alterações no código
# 2. Salve tudo
# 3. Execute:
npm run deploy
```

## 📱 Compartilhar com a Guild

Depois do deploy, compartilhe o link:
```
https://SEU_USUARIO.github.io/ragnarok-guild-plann/
```

Todos poderão acessar sem precisar instalar nada! Os dados ficam salvos no navegador de cada pessoa.

## ⚠️ Observações Importantes

- **Dados locais**: Cada pessoa tem seus próprios dados salvos no navegador
- **Sem banco de dados compartilhado**: Cada um organiza seus próprios grupos
- **Gratuito**: Totalmente grátis, sem custos de domínio ou hospedagem
- **Atualizações**: Sempre que rodar `npm run deploy`, a versão online será atualizada

## 🆘 Problemas Comuns

### Erro ao fazer push
```bash
# Configurar credenciais do Git
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Deploy não funciona
```bash
# Verificar se a build está funcionando
npm run build

# Se der erro, corrija e tente novamente
npm run deploy
```

### Página 404
- Aguarde 5-10 minutos após o primeiro deploy
- Verifique se ativou o GitHub Pages nas configurações
- Confirme que a branch **gh-pages** foi criada
