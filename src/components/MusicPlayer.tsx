import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 1,
    title: "Synthwave Horizon",
    artist: "AI Audio Engine",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Neon Grid",
    artist: "AI Audio Engine",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Cybernetic Pulse",
    artist: "AI Audio Engine",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function MusicPlayer() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);

    const activeTrack = TRACKS[currentTrack];

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.error("Audio playback failed", e);
                    setIsPlaying(false);
                });
            }
        }
    }, [currentTrack]);
    
    const handleEnded = () => {
        nextTrack();
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(p || 0);
        }
    };

    return (
        <div className="flex flex-col h-full gap-6 text-white font-sans">
            <audio 
                ref={audioRef} 
                src={activeTrack.url} 
                onEnded={handleEnded}
                onTimeUpdate={handleTimeUpdate}
            />

            {/* Now Playing */}
            <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-[#00FF00] mb-4 tracking-widest">Now Playing</p>
                <div className="bg-[#111] p-4 border-l-2 border-[#00FF00]">
                    <h3 className="font-bold text-lg truncate">{activeTrack.title}</h3>
                    <p className="text-xs text-gray-500 italic truncate opacity-80">{activeTrack.artist}</p>
                </div>
            </div>

            {/* Queue */}
            <div className="space-y-4">
                <p className="text-[10px] uppercase font-bold text-[#444] tracking-widest">Queue</p>
                <div className="flex flex-col gap-2">
                    {TRACKS.map((track, i) => (
                        <div 
                            key={track.id} 
                            onClick={() => { setCurrentTrack(i); setIsPlaying(true); }} 
                            className={`flex justify-between items-center p-3 cursor-pointer transition-all ${currentTrack === i ? 'bg-white/10 opacity-100 border border-[#00FF00]/50 shadow-[0_0_10px_rgba(0,255,0,0.1)]' : 'bg-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
                        >
                            <div className="truncate pr-2">
                                <h4 className="text-sm font-semibold truncate">{track.title}</h4>
                                <p className="text-[10px] opacity-50 truncate">{track.artist}</p>
                            </div>
                            <div className="w-6 h-6 border border-white/20 rounded-full flex items-center justify-center text-[8px] flex-shrink-0">
                                {(i + 1).toString().padStart(2, '0')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress */}
            <div className="space-y-2 mt-4">
                <div className="flex justify-between text-[10px] uppercase tracking-wider">
                    <span>Progress</span>
                    <span className="text-[#00FF00]">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-[#1a1a1a] relative cursor-pointer" onClick={(e) => {
                    if (audioRef.current && audioRef.current.duration) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        audioRef.current.currentTime = percent * audioRef.current.duration;
                    }
                }}>
                    <div className="absolute h-full bg-[#00FF00] transition-all duration-75" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-4 space-y-6">
                <p className="text-[10px] uppercase font-bold text-[#444] mb-2 tracking-[0.3em]">Control Terminal</p>
                <div className="grid grid-cols-3 gap-2">
                    <button onClick={prevTrack} className="aspect-square border border-[#00FF00]/30 flex items-center justify-center hover:bg-[#00FF00] hover:text-black transition-colors text-[#00FF00]">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-current border-b-[6px] border-b-transparent"></div>
                    </button>
                    <button onClick={togglePlay} className={`aspect-square border flex items-center justify-center transition-colors ${isPlaying ? 'border-[#00FF00] bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 'border-[#00FF00] hover:bg-[#00FF00] hover:text-black text-[#00FF00]'}`}>
                        {isPlaying ? (
                            <div className="flex gap-1 justify-center items-center h-6">
                                <div className="w-1.5 h-6 bg-current"></div>
                                <div className="w-1.5 h-6 bg-current"></div>
                            </div>
                        ) : (
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-current border-b-[8px] border-b-transparent ml-1"></div>
                        )}
                    </button>
                    <button onClick={nextTrack} className="aspect-square border border-[#00FF00]/30 flex items-center justify-center hover:bg-[#00FF00] hover:text-black transition-colors text-[#00FF00]">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-current border-b-[6px] border-b-transparent"></div>
                    </button>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider">
                        <span>Volume</span>
                        <span className="text-[#00FF00]">{Math.round(volume * 100)}%</span>
                    </div>
                    <div className="h-1 bg-[#1a1a1a] relative cursor-pointer" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        setVolume(Math.max(0, Math.min(1, percent)));
                    }}>
                        <div className="absolute h-full bg-[#00FF00]" style={{ width: `${volume * 100}%` }}></div>
                    </div>
                </div>
            </div>
            
            <div className="mt-auto pt-6 opacity-80 min-h-[60px]">
                <div className="h-[60px] w-full bg-gradient-to-t from-[#00FF00]/10 to-transparent flex items-end p-1 gap-1">
                    <div className={`flex-1 bg-[#00FF00] transition-all duration-300 ${isPlaying ? 'opacity-30 h-full animate-[bounce_1s_ease-in-out_infinite]' : 'opacity-10 h-2'}`}></div>
                    <div className={`flex-1 bg-[#00FF00] transition-all duration-300 ${isPlaying ? 'opacity-50 h-[75%] animate-[bounce_1.2s_ease-in-out_infinite_0.1s]' : 'opacity-10 h-3'}`}></div>
                    <div className={`flex-1 bg-[#00FF00] transition-all duration-300 ${isPlaying ? 'opacity-20 h-[50%] animate-[bounce_0.8s_ease-in-out_infinite_0.2s]' : 'opacity-10 h-1'}`}></div>
                    <div className={`flex-1 bg-[#00FF00] transition-all duration-300 ${isPlaying ? 'opacity-90 h-[90%] animate-[bounce_0.9s_ease-in-out_infinite_0.15s]' : 'opacity-10 h-4'}`}></div>
                    <div className={`flex-1 bg-[#00FF00] transition-all duration-300 ${isPlaying ? 'opacity-40 h-[66%] animate-[bounce_1.1s_ease-in-out_infinite_0.05s]' : 'opacity-10 h-2'}`}></div>
                </div>
            </div>
        </div>
    );
}
