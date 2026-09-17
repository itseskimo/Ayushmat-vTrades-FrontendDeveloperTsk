"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "@/store";
import { clearRequestState } from "@/store/authSlice";

interface StoreProviderProps {
  children: React.ReactNode;
}

/** Creates one Redux store per application session and exposes auth context. */
export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  const pathname = usePathname();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Keep multi-step form values, but never carry API feedback to another page.
  useEffect(() => {
    storeRef.current?.dispatch(clearRequestState());
  }, [pathname]);

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>{children}</Provider>
    </SessionProvider>
  );
}
