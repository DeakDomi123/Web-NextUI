'use client';
import React, { useEffect, useRef } from 'react';
import './Confetti.css';

interface  ConfettiProps{
   speed?: number
}

export default function Confetti(Props: ConfettiProps) { 
    const speedMul = Props.speed ?? 1;
    return (
    <>
        <div className="confetti-container">
          <div className="confetti">
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 10 * speedMul, ['--bg' as any]: 'yellow' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'white' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 29 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 17 * speedMul, ['--bg' as any]: 'blue' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 33 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 26 * speedMul, ['--bg' as any]: 'yellow' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 24 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 5 * speedMul, ['--bg' as any]: 'blue' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 40 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 17 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 25 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 15 * speedMul, ['--bg' as any]: 'yellow' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'yellow' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 25 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'yellow' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 36 * speedMul, ['--bg' as any]: 'white' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'green' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'yellow' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 29 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 30 * speedMul, ['--bg' as any]: 'pink' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 30 * speedMul, ['--bg' as any]: 'red' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 19 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 16 * speedMul, ['--bg' as any]: 'blue' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 34 * speedMul, ['--bg' as any]: 'yellow' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 39 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 40 * speedMul, ['--bg' as any]: 'purple' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 21 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 14 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 38 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 19 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 29 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 21 * speedMul, ['--bg' as any]: 'white' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 17 * speedMul, ['--bg' as any]: 'purple' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'yellow' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 48 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 38 * speedMul, ['--bg' as any]: 'pink' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 13 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 49 * speedMul, ['--bg' as any]: 'yellow' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 19 * speedMul, ['--bg' as any]: 'cyan' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 15 * speedMul, ['--bg' as any]: 'steelblue' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 10 * speedMul, ['--bg' as any]: 'yellow' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'white' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 29 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 17 * speedMul, ['--bg' as any]: 'blue' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 33 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 26 * speedMul, ['--bg' as any]: 'yellow' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 24 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 5 * speedMul, ['--bg' as any]: 'white' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 40 * speedMul, ['--bg' as any]: 'purple' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 17 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 25 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 15 * speedMul, ['--bg' as any]: 'cyan' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'yellow' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 45 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 26 * speedMul, ['--bg' as any]: 'white' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'cyan' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'yellow' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 45 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 50 * speedMul, ['--bg' as any]: 'pink' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 30 * speedMul, ['--bg' as any]: 'red' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 19 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 16 * speedMul, ['--bg' as any]: 'blue' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 33 * speedMul, ['--bg' as any]: 'yellow' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 39 * speedMul, ['--bg' as any]: 'white' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 40 * speedMul, ['--bg' as any]: 'orange' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 21 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 14 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 38 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 19 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 29 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 34 * speedMul, ['--bg' as any]: 'white' }} className="hexagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 17 * speedMul, ['--bg' as any]: 'indigo' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 32 * speedMul, ['--bg' as any]: 'yellow' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 23 * speedMul, ['--bg' as any]: 'white' }} className="square"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 18 * speedMul, ['--bg' as any]: 'green' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 37 * speedMul, ['--bg' as any]: 'red' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 48 * speedMul, ['--bg' as any]: 'pink' }} className="wavy-line"> </i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 38 * speedMul, ['--bg' as any]: 'pink' }} className="rectangle"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 13 * speedMul, ['--bg' as any]: 'red' }} className="pentagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 49 * speedMul, ['--bg' as any]: 'yellow' }} className="dodecagram"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 19 * speedMul, ['--bg' as any]: 'purple' }} className="wavy-line"></i>
            <i style={{ ['--delay' as any]: Math.random(), ['--speed' as any]: 15 * speedMul, ['--bg' as any]: 'cyan' }} className="square"></i>
          </div>
        </div>
    </>);
}