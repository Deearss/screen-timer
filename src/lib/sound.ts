"use client";

let audio: HTMLAudioElement | null = null;

export function playBong(): void {
  if (typeof window === "undefined") return;
  try {
    if (!audio) audio = new Audio("/sounds/bong.mp3");
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Autoplay policy — silently ignore
    });
  } catch {
    // Audio not available
  }
}
