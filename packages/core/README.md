# @kui/core

Core do KUI Framework - Providers, registry e integração com data sources.

## Instalação

```bash
pnpm add @kui/core
```

## Uso

### Configurando Providers

```typescript
import { KuiDataProvider, createRestProvider } from "@kui/core";

const userProvider = createRestProvider({
  name: "userProvider",
  baseUrl: "/api/users",
});

function App() {
  return (
    <KuiDataProvider providers={[{ name: "userProvider", provider: userProvider }]}>
      {/* Seus componentes */}
    </KuiDataProvider>
  );
}
```

### Usando Providers

```typescript
import { useKuiProvider } from "@kui/core";

function UserList() {
  const userProvider = useKuiProvider("userProvider");
  
  const loadUsers = async () => {
    const response = await userProvider.list({
      page: 1,
      pageSize: 10,
    });
    console.log(response.data);
  };
}
```

## Providers Disponíveis

- `createRestProvider` - Provider para REST APIs
- Custom providers - Implemente a interface `DataProvider`

