# @kui-framework/forms

Formulários KUI Framework - Geração automática de formulários a partir de schemas Zod.

## 📦 Instalação

```bash
npm install @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension react-hook-form zod
# or
pnpm add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension react-hook-form zod
```

## 🚀 Uso

```typescript
import { FormBuilder } from '@kui-framework/forms';
import { zKUI } from '@kui-framework/zod-extension';

const schema = zKUI.object({
  nome: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  idade: zKUI.number("Idade"),
});

function MyForm() {
  const handleSubmit = (data) => {
    console.log("Dados:", data);
  };

  return (
    <FormBuilder
      schema={schema}
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
```

## 📚 Componentes

### FormBuilder
Construtor principal de formulários:
- Gera UI automaticamente do schema
- 3 modos: `create`, `edit`, `view`
- Validação integrada com Zod
- React Hook Form por baixo

### FieldRenderer
Renderiza campos individuais:
- Suporta todos os 18 tipos de campo
- Máscaras automáticas
- Estados readonly/hidden
- Campos condicionais

### GridField / ListField
Componentes para sublistas:
- CRUD inline com modal
- Responsivo (Grid ↔ List)
- Paginação local
- Tracking de mudanças

## 🎯 Features

- ✅ **Geração automática** de UI
- ✅ **18 tipos de campos**
- ✅ **Validação Zod** integrada
- ✅ **3 modos** (create/edit/view)
- ✅ **Campos derivados** com auto-cálculo
- ✅ **Campos condicionais** (showIf)
- ✅ **Validações cross-field** (.refine)
- ✅ **Grid/sublistas** local-first
- ✅ **Máscaras** de input
- ✅ **Responsivo** automático
- ✅ **Performance** otimizada (React.memo)

## 📖 Documentação

Veja a [documentação completa](https://github.com/kennyjsa/kui) e [exemplos](https://github.com/kennyjsa/kui/tree/develop/examples/person-addresses).

## 📄 Licença

MIT © Kenny JSA
