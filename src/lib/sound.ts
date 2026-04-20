"use client";

let ctx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let buffer: AudioBuffer | null = null;
let currentGain = 1.0;

async function ensureCtx(): Promise<AudioContext> {
  if (!ctx) {
    ctx = new AudioContext();
    gainNode = ctx.createGain();
    gainNode.gain.value = currentGain;
    gainNode.connect(ctx.destination);

    // Decode audio sekali, simpan sebagai buffer
    const res = await fetch("/sounds/bong.mp3");
    const arr = await res.arrayBuffer();
    buffer = await ctx.decodeAudioData(arr);
  }
  // Resume jika di-suspend oleh browser (autoplay policy)
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}

export function setVolume(v: number): void {
  currentGain = Math.min(1.5, Math.max(0, v));
  if (gainNode) gainNode.gain.value = currentGain;
}

export async function playBong(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const audioCtx = await ensureCtx();
    if (!buffer || !gainNode) return;

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode);
    source.start(0);
  } catch {
    // Audio not available
  }
}

