"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Music2,
  Unlock,
  SkipForward,
  SkipBack,
} from "lucide-react";

export default function SecureAudioWidget() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [keyBuffer, setKeyBuffer] = useState("");
  const [tapCount, setTapCount] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Playlist with names
  const playlist = [
    { src: "/audio/Alvida.mp3", name: "Alvida" },
    { src: "/audio/_Allah_Maaf_Kare.mp3", name: "Allah Maaf Kare" },
    { src: "/audio/_ISHAQ_TERA.m4a", name: "Ishaq Tera" },
    { src: "/audio/_Kaise_Hua.m4a", name: "Kaise Hua" },
    {
      src: "/audio/_Parmish_Verma_&_GD_47(128k)",
      name: "_Parmish_Verma_&_GD_47(128k)",
    },
    { src: "/audio/Pehla_Pyaar.m4a", name: "Pehla Pyaar" },
  ];

  // 🔒 Desktop secret (1505)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newBuffer = (keyBuffer + e.key).slice(-4);
      setKeyBuffer(newBuffer);

      if (newBuffer === "1505") {
        setShowModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [keyBuffer]);

  // 📱 Mobile secret (5 taps)
  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 5) {
      setShowModal(true);
      setTapCount(0);
    }

    setTimeout(() => setTapCount(0), 2000);
  };

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "1505") {
      setIsUnlocked(true);
      setShowModal(false);

      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }, 300);
    } else {
      alert("Invalid credentials");
      setPassword("");
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const next = (currentTrack + 1) % playlist.length;
    setCurrentTrack(next);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prev = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prev);
    setIsPlaying(true);
  };

  // ⏱ Format time
  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // ▶ Auto play when track changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrack]);

  return (
    <div
      onClick={handleTap}
      className="flex items-center justify-center p-4 bg-transparent font-sans"
    >
      <audio
        ref={audioRef}
        src={playlist[currentTrack].src}
        onTimeUpdate={() => {
          if (!audioRef.current) return;

          const current = audioRef.current.currentTime;
          const total = audioRef.current.duration;

          setCurrentTime(current);
          setDuration(total);
          setProgress((current / total) * 100 || 0);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleNext}
      />

      {/* 🎵 Player */}
      {isUnlocked && (
        <div className="relative flex items-center gap-3 bg-zinc-900/95 border border-white/10 p-2 pr-3 rounded-xl shadow-xl min-w-[260px] max-w-[280px] overflow-hidden">
          {/* Progress (clickable) */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;

              if (audioRef.current) {
                audioRef.current.currentTime =
                  percent * audioRef.current.duration;
              }
            }}
            className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-700 cursor-pointer"
          >
            <div
              className="h-full bg-red-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            className={`w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500 ${
              isPlaying ? "animate-pulse" : ""
            }`}
          >
            <Music2 size={20} />
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-white text-xs font-bold truncate">
              {playlist[currentTrack].name}
            </span>

            <span className="text-[10px] text-zinc-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button onClick={handlePrev} className="text-white">
            <SkipBack size={16} />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full"
          >
            {isPlaying ? (
              <Pause size={14} />
            ) : (
              <Play size={14} className="ml-0.5" />
            )}
          </button>

          <button onClick={handleNext} className="text-white">
            <SkipForward size={16} />
          </button>
        </div>
      )}

      {/* 🔐 Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-[280px] text-center">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Unlock size={24} />
            </div>

            <h2 className="text-white font-bold mb-1">Restricted Access</h2>

            <form onSubmit={checkPassword} className="space-y-3">
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-center text-white"
              />

              <button
                type="submit"
                className="w-full bg-white text-black text-xs font-bold py-2.5 rounded-lg"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
