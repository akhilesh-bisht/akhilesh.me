"use client";
import React, { useState, useRef } from "react";
import { Play, Pause, Music2, Lock, Unlock } from "lucide-react";

export default function LockedKalamPlayer() {
  const [isUnlocked, setIsUnlocked] = useState(false); // Controls if the player is visible
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songUrl = "/Alvida.mp3";

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1505") {
      setIsUnlocked(true);
      setShowModal(false);
      // Optional: Auto-play after unlocking
      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      }, 300);
    } else {
      alert("Wrong Password!");
      setPassword("");
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(current || 0);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-transparent font-sans">
      <audio
        ref={audioRef}
        src={songUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* 1. INITIAL STATE: Only show icon if locked */}
      {!isUnlocked ? (
        <button
          onClick={() => setShowModal(true)}
          className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-red-500/50 transition-all shadow-xl"
        >
          <Lock size={20} />
        </button>
      ) : (
        /* 2. UNLOCKED STATE: Show the compact player */
        <div className="relative flex items-center gap-3 bg-zinc-900/95 border border-white/10 p-1.5 pr-4 rounded-xl shadow-xl min-w-[220px] max-w-[240px] overflow-hidden animate-in fade-in zoom-in duration-300">
          <div
            className="absolute bottom-0 left-0 h-[1.5px] bg-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />

          <div
            className={`w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500 shrink-0 ${isPlaying ? "animate-pulse" : ""}`}
          >
            <Music2 size={20} />
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-white text-xs font-bold truncate">
              Alvida
            </span>
            <span className="text-zinc-500 text-[10px] truncate uppercase tracking-widest">
              Kalam Ink
            </span>
          </div>

          <button
            onClick={handlePlayPause}
            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-90 transition-all shadow-md"
          >
            {isPlaying ? (
              <Pause size={14} fill="black" />
            ) : (
              <Play size={14} fill="black" className="ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-[280px] shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Unlock size={24} />
            </div>
            <h2 className="text-white font-bold mb-1">Enter Passcode</h2>
            <p className="text-zinc-400 text-xs mb-4">
              To unlock Kalam Ink - Alvida
            </p>

            <form onSubmit={checkPassword} className="space-y-3">
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-center text-white focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-white text-black text-xs font-bold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Unlock Player
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-zinc-500 text-[10px] uppercase tracking-widest hover:text-zinc-300 transition-colors pt-2"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
