/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden relative flex flex-col border-[6px] md:border-[12px] border-[#1a1a1a]">
      {/* Top Navigation / Brand */}
      <header className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6 border-b border-[#00FF00]/20 z-10 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00FF00] rounded-sm flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 md:w-6 md:h-6 border-2 border-black rotate-45"></div>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">Synth<span className="text-[#00FF00]">Snake</span> v.1.04</h1>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-[#666]">
          <span className="text-[#00FF00]">Session: Active</span>
          <span>System: Optimal</span>
          <span>Buffer: 128ms</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Sidebar: Music Queue & Controls */}
        <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#00FF00]/10 flex flex-col p-6 overflow-y-auto bg-[#050505] z-10 flex-shrink-0">
          <MusicPlayer />
        </aside>

        {/* Center: Game Arena */}
        <section className="flex-1 relative flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] overflow-y-auto min-h-[500px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(#00FF00 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          </div>
          
          <div className="relative z-10 w-full mb-8 flex flex-col items-center justify-center p-4">
            <SnakeGame />
          </div>
        </section>
      </main>

      {/* Bottom Data Ribbon */}
      <footer className="h-8 md:h-10 bg-[#00FF00] text-black flex items-center px-4 md:px-8 text-[10px] font-bold uppercase tracking-[0.5em] overflow-hidden flex-shrink-0">
        <div className="whitespace-nowrap animate-marquee flex gap-12 items-center min-w-max">
          <span>* AUDIO-VISUAL HYBRID SYSTEM ACTIVE *</span>
          <span>SNAKE_LENGTH: 14 UNITS</span>
          <span>BITRATE: 320KBPS</span>
          <span>SYNC_STATUS: LOCKED</span>
          <span>* AUDIO-VISUAL HYBRID SYSTEM ACTIVE *</span>
          <span>SNAKE_LENGTH: 14 UNITS</span>
          <span>BITRATE: 320KBPS</span>
          <span>SYNC_STATUS: LOCKED</span>
          <span>* AUDIO-VISUAL HYBRID SYSTEM ACTIVE *</span>
          <span>SNAKE_LENGTH: 14 UNITS</span>
          <span>BITRATE: 320KBPS</span>
          <span>SYNC_STATUS: LOCKED</span>
        </div>
      </footer>

      {/* Decorative Vertical Text */}
      <div className="absolute left-1 bottom-12 rotate-180 hidden md:block" style={{ writingMode: 'vertical-rl' }}>
        <span className="text-[8px] tracking-[1em] text-[#00FF00]/20 uppercase font-black">Experimental Interface // Design-01</span>
      </div>
    </div>
  );
}
