# 📦 Guia de Publicação - KUI Framework v0.0.1

## ✅ Checklist Pré-Publicação

- [x] Todos os package.json atualizados (v0.0.1)
- [x] Metadata adicionada (keywords, repository, homepage, bugs)
- [x] LICENSE copiada para todos os pacotes
- [x] READMEs criados para cada pacote
- [x] Build 100% sucesso
- [x] Exports e tipos corretos
- [ ] Conta NPM configurada
- [ ] Organização @kui criada no NPM (opcional)

---

## 🚀 Como Publicar

### 1. Login no NPM

```bash
npm login
# Digite suas credenciais NPM
```

### 2. Build de Produção

```bash
pnpm build
```

### 3. Publicar Pacotes (em ordem)

⚠️ **IMPORTANTE:** Publicar na ordem correta devido às dependências!

```bash
# 1. @kui/zod-extension (sem dependências KUI)
cd packages/zod-extension
npm publish --access public

# 2. @kui/theme (sem dependências KUI)
cd ../theme
npm publish --access public

# 3. @kui/core (depende de zod-extension)
cd ../core
npm publish --access public

# 4. @kui/ui (depende de theme)
cd ../ui
npm publish --access public

# 5. @kui/forms (depende de core, ui, zod-extension)
cd ../forms
npm publish --access public
```

### 4. Verificar Publicação

```bash
# Verificar se os pacotes foram publicados
npm view @kui/zod-extension
npm view @kui/core
npm view @kui/theme
npm view @kui/ui
npm view @kui/forms
```

---

## 🔄 Publicação Automatizada (Opcional)

### Script de Publicação

Criar `scripts/publish.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Publicando KUI Framework v0.0.1..."

# Build
echo "📦 Building..."
pnpm build

# Publicar em ordem
echo "📤 Publishing @kui/zod-extension..."
cd packages/zod-extension && npm publish --access public && cd ../..

echo "📤 Publishing @kui/theme..."
cd packages/theme && npm publish --access public && cd ../..

echo "📤 Publishing @kui/core..."
cd packages/core && npm publish --access public && cd ../..

echo "📤 Publishing @kui/ui..."
cd packages/ui && npm publish --access public && cd ../..

echo "📤 Publishing @kui/forms..."
cd packages/forms && npm publish --access public && cd ../..

echo "✅ Todos os pacotes publicados com sucesso!"
```

Executar:
```bash
chmod +x scripts/publish.sh
./scripts/publish.sh
```

---

## 🧪 Testar Instalação

Após publicar, teste instalando em um projeto novo:

```bash
mkdir test-kui
cd test-kui
npm init -y
npm install @kui/forms @kui/ui @kui/core @kui/zod-extension react react-dom
```

Criar `test.tsx`:
```typescript
import { FormBuilder } from '@kui/forms';
import { zKUI } from '@kui/zod-extension';

const schema = zKUI.object({
  nome: zKUI.text("Nome", { required: true }),
});

function App() {
  return <FormBuilder schema={schema} mode="create" onSubmit={console.log} />;
}
```

---

## 📋 Pacotes Publicados

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `@kui/zod-extension` | 0.0.1 | Extensões Zod com metadados |
| `@kui/core` | 0.0.1 | Providers e integração backend |
| `@kui/theme` | 0.0.1 | Design tokens e Tailwind |
| `@kui/ui` | 0.0.1 | Componentes UI com Radix |
| `@kui/forms` | 0.0.1 | FormBuilder e geração automática |

---

## 🎯 Pós-Publicação

### 1. Tag Git

```bash
git tag v0.0.1
git push origin v0.0.1
```

### 2. GitHub Release

Criar release no GitHub com:
- Título: `v0.0.1 - Initial Alpha Release`
- Descrição: Copiar do CHANGELOG.md
- Anexar assets: nenhum necessário

### 3. Anunciar

- [ ] Tweet sobre o lançamento
- [ ] Post no LinkedIn
- [ ] Atualizar README principal
- [ ] Discord/Slack (se houver)

---

## 📝 Notas

### Versão 0.0.1 (Alpha)

Esta é uma **versão alpha** para testes iniciais:
- ⚠️ API pode mudar
- ⚠️ Não recomendado para produção ainda
- ✅ Feedback bem-vindo
- ✅ Issues abertas para bugs

### Próximas Versões

- `0.0.x` - Bug fixes e ajustes menores
- `0.1.0` - Primeira versão beta estável
- `1.0.0` - Release de produção

---

## ❓ Troubleshooting

### Erro: "You must be logged in to publish"
```bash
npm login
```

### Erro: "Package name already exists"
- Use `@SEU-USERNAME/kui-*` em vez de `@kui/*`
- Ou crie organização `@kui` no NPM

### Erro: "403 Forbidden"
- Verifique se tem permissão na organização
- Use `--access public` para pacotes em scope

---

## 📚 Recursos

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Changesets](https://github.com/changesets/changesets) (para futuro)


