import { httpBatchLink } from '@trpc/client';
import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/routers/_app';

/**
 * Cliente tRPC tipado
 */
export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

/**
 * Função helper para obter a URL base
 */
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser: usar URL relativa
    return '';
  }

  if (process.env.VERCEL_URL) {
    // SSR em Vercel
    return `https://${process.env.VERCEL_URL}`;
  }

  // SSR local
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Configuração do cliente tRPC
 */
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

