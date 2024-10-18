# @kui/forms

Form builder e componentes de formulário do KUI Framework.

## Instalação

```bash
pnpm add @kui/forms react-hook-form
```

## Uso Básico

### Definindo um Schema

```typescript
import { zKUI } from "@kui/zod-extension";

const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade"),
});
```

### FormBuilder

```tsx
import { FormBuilder } from "@kui/forms";

function UserForm() {
  const handleSubmit = async (data) => {
    console.log(data);
    // Salvar dados...
  };

  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
```

### useKuiForm Hook

```tsx
import { useKuiForm } from "@kui/forms";

function CustomForm() {
  const { control, handleSubmit } = useKuiForm({
    schema: userSchema,
    mode: "edit",
    defaultValues: { name: "João" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Seus campos customizados */}
    </form>
  );
}
```

## Modos

- `create` - Criação de novo registro
- `edit` - Edição de registro existente
- `view` - Visualização (readonly)

