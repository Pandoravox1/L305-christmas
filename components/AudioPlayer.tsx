import React, { useRef, useState } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [toast, setToast] = useState('');
  const [expanded, setExpanded] = useState(false);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        setToast('Wham! - Last Christmas sedang diputar');
        setTimeout(() => setToast(''), 2000);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      {toast && (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-16 pointer-events-none">
          <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in pointer-events-auto">
            {toast}
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        src="/audio/last-christmas.mp3"
        loop
        preload="metadata"
        className="hidden"
      />
      <div className="fixed bottom-6 right-6 z-30">
        <div
          className={`flex items-center gap-3 transition-all duration-300 ease-out ${
            expanded
              ? 'px-4 py-3 rounded-full bg-white/95 shadow-2xl border border-white/60 backdrop-blur-lg'
              : 'px-0 py-0 bg-transparent shadow-none border-none'
          }`}
          style={{ overflow: 'hidden' }}
        >
          <button
            type="button"
            onClick={() => {
              setExpanded(!expanded);
              togglePlay();
            }}
            className={`flex items-center justify-center transition-all duration-300 ease-out ${
              expanded
                ? 'w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl'
                : 'w-14 h-14 rounded-full bg-primary text-white shadow-2xl hover:shadow-xl border border-secondary/50'
            }`}
            aria-label={isPlaying ? 'Jeda' : 'Putar'}
          >
            <span className="material-symbols-outlined text-3xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <div
            className={`flex items-center gap-3 transition-all duration-300 ease-out ${
              expanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-3 w-0'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                toggleMute();
              }}
              className="w-12 h-12 rounded-full bg-gray-100 text-secondary flex items-center justify-center shadow hover:bg-gray-200 transition-all"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <span className="material-symbols-outlined text-2xl">
                {isMuted ? 'volume_up' : 'volume_off'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shadow hover:bg-gray-200 transition-all"
              aria-label="Tutup"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
