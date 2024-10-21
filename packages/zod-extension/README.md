# @kui-framework/zod-extension

Extensões Zod para KUI Framework - Schemas declarativos para geração automática de UI.

## 📦 Instalação

```bash
npm install @kui-framework/zod-extension zod
# or
pnpm add @kui-framework/zod-extension zod
# or
yarn add @kui-framework/zod-extension zod
```

## 🚀 Uso

```typescript
import { zKUI } from '@kui-framework/zod-extension';

const pessoaSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  nome: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  cpf: zKUI.text("CPF", { mask: "999.999.999-99" }),
  dataNascimento: zKUI.date("Data de Nascimento"),
  idade: zKUI.number("Idade", { 
    derived: true,
    compute: (values) => {
      if (!values.dataNascimento) return null;
      const today = new Date();
      const birth = new Date(values.dataNascimento);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    }
  }),
});
```

## 📚 Tipos de Campos

### Básicos
- `identifier()` - ID único
- `text()` - Texto curto
- `textarea()` - Texto longo
- `number()` - Números
- `date()` - Datas
- `email()` - E-mail
- `password()` - Senha

### Seleção
- `boolean()` - Sim/Não
- `select()` - Lista de opções
- `checkbox()` - Caixa de seleção
- `radio()` - Opções exclusivas
- `switch()` - Toggle on/off

### Avançados
- `currency()` - Valores monetários
- `rating()` - Avaliação com estrelas
- `color()` - Seletor de cores
- `file()` - Upload de arquivos
- `relation()` - Relacionamento com outras entidades
- `grid()` - Sublistas inline

## 🎯 Features

- ✅ **18 tipos de campos** prontos para uso
- ✅ **Metadados declarativos** anexados ao schema
- ✅ **Validação Zod** integrada
- ✅ **Campos derivados** com cálculo automático
- ✅ **Campos condicionais** com `showIf`
- ✅ **TypeScript** com inferência completa

## 📖 Documentação

Veja a [documentação completa](https://github.com/kennyjsa/kui) no repositório principal.

## 📄 Licença

MIT © Kenny JSA
