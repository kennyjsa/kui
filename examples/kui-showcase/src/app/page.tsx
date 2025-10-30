"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o Full CRUD
    router.push("/forms/full-crud");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">KUI Framework</h1>
        <p className="text-muted-foreground">Redirecionando para o showcase principal...</p>
      </div>
    </div>
  );
}

