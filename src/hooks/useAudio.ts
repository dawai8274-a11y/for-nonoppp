"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import { Howl } from "howler";

interface AudioContextType {
  playing: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  currentTime: number;
  duration: number;
  seek: (seconds: number) => void;
  volume: number;
  setVolume: (vol: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const timerRef = useRef<number | null>(null);

  const initAudio = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [
          "/audio/song.mp3",
          "/audio/background.mp3",
          "/audio/background.webm"
        ],
        format: ["mp3", "webm"],
        loop: true,
        volume: 0.8,
        html5: true,
        preload: true,
        onload: () => {
          if (soundRef.current) {
            setDuration(soundRef.current.duration() || 0);
          }
        },
        onloaderror: (_id, err) => {
          console.error("Howler load error:", err);
        },
        onplayerror: (_id, err) => {
          console.warn("Howler play error (awaiting user gesture):", err);
          if (soundRef.current) {
            soundRef.current.once("unlock", () => {
              soundRef.current?.play();
            });
          }
        },
        onplay: () => {
          setPlaying(true);
        },
        onpause: () => {
          setPlaying(false);
        },
        onstop: () => {
          setPlaying(false);
          setCurrentTime(0);
        },
        onend: () => {
          // loop handles it
        }
      });
    }
    return soundRef.current;
  }, []);

  // Auto-play audio upon first user gesture (touch, click, pointerdown)
  useEffect(() => {
    let triggered = false;
    const handleFirstGesture = () => {
      if (triggered) return;
      triggered = true;
      try {
        const sound = initAudio();
        if (!sound.playing()) {
          sound.play();
        }
      } catch (err) {
        console.warn("First gesture audio start:", err);
      }
    };

    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("click", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
    };
  }, [initAudio]);
  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        if (soundRef.current && soundRef.current.playing()) {
          const seekPos = soundRef.current.seek() as number;
          if (typeof seekPos === "number") {
            setCurrentTime(seekPos);
          }
          const dur = soundRef.current.duration();
          if (dur && dur > 0) {
            setDuration(dur);
          }
        }
      }, 300);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [playing]);

  const play = useCallback(() => {
    const sound = initAudio();
    sound.play();
  }, [initAudio]);

  const pause = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    const sound = initAudio();
    if (sound.playing()) {
      sound.pause();
    } else {
      sound.play();
    }
  }, [initAudio]);

  const seek = useCallback((seconds: number) => {
    if (soundRef.current) {
      soundRef.current.seek(seconds);
      setCurrentTime(seconds);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (soundRef.current) {
      soundRef.current.volume(clamped);
    }
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (soundRef.current) {
      if (isMuted) {
        soundRef.current.volume(volume || 0.5);
        setIsMuted(false);
      } else {
        soundRef.current.volume(0);
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  return React.createElement(
    AudioContext.Provider,
    {
      value: {
        playing,
        togglePlay,
        play,
        pause,
        currentTime,
        duration,
        seek,
        volume,
        setVolume,
        isMuted,
        toggleMute
      }
    },
    children
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    // Graceful fallback if outside provider
    return {
      playing: false,
      enabled: false,
      toggle: () => {},
      togglePlay: () => {},
      play: () => {},
      pause: () => {},
      currentTime: 0,
      duration: 0,
      seek: () => {},
      volume: 0.5,
      setVolume: () => {},
      isMuted: false,
      toggleMute: () => {}
    };
  }
  return {
    ...context,
    enabled: context.playing,
    toggle: context.togglePlay
  };
}
