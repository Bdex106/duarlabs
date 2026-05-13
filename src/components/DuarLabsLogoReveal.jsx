import React from 'react';
import { motion } from 'framer-motion';

const word = 'DuarLabs';
const revealEase = [0.16, 1, 0.3, 1];
const beamTransition = {
  duration: 1.34,
  ease: revealEase,
  times: [0, 0.18, 0.84, 1],
};

function mixColor(from, to, ratio) {
  const mix = (start, end) => Math.round(start + (end - start) * ratio);
  return `rgb(${mix(from[0], to[0])} ${mix(from[1], to[1])} ${mix(from[2], to[2])})`;
}

function PixelBurst({ index }) {
  const column = index % 5;
  const row = Math.floor(index / 5);

  return (
    <motion.i
      className="duarlabs-logo-pixel"
      initial={{ opacity: 0, x: -36, y: 0, scale: 0.4 }}
      animate={{
        opacity: [0, 0.7, 0.28, 0],
        x: [-36, -10, 10, 22],
        y: [0, -1, 1, 3],
        scale: [0.4, 0.92, 0.7, 0.2],
      }}
      transition={{
        delay: 0.24 + index * 0.024,
        duration: 0.6,
        ease: revealEase,
        times: [0, 0.3, 0.62, 1],
      }}
      style={{
        left: `${18 + column * 12}%`,
        top: `${30 + row * 12}%`,
      }}
    />
  );
}

function LogoLetter({ letter, index, total }) {
  const displayLetter = letter === ' ' ? '\u00A0' : letter;
  const ratio = total > 1 ? index / (total - 1) : 0;
  const baseColor = mixColor([110, 241, 255], [194, 107, 255], ratio);
  const accentColor = mixColor([233, 255, 255], [225, 207, 255], ratio);
  const glowColor = mixColor([95, 227, 255], [176, 95, 255], ratio);

  return (
    <motion.span
      className="duarlabs-logo-letter"
      style={{
        '--duarlabs-letter-base': baseColor,
        '--duarlabs-letter-accent': accentColor,
        '--duarlabs-letter-glow': glowColor,
      }}
      variants={{
        hidden: {
          opacity: 0,
          y: 10,
          scale: 0.94,
          filter: 'blur(7px)',
        },
        visible: {
          opacity: [0, 0.24, 0.92, 1],
          y: [10, 2, -1, 0],
          scale: [0.94, 0.985, 1.02, 1],
          filter: ['blur(7px)', 'blur(2px)', 'blur(0px)', 'blur(0px)'],
          transition: {
            duration: 0.4,
            ease: revealEase,
            times: [0, 0.26, 0.7, 1],
          },
        },
      }}
    >
      {displayLetter}
    </motion.span>
  );
}

export default function DuarLabsLogoReveal({ text = word }) {
  const letters = Array.from(text);

  return (
    <div className="duarlabs-logo-reveal">
      <motion.div
        className="duarlabs-logo-beam"
        initial={{ x: '-18%', opacity: 0 }}
        animate={{
          x: ['-18%', '4%', '86%', '102%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={beamTransition}
        aria-hidden="true"
      />

      <motion.div
        className="duarlabs-logo-impact"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{
          opacity: [0, 0.55, 0],
          scale: [0.82, 1.02, 1.2],
        }}
        transition={{
          delay: 0.3,
          duration: 0.44,
          ease: revealEase,
        }}
        aria-hidden="true"
      />

      {Array.from({ length: 10 }).map((_, index) => (
        <PixelBurst key={index} index={index} />
      ))}

      <motion.h1
        className="duarlabs-logo-wordmark"
        aria-label={text}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.052,
              delayChildren: 0.25,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          className="duarlabs-logo-mask"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{
            clipPath: [
              'inset(0 100% 0 0)',
              'inset(0 52% 0 0)',
              'inset(0 0% 0 0)',
            ],
          }}
          transition={{
            duration: 1.1,
            delay: 0.18,
            ease: revealEase,
            times: [0, 0.46, 1],
          }}
          aria-hidden="true"
        >
          <span className="duarlabs-logo-core">
            {letters.map((letter, index) => (
              <LogoLetter
                key={`${letter}-${index}`}
                letter={letter}
                index={index}
                total={letters.length}
              />
            ))}
          </span>
        </motion.span>

        <motion.span
          className="duarlabs-logo-layer duarlabs-logo-layer-cyan"
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: [0, 0.26, 0.08, 0],
            x: [0, -7, 2, 0],
            clipPath: [
              'inset(0 0 0 0)',
              'inset(14% 0 54% 0)',
              'inset(58% 0 12% 0)',
              'inset(0 0 0 0)',
            ],
          }}
          transition={{
            delay: 0.27,
            duration: 0.34,
            ease: revealEase,
            times: [0, 0.32, 0.66, 1],
          }}
          aria-hidden="true"
        >
          {text}
        </motion.span>

        <motion.span
          className="duarlabs-logo-layer duarlabs-logo-layer-violet"
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: [0, 0.22, 0.06, 0],
            x: [0, 6, -2, 0],
            clipPath: [
              'inset(0 0 0 0)',
              'inset(10% 0 58% 0)',
              'inset(54% 0 14% 0)',
              'inset(0 0 0 0)',
            ],
          }}
          transition={{
            delay: 0.36,
            duration: 0.32,
            ease: revealEase,
            times: [0, 0.34, 0.7, 1],
          }}
          aria-hidden="true"
        >
          {text}
        </motion.span>
      </motion.h1>
    </div>
  );
}
