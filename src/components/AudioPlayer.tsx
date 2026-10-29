import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, MicOff, Disc } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string | null;
  dishName: string;
  duration?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  dishName,
  duration = "02:30"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isDisabled = !audioUrl || loadError;

  useEffect(() => {
    // Reset state on URL change
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(false);
  }, [audioUrl]);

  const togglePlay = () => {
    if (isDisabled) return;
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setLoadError(true);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled || !audioRef.current) return;
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    if (isDisabled || !audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-5 shadow-sm recipe-card-stitch relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-amber-500/10 text-[#B3261E] dark:text-[#E25B53]">
            <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)] block">
              Oral History Recording
            </span>
            <h4 className="font-heading text-sm font-medium text-[var(--text-primary)]">
              {dishName} — Student Narrative
            </h4>
          </div>
        </div>

        {isDisabled ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded bg-amber-500/10 text-[var(--text-muted)] font-mono text-[0.72rem]">
            <MicOff className="w-3.5 h-3.5 text-[#B3261E]" />
            Consent not given
          </span>
        ) : (
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {formatTime(currentTime)} / {totalDuration ? formatTime(totalDuration) : duration}
          </span>
        )}
      </div>

      {/* Hidden HTML5 Audio Element if URL exists */}
      {audioUrl && !loadError && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onError={() => setLoadError(true)}
          preload="metadata"
        />
      )}

      {/* Controls row */}
      <div className="flex items-center gap-3 mt-1">
        <button
          type="button"
          onClick={togglePlay}
          disabled={isDisabled}
          aria-label={isPlaying ? "Pause audio" : "Play oral history"}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isDisabled
              ? 'bg-stone-300/40 dark:bg-stone-800/40 text-stone-400 cursor-not-allowed'
              : 'bg-[#B3261E] hover:bg-[#961F18] text-white shadow-sm active:scale-95'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Progress scrub bar */}
        <div className="flex-1 flex flex-col justify-center">
          <input
            type="range"
            min={0}
            max={totalDuration || 100}
            value={currentTime}
            onChange={handleSeek}
            disabled={isDisabled}
            aria-label="Audio progress"
            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#B3261E] ${
              isDisabled
                ? 'bg-stone-300/40 dark:bg-stone-800/40 cursor-not-allowed'
                : 'bg-amber-200/50 dark:bg-stone-700'
            }`}
          />
          {isDisabled && (
            <span className="font-handwriting text-xs text-[var(--text-muted)] mt-1.5 italic">
              Interviewee did not consent for usage of their oral history audio
            </span>
          )}
        </div>

        {/* Volume toggle */}
        <button
          type="button"
          onClick={toggleMute}
          disabled={isDisabled}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className={`p-2 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ${
            isDisabled ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {isDisabled && (
        <div className="mt-3 pt-2.5 border-t border-[var(--border-warm)]/60 flex items-center gap-2 text-xs text-[var(--text-muted)] font-serif italic">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 not-italic" />
          <span>Note: The interviewee did not consent for usage of their oral history audio.</span>
        </div>
      )}
    </div>
  );
};
