# @kui/zod-extension

Extensões declarativas para Zod com metadados KUI.

## Instalação

```bash
pnpm add @kui/zod-extension zod
```

## Uso

```typescript
import { zKUI } from "@kui/zod-extension";

const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail"),
  age: zKUI.number("Idade", { 
    derived: true,
    compute: (values) => calculateAge(values.birthDate)
  }),
});
```

## Tipos de Campos

- `identifier()` - ID (sempre readonly)
- `text()` - Texto
- `number()` - Número
- `date()` - Data
- `boolean()` - Boolean
- `email()` - E-mail
- `password()` - Senha
- `select()` - Seleção
- `systemDate()` - Data do sistema
- `relation()` - Relação/Associação
- `grid()` - Grid (sublista)

