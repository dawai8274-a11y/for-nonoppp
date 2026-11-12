"use client";

import { Music2, Play } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

export default function MusicPlayer() {
  const { playing, togglePlay } = useAudio();
  return (
    <button
      type="button"
      className={`music-toggle ${playing ? "is-playing" : "is-paused"}`}
      onClick={togglePlay}
      aria-label={playing ? "Jeda musik" : "Putar musik"}
    >
      {playing ? (
        <Music2 size={13} className="spin-slow" />
      ) : (
        <Play size={12} fill="currentColor" />
      )}
      <span>{playing ? "Lagu Diputar ♫" : "Putar Musik"}</span>
    </button>
  );
}
