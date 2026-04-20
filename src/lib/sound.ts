"use client";

let audio: HTMLAudioElement | null = null;
let currentVolume = 1.0;

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio("/sounds/bong.mp3");
    audio.volume = currentVolume;
  }
  return audio;
}

export function setVolume(v: number): void {
  currentVolume = Math.min(1, Math.max(0, v));
  if (audio) audio.volume = currentVolume;
}

export function playBong(): void {
  if (typeof window === "undefined") return;
  try {
    const a = getAudio();
    a.currentTime = 0;
    a.play().catch(() => {
      // Autoplay policy — silently ignore
    });
  } catch {
    // Audio not available
  }
}
