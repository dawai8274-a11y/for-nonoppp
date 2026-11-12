"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { memories, letterParagraphs, type SheetId } from "@/data/memories";
import LovePuzzle from "@/components/ui/LovePuzzle";
import JooxPlayer from "@/components/ui/JooxPlayer";
import {
  DoodleCamera,
  DoodleLetter,
  DoodleGift,
  DoodleHome,
  DoodleHeart,
  DoodlePuzzle,
  DoodleDisc,
  DoodleArrowRight,
  DoodleArrowLeft
} from "@/components/ui/DoodleIcons";

// Resting deck offsets so all 5 photos look like a real fanned stack of physical polaroids on a table
const STACK_LAYOUT = [
  { x: -18, y: 12, rotate: -7.5, baseScale: 0.94 },
  { x: 20, y: 26, rotate: 6.5, baseScale: 0.95 },
  { x: 0, y: -6, rotate: -1.8, baseScale: 0.98 },
  { x: -22, y: -16, rotate: 8, baseScale: 0.92 },
  { x: 18, y: -14, rotate: -5.5, baseScale: 0.93 }
];

type StorySheetProps = {
  activeSheet: Exclude<SheetId, "welcome">;
  onNavigate: (sheet: SheetId) => void;
};

export default function Story({ activeSheet, onNavigate }: StorySheetProps) {
  // Active card index when held closer to the viewer (null = resting on table)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  // Order of cards from back to front (last item in array is on top of the stack)
  const [stackOrder, setStackOrder] = useState<number[]>(() =>
    memories.map((_, idx) => idx)
  );
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const handlePhotoPress = (index: number) => {
    if (focusedIndex === index) {
      setFocusedIndex(null);
      return;
    }
    setStackOrder((prev) => [...prev.filter((i) => i !== index), index]);
    setFocusedIndex(index);
  };

  /* Sheet 02: JOOX Style Music Player */
  if (activeSheet === "music") {
    return (
      <section
        className="book-sheet music-sheet"
        aria-label="Lembar kedua: Pemutar Lagu JOOX Spesial"
      >
        <div className="sheet-paper">
          <div className="sheet-header-row">
            <span className="sheet-page-tag">
              <DoodleDisc size={16} /> Lembar 02 · Album Lagu Spesial
            </span>
            <button
              type="button"
              className="back-pill-btn"
              onClick={() => onNavigate("welcome")}
            >
              <DoodleArrowLeft size={14} /> Awal
            </button>
          </div>

          <div className="section-inner">
            <h2>
              Pemutar Lagu
              <br />
              <em>Spesial Untukmu.</em>
            </h2>
            <p className="section-lead">
              Lagu manis pengiring hari bahagiamu dengan animasi piringan hitam
              vinyl berputar ala JOOX. Ketuk piringan untuk memutar lagu atau pilih foto di bawahnya!
            </p>

            <JooxPlayer />

            {/* Choice of where to go next */}
            <div className="choice-menu-box">
              <p className="choice-prompt">
                Sambil menikmati musik, yuk buka lembaran berikutnya:
              </p>
              <div className="choice-grid">
                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("memories")}
                >
                  <span className="choice-icon-badge">
                    <DoodleCamera size={22} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Buka Tumpukan Foto Kenangan</strong>
                    <small>Lihat 5 lembaran polaroid momen manis kita</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("letter")}
                >
                  <span className="choice-icon-badge">
                    <DoodleLetter size={22} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Baca Surat Ulang Tahun</strong>
                    <small>Buka amplop surat berlatar foto kenangan kita</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn subtle"
                  onClick={() => onNavigate("welcome")}
                >
                  <span className="choice-icon-badge">
                    <DoodleHome size={20} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Kembali ke Halaman Depan</strong>
                    <small>Lihat kembali ucapan &amp; animasi 3D Nailong</small>
                  </span>
                  <DoodleArrowLeft size={16} className="choice-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* Sheet 03: Photo Stack */
  if (activeSheet === "memories") {
    return (
      <section
        className="book-sheet memories-sheet"
        aria-label="Lembar ketiga: Tumpukan Foto"
        onClick={(e) => {
          if (e.target === e.currentTarget) setFocusedIndex(null);
        }}
      >
        <div className="sheet-paper">
          <div className="sheet-header-row">
            <span className="sheet-page-tag">
              <DoodleCamera size={16} /> Lembar 03 · Potret Bahagia
            </span>
            <button
              type="button"
              className="back-pill-btn"
              onClick={() => onNavigate("welcome")}
            >
              <DoodleArrowLeft size={14} /> Awal
            </button>
          </div>

          <div className="section-inner">
            <h2>
              Potret Momen
              <br />
              <em>Spesial Bersamamu.</em>
            </h2>
            <p className="section-lead">
              Di hari ulang tahunmu ini, aku ingin mengajakmu melihat lagi
              lembaran foto kenangan kita. Ketuk lembaran foto di depan atau di
              belakang untuk melihatnya lebih dekat.
            </p>

            <div
              className={`photo-stack-stage ${
                focusedIndex !== null ? "has-focus" : ""
              }`}
              onClick={(e) => {
                if (e.target === e.currentTarget) setFocusedIndex(null);
              }}
            >
              {memories.map((memory, index) => {
                const layout = STACK_LAYOUT[index % STACK_LAYOUT.length];
                const orderRank = stackOrder.indexOf(index);
                const isFocused = focusedIndex === index;
                const isBehindFocused = focusedIndex !== null && !isFocused;

                const targetX = isFocused
                  ? 0
                  : isBehindFocused
                  ? layout.x * 1.35
                  : layout.x;
                const targetY = isFocused
                  ? -12
                  : isBehindFocused
                  ? layout.y + 16
                  : layout.y - orderRank * 4;
                const targetRotate = isFocused
                  ? 0
                  : isBehindFocused
                  ? layout.rotate * 1.15
                  : layout.rotate;
                const targetScale = isFocused
                  ? 1.08
                  : isBehindFocused
                  ? 0.88
                  : layout.baseScale + orderRank * 0.02;

                const zIndex = isFocused ? 20 : 2 + orderRank;

                return (
                  <motion.div
                    key={memory.image}
                    className={`polaroid-sheet ${
                      isFocused ? "is-focused" : ""
                    } ${isBehindFocused ? "is-behind" : ""}`}
                    style={{ zIndex }}
                    animate={{
                      x: targetX,
                      y: targetY,
                      rotate: targetRotate,
                      scale: targetScale
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 24
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePhotoPress(index);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Foto: ${memory.caption}. Ketuk untuk ${
                      isFocused ? "tutup" : "perbesar"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePhotoPress(index);
                      }
                    }}
                  >
                    <div className="polaroid-tape" />

                    <div className="polaroid-frame">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={memory.image}
                        alt={memory.caption}
                        className={`polaroid-img ${
                          loadedImages[index] ? "is-loaded" : ""
                        }`}
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            [index]: true
                          }))
                        }
                      />
                      {!loadedImages[index] && (
                        <div
                          className={`polaroid-placeholder variant-${
                            index % 3
                          }`}
                        >
                          <span className="polaroid-date-badge">
                            {memory.date}
                          </span>
                          <p className="polaroid-placeholder-note">
                            Memuat foto #{index + 1}...
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="polaroid-footer">
                      <span className="polaroid-date">{memory.date}</span>
                      <p className="memory-caption">{memory.caption}</p>
                      {isFocused && (
                        <motion.p
                          className="memory-handnote"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          &ldquo;{memory.note}&rdquo;
                        </motion.p>
                      )}
                      <span className="polaroid-action-hint">
                        {isFocused
                          ? "Ketuk untuk taruh kembali"
                          : "Ketuk untuk lihat dekat"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="photo-stack-controls">
              {memories.map((memory, index) => {
                const isTop = stackOrder[stackOrder.length - 1] === index;
                const isFocused = focusedIndex === index;
                return (
                  <button
                    key={memory.date}
                    type="button"
                    className={`stack-dot-btn ${
                      isFocused || (focusedIndex === null && isTop)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handlePhotoPress(index)}
                    aria-label={`Lihat ${memory.date}`}
                  >
                    Foto #{index + 1}
                  </button>
                );
              })}
            </div>

            {/* Choice of where to go next */}
            <div className="choice-menu-box">
              <p className="choice-prompt">
                Habis lihat foto, kamu mau lanjut ke lembar mana?
              </p>
              <div className="choice-grid">
                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("letter")}
                >
                  <span className="choice-icon-badge">
                    <DoodleLetter size={22} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Baca Surat Ulang Tahun</strong>
                    <small>Buka amplop berisi doa &amp; ucapan untukmu</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("music")}
                >
                  <span className="choice-icon-badge">
                    <DoodleDisc size={22} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Buka Pemutar Lagu JOOX</strong>
                    <small>Putar lagu dengan piringan vinyl berputar</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("surprise")}
                >
                  <span className="choice-icon-badge">
                    <DoodlePuzzle size={22} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Main Puzzle Love &amp; Kembang Api</strong>
                    <small>Susun kepingan hati di lembar kejutan</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* Sheet 04: Letter with Romantic Photo Backgrounds */
  if (activeSheet === "letter") {
    return (
      <section
        className="book-sheet letter-sheet"
        aria-label="Lembar keempat: Surat Ulang Tahun"
      >
        <div className="sheet-paper">
          <div className="sheet-header-row">
            <span className="sheet-page-tag">
              <DoodleLetter size={16} /> Lembar 04 · Surat Ulang Tahun
            </span>
            <button
              type="button"
              className="back-pill-btn"
              onClick={() => onNavigate("welcome")}
            >
              <DoodleArrowLeft size={14} /> Awal
            </button>
          </div>

          <div className="section-inner">
            <h2>
              Surat Cinta
              <br />
              <em>Untuk Nonoppp.</em>
            </h2>
            <p className="section-lead">
              Sebuah catatan tulus dari aku untuk merayakan satu tahun kebersamaan kita, berhiaskan foto-foto kenangan terindah kita.
            </p>

            {/* Romantic Photo Backdrop Wrapper for the Letter Section */}
            <div className="letter-wrapper-with-bg">
              {/* Photo background layers for the letter area */}
              <div className="letter-photo-backdrop" aria-hidden="true">
                <div
                  className="letter-bg-photo photo-left"
                  style={{ backgroundImage: "url(/images/memory-02.jpg)" }}
                />
                <div
                  className="letter-bg-photo photo-center"
                  style={{ backgroundImage: "url(/images/memory-03.jpg)" }}
                />
                <div
                  className="letter-bg-photo photo-right"
                  style={{ backgroundImage: "url(/images/memory-04.jpg)" }}
                />
                <div className="letter-bg-soft-veil" />
              </div>

              {!envelopeOpened ? (
                <motion.div
                  className="envelope-card with-photo-peeks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Polaroid snapshots peeking from behind the envelope */}
                  <div className="envelope-peeking-photos" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memory-04.jpg"
                      alt=""
                      className="peek-photo peek-1"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memory-05.jpg"
                      alt=""
                      className="peek-photo peek-2"
                    />
                  </div>

                  <div className="envelope-illustration">
                    <DoodleLetter size={54} />
                  </div>
                  <p className="envelope-caption">
                    Amplop surat cinta ini khusus untuk Nonoppp dari aku ♡
                  </p>
                  <button
                    type="button"
                    className="primary-button with-icon"
                    onClick={() => setEnvelopeOpened(true)}
                  >
                    <DoodleHeart size={18} />
                    <span>Buka Surat Cinta</span>
                  </button>
                </motion.div>
              ) : (
                <motion.article
                  className="letter with-watermark-bg"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="letter-stamp">
                    <DoodleHeart size={20} />
                  </div>

                  {/* Pinned keepsake polaroid photo inside the letter */}
                  <div className="letter-pinned-polaroid">
                    <div className="polaroid-tape-mini" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memory-02.jpg"
                      alt="Kenangan bersama di surat"
                      className="letter-pinned-img"
                    />
                    <span className="letter-pinned-caption">1 Tahun Bersama ♡</span>
                  </div>

                  <p className="letter-greeting">Sayangku cintaku nonoppp ♡</p>
                  {letterParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <div className="letter-sign">Dari aku,</div>
                  <div className="letter-sign-sub">
                    loveee youu moree thann anythingg nonopppp 🤍🤍
                  </div>
                </motion.article>
              )}
            </div>

            {/* Choice of where to go next */}
            <div className="choice-menu-box">
              <p className="choice-prompt">
                Mau lanjut membuka lembar yang mana sekarang?
              </p>
              <div className="choice-grid">
                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("surprise")}
                >
                  <span className="choice-icon-badge">
                    <DoodlePuzzle size={22} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Main Puzzle Love &amp; Kembang Api</strong>
                    <small>Susun hati &amp; nyalakan kembang api ulang tahun</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn"
                  onClick={() => onNavigate("music")}
                >
                  <span className="choice-icon-badge">
                    <DoodleDisc size={22} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Putar Lagu di Album JOOX</strong>
                    <small>Dengarkan melodi dengan piringan hitam berputar</small>
                  </span>
                  <DoodleArrowRight size={16} className="choice-arrow" />
                </button>

                <button
                  type="button"
                  className="choice-card-btn subtle"
                  onClick={() => onNavigate("welcome")}
                >
                  <span className="choice-icon-badge">
                    <DoodleHome size={20} />
                  </span>
                  <span className="choice-text-wrap">
                    <strong>Kembali ke Halaman Depan</strong>
                    <small>Lihat kembali sambutan ulang tahunmu</small>
                  </span>
                  <DoodleArrowLeft size={16} className="choice-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* Sheet 05: Love Puzzle Game */
  return (
    <section
      className="book-sheet surprise-sheet"
      aria-label="Lembar kelima: Game Puzzle Love & Kembang Api"
    >
      <div className="sheet-paper">
        <div className="sheet-header-row">
          <span className="sheet-page-tag">
            <DoodleGift size={16} /> Lembar 05 · Kejutan &amp; Game
          </span>
          <button
            type="button"
            className="back-pill-btn"
            onClick={() => onNavigate("welcome")}
          >
            <DoodleArrowLeft size={14} /> Awal
          </button>
        </div>

        <div className="section-inner surprise-inner">
          <h2>
            Susun Kepingan Hati
            <br />
            <em>Di Hari Ulang Tahunmu.</em>
          </h2>
          <p className="section-lead">
            Selesaikan puzzle hati sederhana di bawah ini untuk menyalakan
            kembang api perayaan ulang tahunmu!
          </p>

          {/* Interactive Love Puzzle + Green Screen Fireworks */}
          <LovePuzzle />

          {/* Choice of where to go next */}
          <div className="choice-menu-box">
            <p className="choice-prompt">
              Ingin membuka kembali lembaran lainnya?
            </p>
            <div className="choice-grid">
              <button
                type="button"
                className="choice-card-btn"
                onClick={() => onNavigate("music")}
              >
                <span className="choice-icon-badge">
                  <DoodleDisc size={22} />
                </span>
                <span className="choice-text-wrap">
                  <strong>Putar Lagu di Album JOOX</strong>
                  <small>Dengarkan melodi dengan piringan vinyl berputar</small>
                </span>
                <DoodleArrowRight size={16} className="choice-arrow" />
              </button>

              <button
                type="button"
                className="choice-card-btn"
                onClick={() => onNavigate("memories")}
              >
                <span className="choice-icon-badge">
                  <DoodleCamera size={22} />
                </span>
                <span className="choice-text-wrap">
                  <strong>Ke Lembar Foto</strong>
                  <small>Lihat lagi tumpukan polaroid kita</small>
                </span>
                <DoodleArrowRight size={16} className="choice-arrow" />
              </button>

              <button
                type="button"
                className="choice-card-btn"
                onClick={() => onNavigate("letter")}
              >
                <span className="choice-icon-badge">
                  <DoodleLetter size={22} />
                </span>
                <span className="choice-text-wrap">
                  <strong>Ke Lembar Surat</strong>
                  <small>Baca ulang surat ulang tahun untukmu</small>
                </span>
                <DoodleArrowRight size={16} className="choice-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
