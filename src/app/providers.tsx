// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookie from "js-cookie";
import api from "@/services/api";

export const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const token = Cookie.get("auth_token");
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
