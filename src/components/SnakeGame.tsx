import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

export default function SnakeGame() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [dir, setDir] = useState({ x: 0, y: -1 });
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const dirRef = useRef(dir);
    const snakeRef = useRef(snake);

    useEffect(() => { dirRef.current = dir; }, [dir]);
    useEffect(() => { snakeRef.current = snake; }, [snake]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDir({ x: 0, y: -1 });
        setFood({ x: 5, y: 5 });
        setScore(0);
        setGameOver(false);
        setIsStarted(true);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
                e.preventDefault();
            }

            if (!isStarted && e.key === " ") {
                setIsStarted(true);
                return;
            }

            if (gameOver && e.key === " ") {
                resetGame();
                return;
            }

            const currentD = dirRef.current;
            switch (e.key) {
               case 'ArrowUp':
               case 'w':
               case 'W':
                   if (currentD.y === 0) setDir({ x: 0, y: -1 }); break;
               case 'ArrowDown':
               case 's':
               case 'S':
                   if (currentD.y === 0) setDir({ x: 0, y: 1 }); break;
               case 'ArrowLeft':
               case 'a':
               case 'A':
                   if (currentD.x === 0) setDir({ x: -1, y: 0 }); break;
               case 'ArrowRight':
               case 'd':
               case 'D':
                   if (currentD.x === 0) setDir({ x: 1, y: 0 }); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown, { passive: false });
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isStarted, gameOver]);

    useEffect(() => {
        if (!isStarted || gameOver) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const head = prevSnake[0];
                const d = dirRef.current;
                const newHead = { x: head.x + d.x, y: head.y + d.y };

                // Collision with walls
                if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                    setGameOver(true);
                    return prevSnake;
                }

                // Collision with self
                if (prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check food
                setFood(prevFood => {
                    if (newHead.x === prevFood.x && newHead.y === prevFood.y) {
                        setScore(s => s + 10);
                        return { 
                            x: Math.floor(Math.random() * GRID_SIZE), 
                            y: Math.floor(Math.random() * GRID_SIZE) 
                        };
                    } else {
                        newSnake.pop();
                        return prevFood;
                    }
                });

                return newSnake;
            });
        };

        const currentSpeed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 10);
        const intervalId = setInterval(moveSnake, currentSpeed);

        return () => clearInterval(intervalId);
    }, [isStarted, gameOver, score]);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="mb-4 flex justify-between w-full max-w-[400px] border-b border-[#00FF00]/10 pb-4 items-end">
                <p className="text-[10px] uppercase font-bold text-[#444] tracking-[0.3em] mb-1">Score Analysis</p>
                <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black italic text-[#00FF00]">{(score || 0).toString().padStart(4, '0')}</span>
                    <div className="text-xs text-white/40 uppercase text-right">
                        <p>Status</p>
                        <p className="text-white font-bold">{isStarted ? (gameOver ? 'ERROR' : 'ACTIVE') : 'IDLE'}</p>
                    </div>
                </div>
            </div>
            <div 
                className="relative p-2 md:p-4 border-2 border-[#00FF00] shadow-[0_0_30px_rgba(0,255,0,0.15)] bg-black"
            >
                <div className="relative bg-black w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-[#1a1a1a]">
                    {/* Grid */}
                    <div className="absolute inset-0 grid opacity-10"
                         style={{ 
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, 
                            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` 
                         }}>
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                            <div key={i} className="border border-[#00FF00]/20"></div>
                        ))}
                    </div>

                    {isStarted && snake.map((segment, index) => (
                        <div 
                            key={index}
                            className={`absolute shadow-[0_0_10px_#00FF00] ${index === 0 ? 'bg-[#00FF00] z-10' : 'bg-[#00FF00]/80'}`}
                            style={{
                                width: `${100 / GRID_SIZE}%`,
                                height: `${100 / GRID_SIZE}%`,
                                left: `${(segment.x / GRID_SIZE) * 100}%`,
                                top: `${(segment.y / GRID_SIZE) * 100}%`,
                            }}
                        ></div>
                    ))}
                    
                    {isStarted && <div 
                        className="absolute bg-[#FF00FF] shadow-[0_0_15px_#FF00FF] rounded-full animate-pulse"
                        style={{
                            width: `${100 / GRID_SIZE}%`,
                            height: `${100 / GRID_SIZE}%`,
                            left: `${(food.x / GRID_SIZE) * 100}%`,
                            top: `${(food.y / GRID_SIZE) * 100}%`,
                            transform: 'scale(0.8)',
                            transformOrigin: 'center'
                        }}
                    ></div>}

                    {!isStarted && !gameOver && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                            <div className="text-center">
                                <p className="mb-2 tracking-widest font-bold text-[#00FF00] animate-[pulse_2s_ease-in-out_infinite]">PRESS SPACE</p>
                                <p className="text-[10px] text-[#00FF00]/50 tracking-widest uppercase">SYSTEM READY</p>
                            </div>
                        </div>
                    )}

                    {gameOver && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-20 border border-[#FF00FF]/50 p-4">
                            <div className="text-center">
                                <p className="text-[#FF00FF] font-sans font-black text-3xl mb-4 drop-shadow-[0_0_15px_#FF00FF] tracking-widest italic uppercase">SYSTEM FAILURE</p>
                                <p className="text-[#00FF00] font-sans font-bold opacity-80 animate-pulse tracking-[0.3em] text-xs uppercase cursor-pointer" onClick={(e) => { e.stopPropagation(); resetGame(); }}>Press Space to Reboot</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-8 flex gap-4 text-[10px] font-bold tracking-widest text-[#00FF00]/50 uppercase w-full justify-center">
                <span>[W] Up</span>
                <span>[A] Left</span>
                <span>[S] Down</span>
                <span>[D] Right</span>
            </div>
        </div>
    );
}
