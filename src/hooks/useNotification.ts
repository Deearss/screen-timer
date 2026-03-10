"use client";

import { useState, useEffect, useCallback } from "react";

export type NotifPermission = "default" | "granted" | "denied";

export function useNotification() {
  const [permission, setPermission] = useState<NotifPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission as NotifPermission);
    }
  }, []);

  const request = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result as NotifPermission);
  }, []);

  const send = useCallback(
    (title: string, body: string) => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    },
    [permission]
  );

  return { permission, request, send };
}
