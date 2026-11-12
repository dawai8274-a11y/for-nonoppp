"use client";

import { Music2, VolumeX } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

export default function MusicPlayer() {
  const { enabled, toggle } = useAudio();
  return (
    <button
      type="button"
      className="music-toggle"
      onClick={toggle}
      aria-label={enabled ? "Matikan musik" : "Putar musik"}
    >
      {enabled ? <Music2 size={13} /> : <VolumeX size={13} />}
      <span>{enabled ? "Musik" : "Lagu"}</span>
    </button>
  );
}
