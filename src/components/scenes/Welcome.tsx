"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "motion/react";
import type { SheetId } from "@/data/memories";
import {
  DoodleCamera,
  DoodleLetter,
  DoodleFlower,
  DoodleHeart,
  DoodlePuzzle,
  DoodleDisc,
  DoodleArrowRight
} from "@/components/ui/DoodleIcons";

const NailongWorld = dynamic(() => import("@/components/3d/NailongWorld"), {
  ssr: false,
  loading: () => (
    <div className="canvas-loading-placeholder">
      <span>Menyiapkan kejutan 3D...</span>
    </div>
  )
});

type WelcomeProps = {
  onNavigate: (sheet: SheetId) => void;
};

export default function Welcome({ onNavigate }: WelcomeProps) {
  const [message, setMessage] = useState(
    "Ketuk karakter lucunya buat lihat reaksinya ~"
  );
  const [showChoices, setShowChoices] = useState(false);

  return (
    <section
      className="book-sheet hero-sheet"
      aria-label="Lembar pertama: 1 Tahun Bersama Nonoppp"
    >
      <div className="sheet-paper welcome-paper-with-bg">
        {/* Ambient Romantic Photo Background for Beranda */}
        <div className="welcome-bg-backdrop" aria-hidden="true">
          <div
            className="welcome-bg-photo"
            style={{ backgroundImage: "url(/images/memory-03.jpg)" }}
          />
          <div className="welcome-bg-veil" />
        </div>

        <div className="sheet-header-row">
          <span className="sheet-page-tag">
            <DoodleFlower size={16} /> Lembar 01 · 1 Tahun Bersama
          </span>
          <span className="sheet-corner-stamp">1st Anniversary ♡</span>
        </div>

        <div className="hero-inner">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            A Little World
            <br />
            <em>For Nonoppp.</em>
          </motion.h1>

          <motion.p
            className="hero-copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
          >
            Nggaa kerasa yaa ternyata sudah setahun kita bersama. Aku
            menyiapkan lembaran kenangan manis, lagu spesial, dan surat cinta
            khusus untuk sayangku Nonoppp. Pilih lembar mana yang ingin kamu buka
            dulu ya!
          </motion.p>

          <div className="canvas-wrap">
            <NailongWorld
              onReact={(clipName) => {
                const reactions: Record<string, string> = {
                  Wave: "Halo Nonoppp! Salam manis penuh cinta dari aku ~",
                  Jump: "Yeay! Ikut senang merayakan 1 tahun kebersamaan kita!",
                  Dance: "Asyik~ Menari bahagia buat sayangku cintaku Nonoppp!",
                  Hug: "Peluk hangat dari jauh untuk Nonoppp tersayang!"
                };
                setMessage(
                  (clipName && reactions[clipName]) ||
                    "Semoga kita selalu bersama dan bahagia terus ya Nonoppp ♡"
                );
              }}
            />
          </div>

          <p className="character-hint" aria-live="polite">
            {message}
          </p>

          {!showChoices ? (
            <div className="hero-actions">
              <button
                type="button"
                className="primary-button with-icon"
                onClick={() => setShowChoices(true)}
              >
                <DoodleHeart size={18} />
                <span>Buka Kejutan Ulang Tahunmu</span>
                <DoodleArrowRight size={16} />
              </button>
            </div>
          ) : (
            <motion.div
              className="choice-menu-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              <p className="choice-prompt">
                Mau lanjut membuka lembar yang mana dulu?
              </p>
              <div className="choice-grid">
                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("music")}
                >
                  <span className="choice-icon-badge">
                    <DoodleDisc size={24} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Album Pemutar Lagu JOOX</strong>
                    <small>Piringan vinyl berputar dengan fotomu di tengahnya</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("memories")}
                >
                  <span className="choice-icon-badge">
                    <DoodleCamera size={24} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Lembar Foto Kenangan</strong>
                    <small>Kumpulan potret momen manis kita</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("letter")}
                >
                  <span className="choice-icon-badge">
                    <DoodleLetter size={24} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Surat Ulang Tahun</strong>
                    <small>Ucapan &amp; doa tulus untuk usia barumu</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("surprise")}
                >
                  <span className="choice-icon-badge">
                    <DoodlePuzzle size={24} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Main Puzzle Love &amp; Kembang Api</strong>
                    <small>Susun hati utuh &amp; nyalakan kembang api</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
