"use client";

import { useState, useEffect, useCallback } from "react";
import {
  type PackageManager,
  PACKAGE_MANAGERS,
  DEFAULT_PACKAGE_MANAGER,
  PACKAGE_MANAGER_STORAGE_KEY,
} from "@/lib/package-managers";

interface UsePackageManagerResult {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
  packageManagers: typeof PACKAGE_MANAGERS;
}

export function usePackageManager(): UsePackageManagerResult {
  const [packageManager, setPackageManagerState] = useState<PackageManager>(DEFAULT_PACKAGE_MANAGER);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
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

  // Save to localStorage when changed
  const setPackageManager = useCallback((pm: PackageManager) => {
    setPackageManagerState(pm);
    localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, pm);
  }, []);

  // Prevent hydration mismatch by returning default until hydrated
  return {
    packageManager: isHydrated ? packageManager : DEFAULT_PACKAGE_MANAGER,
    setPackageManager,
    packageManagers: PACKAGE_MANAGERS,
  };
}
