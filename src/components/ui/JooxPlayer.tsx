"use client";

import { useState } from "react";
import { useAudio } from "@/hooks/useAudio";
import { memories, songInfo } from "@/data/memories";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Heart,
  Music,
  Sparkles,
  Disc3,
  Image as ImageIcon
} from "lucide-react";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function JooxPlayer() {
  const { playing, togglePlay, currentTime, duration, seek } = useAudio();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(true);
  const [displayMode, setDisplayMode] = useState<"spotify" | "vinyl">("spotify");

  const currentPhoto = memories[selectedPhotoIndex]?.image || "/images/memory-01.jpg";
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = (parseFloat(e.target.value) / 100) * duration;
    seek(nextTime);
  };

  const skipTime = (offset: number) => {
    const nextTime = Math.max(0, Math.min(duration || 0, currentTime + offset));
    seek(nextTime);
  };

  return (
    <div className="joox-player-container">
      {/* Ambient Blurred Multi-Photo Background for Album Screen */}
      <div className="joox-ambient-bg" aria-hidden="true">
        <div
          className="joox-ambient-layer joox-ambient-1"
          style={{ backgroundImage: `url(${currentPhoto})` }}
        />
        <div
          className="joox-ambient-layer joox-ambient-2"
          style={{
            backgroundImage: `url(${
              memories[(selectedPhotoIndex + 1) % memories.length].image
            })`
          }}
        />
        <div className="joox-ambient-overlay" />
      </div>

      <div className="joox-turntable-card">
        {/* Header Bar with View Mode Toggle */}
        <div className="joox-header-meta">
          <span className="joox-badge">
            <Music size={12} />
            <span>Album Spesial</span>
          </span>

          {/* Mode Switch: Spotify Big Photo vs JOOX Vinyl */}
          <div className="player-mode-switch" role="group" aria-label="Pilih tampilan album">
            <button
              type="button"
              className={`mode-switch-btn ${displayMode === "spotify" ? "is-active" : ""}`}
              onClick={() => setDisplayMode("spotify")}
              title="Tampilan Foto Besar Spotify"
            >
              <ImageIcon size={12} />
              <span>Foto Besar</span>
            </button>
            <button
              type="button"
              className={`mode-switch-btn ${displayMode === "vinyl" ? "is-active" : ""}`}
              onClick={() => setDisplayMode("vinyl")}
              title="Tampilan Piringan Hitam Vinyl"
            >
              <Disc3 size={12} />
              <span>Vinyl</span>
            </button>
          </div>
        </div>

        {/* 1. SPOTIFY MODE: Big Square Album Artwork with Spinning Vinyl Peek */}
        {displayMode === "spotify" ? (
          <div className="spotify-album-stage">
            {/* Spinning Vinyl Record Peeking Behind the Big Spotify Jacket */}
            <div
              className={`spotify-vinyl-peek ${playing ? "is-spinning" : ""}`}
              aria-hidden="true"
            >
              <div className="vinyl-groove-ring ring-1" />
              <div className="vinyl-groove-ring ring-2" />
              <div className="vinyl-sheen" />
              <div className="vinyl-center-mini-hole" />
            </div>

            {/* Big Spotify Album Cover Card */}
            <div
              className={`spotify-album-cover-card ${playing ? "is-playing" : ""}`}
              onClick={togglePlay}
              role="button"
              tabIndex={0}
              title={playing ? "Klik untuk jeda lagu" : "Klik untuk putar lagu"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePlay();
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto}
                alt="Foto kenangan album Spotify"
                className="spotify-big-photo"
              />

              {/* Glossy Jacket Sheen & Border */}
              <div className="spotify-cover-gloss" />

              {/* Live Play Status Pill on the photo */}
              <div className="spotify-floating-status">
                <span className={`joox-dot ${playing ? "is-live" : ""}`} />
                <span>{playing ? "Sedang Diputar" : "Ketuk untuk Putar"}</span>
              </div>
            </div>
          </div>
        ) : (
          /* 2. JOOX VINYL MODE: Full Retro Turntable with Tonearm */
          <div className="joox-deck-wrap">
            {/* Retro Tonearm Needle */}
            <div
              className={`joox-tonearm ${playing ? "is-playing" : ""}`}
              aria-hidden="true"
            >
              <div className="tonearm-base" />
              <div className="tonearm-stick" />
              <div className="tonearm-head" />
            </div>

            {/* Realistic Grooved Vinyl Record */}
            <div
              className={`joox-vinyl-disc ${playing ? "is-spinning" : ""}`}
              onClick={togglePlay}
              title={playing ? "Klik untuk jeda lagu" : "Klik untuk putar lagu"}
            >
              <div className="vinyl-groove-ring ring-1" />
              <div className="vinyl-groove-ring ring-2" />
              <div className="vinyl-groove-ring ring-3" />
              <div className="vinyl-sheen" />

              <div className="vinyl-center-label">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentPhoto}
                  alt="Foto kenangan di piringan hitam"
                  className="vinyl-album-cover"
                />
                <div className="vinyl-spindle-hole" />
              </div>
            </div>
          </div>
        )}

        {/* Track Info with Spotify-Style Heart Like Button */}
        <div className="spotify-track-row">
          <div className="spotify-track-meta">
            <h3 className="spotify-song-title">{songInfo.title}</h3>
            <p className="spotify-artist-name">
              <Heart size={12} className="inline-heart-icon" /> {songInfo.subtitle}
            </p>
          </div>
          <button
            type="button"
            className={`spotify-like-btn ${isLiked ? "is-liked" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label={isLiked ? "Hapus dari favorit" : "Sukai lagu ini"}
            title={isLiked ? "Lagu favoritmu ♡" : "Sukai lagu"}
          >
            <Heart
              size={20}
              className={`spotify-heart-icon ${isLiked ? "is-filled" : ""}`}
            />
          </button>
        </div>

        {/* Equalizer Soundwave */}
        <div
          className={`joox-equalizer ${playing ? "is-active" : ""}`}
          aria-hidden="true"
        >
          <span className="eq-bar bar-1" />
          <span className="eq-bar bar-2" />
          <span className="eq-bar bar-3" />
          <span className="eq-bar bar-4" />
          <span className="eq-bar bar-5" />
        </div>

        {/* Timeline Scrubber */}
        <div className="joox-progress-wrap">
          <div className="joox-timeline-slider">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPercent}
              onChange={handleSeekChange}
              className="joox-scrub-input"
              aria-label="Geser posisi lagu"
            />
            <div
              className="joox-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="joox-time-row">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls Bar */}
        <div className="joox-controls-bar">
          <button
            type="button"
            className="joox-btn-secondary"
            onClick={() => skipTime(-10)}
            aria-label="Mundur 10 detik"
            title="Mundur 10 detik"
          >
            <RotateCcw size={18} />
            <span className="skip-label">10s</span>
          </button>

          <button
            type="button"
            className={`joox-btn-play ${playing ? "is-playing" : ""}`}
            onClick={togglePlay}
            aria-label={playing ? "Jeda musik" : "Putar musik"}
            title={playing ? "Jeda musik" : "Putar musik"}
          >
            {playing ? (
              <Pause size={26} />
            ) : (
              <Play size={26} className="play-icon-offset" />
            )}
          </button>

          <button
            type="button"
            className="joox-btn-secondary"
            onClick={() => skipTime(10)}
            aria-label="Maju 10 detik"
            title="Maju 10 detik"
          >
            <RotateCw size={18} />
            <span className="skip-label">10s</span>
          </button>
        </div>

        {/* Photo Selection Shelf to swap the big album photo */}
        <div className="joox-photo-shelf">
          <p className="joox-shelf-title">
            <Sparkles size={13} />
            <span>Pilih foto untuk sampul album besar:</span>
          </p>
          <div className="joox-thumbs-row">
            {memories.map((item, idx) => {
              const isSelected = selectedPhotoIndex === idx;
              return (
                <button
                  key={item.image}
                  type="button"
                  className={`joox-thumb-btn ${isSelected ? "is-active" : ""}`}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  aria-label={`Ganti foto ke ${item.caption}`}
                  title={item.caption}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.caption} />
                  <span className="joox-thumb-num">#{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
