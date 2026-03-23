"use client";
import React, { useState, useRef } from "react";
import { Play, Pause, Music2, Lock } from "lucide-react";

export default function CompactKalamPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songUrl = "/Alvida.mp3";

  const handlePlayClick = () => {
    if (isPlaying) {
      // If already playing, just pause
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // If stopped, show password modal
      setShowModal(true);
    }
  };

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1505") {
      setShowModal(false);
      audioRef.current?.play();
      setIsPlaying(true);
      setPassword(""); // clear for next time
    } else {
      alert("Wrong Password! Hint: 1505");
      setPassword("");
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

      {/* SUPER COMPACT CARD */}
      <div className="relative flex items-center gap-3 bg-zinc-900/95 border border-white/5 p-1.5 pr-4 rounded-xl shadow-xl min-w-[220px] max-w-[240px] overflow-hidden">
        {/* Progress bar at bottom */}
        <div
          className="absolute bottom-0 left-0 h-[1.5px] bg-red-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        {/* Small Icon */}
        <div
          className={`w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500 shrink-0 transition-transform ${isPlaying ? "animate-pulse" : ""}`}
        >
          <Music2 size={20} />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-white text-xs font-bold truncate tracking-tight">
            Alvida
          </span>
          <span className="text-zinc-500 text-[10px] truncate uppercase tracking-widest">
            Kalam Ink
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayClick}
          className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-90 transition-all shadow-md"
        >
          {isPlaying ? (
            <Pause size={14} fill="black" />
          ) : (
            <Play size={14} fill="black" className="ml-0.5" />
          )}
        </button>
      </div>

      {/* PASSWORD POPUP */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-[280px] shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={24} />
            </div>
            <h2 className="text-white font-bold mb-1">Private Track</h2>
            <p className="text-zinc-400 text-xs mb-4">Enter passcode to play</p>

            <form onSubmit={checkPassword} className="space-y-3">
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-center text-white focus:outline-none focus:border-red-500 transition-colors"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 text-zinc-400 text-xs font-medium py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-white text-black text-xs font-bold py-2 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
