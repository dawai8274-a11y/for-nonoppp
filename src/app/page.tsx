"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Welcome from "@/components/scenes/Welcome";
import Story from "@/components/scenes/Story";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { AudioProvider } from "@/hooks/useAudio";
import type { SheetId } from "@/data/memories";
import {
  DoodleHome,
  DoodleCamera,
  DoodleLetter,
  DoodlePuzzle,
  DoodleDisc
} from "@/components/ui/DoodleIcons";

const SHEET_TABS: { id: SheetId; label: string; icon: React.ReactNode }[] = [
  { id: "welcome", label: "Ucapan", icon: <DoodleHome size={15} /> },
  { id: "music", label: "Lagu", icon: <DoodleDisc size={15} /> },
  { id: "memories", label: "Foto", icon: <DoodleCamera size={15} /> },
  { id: "letter", label: "Surat", icon: <DoodleLetter size={15} /> },
  { id: "surprise", label: "Game", icon: <DoodlePuzzle size={15} /> }
];

function ScrapbookApp() {
  const [activeSheet, setActiveSheet] = useState<SheetId>("welcome");

  const handleNavigate = (nextSheet: SheetId) => {
    setActiveSheet(nextSheet);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <header className="topbar" aria-label="Pembatas lembaran ulang tahun">
        <div className="sheet-tabs" role="tablist" aria-label="Pilih lembaran">
          {SHEET_TABS.map((tab) => {
            const isActive = activeSheet === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`sheet-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => handleNavigate(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <MusicPlayer />
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSheet}
          className="sheet-stage"
          initial={{ opacity: 0, y: 12, rotate: -0.4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -10, rotate: 0.4 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {activeSheet === "welcome" ? (
            <Welcome onNavigate={handleNavigate} />
          ) : (
            <Story activeSheet={activeSheet} onNavigate={handleNavigate} />
          )}
        </motion.div>
      </AnimatePresence>

      <footer className="footer">
        1 tahun bersama nonoppp ♡ dibuat dengan tulus oleh aku
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <AudioProvider>
      <ScrapbookApp />
    </AudioProvider>
  );
}

