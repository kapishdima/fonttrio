"use client";

import { createContext, useState, useEffect, useCallback, use } from "react";
import {
  type PackageManager,
  PACKAGE_MANAGERS,
  DEFAULT_PACKAGE_MANAGER,
  PACKAGE_MANAGER_STORAGE_KEY,
} from "@/lib/package-managers";

interface PackageManagerContextValue {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
  packageManagers: typeof PACKAGE_MANAGERS;
}

const PackageManagerContext = createContext<PackageManagerContextValue | null>(null);

export function PackageManagerProvider({ children }: { children: React.ReactNode }) {
  const [packageManager, setPackageManagerState] = useState<PackageManager>(DEFAULT_PACKAGE_MANAGER);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY);
    if (stored) {
      const isValid = PACKAGE_MANAGERS.some((pm) => pm.key === stored);
      if (isValid) {
        setPackageManagerState(stored as PackageManager);
      }
    }
    setIsHydrated(true);
  }, []);

  const setPackageManager = useCallback((pm: PackageManager) => {
    setPackageManagerState(pm);
    localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, pm);
  }, []);

  return (
    <PackageManagerContext
      value={{
        packageManager: isHydrated ? packageManager : DEFAULT_PACKAGE_MANAGER,
        setPackageManager,
        packageManagers: PACKAGE_MANAGERS,
      }}
    >
      {children}
    </PackageManagerContext>
  );
}

export function usePackageManagerContext(): PackageManagerContextValue {
  const context = use(PackageManagerContext);
  if (!context) {
    throw new Error("usePackageManagerContext must be used within PackageManagerProvider");
  }
  return context;
}
