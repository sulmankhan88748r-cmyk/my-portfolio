"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiOpencv,
  SiPytorch,
  SiPython,
  SiReact,
  SiTensorflow,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import type { IconType } from "react-icons";

type SkillBubble = {
  name: string;
  Icon: IconType;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  depth: number;
  glow: "cyan" | "purple" | "blue";
};

const skills: SkillBubble[] = [
  { name: "HTML", Icon: SiHtml5, top: "8%", left: "12%", size: 116, duration: 13, delay: 0.1, depth: 24, glow: "cyan" },
  { name: "CSS", Icon: SiCss, top: "18%", left: "31%", size: 110, duration: 15, delay: 0.3, depth: 18, glow: "blue" },
  { name: "JavaScript", Icon: SiJavascript, top: "11%", left: "50%", size: 132, duration: 14, delay: 0.7, depth: 22, glow: "purple" },
  { name: "React", Icon: SiReact, top: "24%", left: "72%", size: 126, duration: 16, delay: 0.2, depth: 20, glow: "cyan" },
  { name: "Git", Icon: SiGit, top: "16%", left: "88%", size: 104, duration: 12, delay: 0.6, depth: 17, glow: "blue" },
  { name: "Python", Icon: SiPython, top: "42%", left: "14%", size: 124, duration: 15, delay: 0.4, depth: 26, glow: "purple" },
  { name: "Java", Icon: FaJava, top: "40%", left: "33%", size: 112, duration: 13, delay: 0.5, depth: 16, glow: "cyan" },
  { name: "MongoDB", Icon: SiMongodb, top: "45%", left: "50%", size: 130, duration: 17, delay: 0.2, depth: 25, glow: "blue" },
  { name: "MySQL", Icon: SiMysql, top: "42%", left: "70%", size: 114, duration: 14, delay: 0.8, depth: 19, glow: "purple" },
  { name: "TensorFlow", Icon: SiTensorflow, top: "40%", left: "88%", size: 128, duration: 15, delay: 0.3, depth: 24, glow: "cyan" },
  { name: "PyTorch", Icon: SiPytorch, top: "70%", left: "10%", size: 122, duration: 16, delay: 0.1, depth: 22, glow: "blue" },
  { name: "C", Icon: SiC, top: "73%", left: "29%", size: 102, duration: 12, delay: 0.5, depth: 15, glow: "purple" },
  { name: "C++", Icon: SiCplusplus, top: "74%", left: "49%", size: 112, duration: 14, delay: 0.6, depth: 18, glow: "cyan" },
  { name: "OpenCV", Icon: SiOpencv, top: "71%", left: "70%", size: 120, duration: 13, delay: 0.9, depth: 21, glow: "blue" },
];

const glowClasses = {
  cyan: "border-cyan-300/70 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.35)]",
  purple: "border-purple-300/70 text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.35)]",
  blue: "border-blue-300/70 text-blue-100 shadow-[0_0_18px_rgba(96,165,250,0.35)]",
} as const;

export function SkillsCloud() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 35, damping: 16, mass: 0.9 });
  const smoothY = useSpring(pointerY, { stiffness: 35, damping: 16, mass: 0.9 });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    pointerX.set((x - 0.5) * 2);
    pointerY.set((y - 0.5) * 2);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden rounded-none bg-[#05070f] py-10 sm:py-14"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.1),transparent_45%)]" />
      <div className="relative mx-auto h-[560px] w-full max-w-7xl px-4 sm:h-[620px] sm:px-6 lg:h-[680px]">
        {skills.map((skill, index) => (
          <SkillBubbleItem key={skill.name} skill={skill} index={index} pointerX={smoothX} pointerY={smoothY} />
        ))}
      </div>
    </section>
  );
}

function SkillBubbleItem({
  skill,
  index,
  pointerX,
  pointerY,
}: {
  skill: SkillBubble;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const parallaxX = useTransform(pointerX, [-1, 1], [-skill.depth, skill.depth]);
  const parallaxY = useTransform(pointerY, [-1, 1], [-skill.depth, skill.depth]);
  const Icon = skill.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="absolute"
      style={{
        top: skill.top,
        left: skill.left,
        x: parallaxX,
        y: parallaxY,
      }}
    >
      <motion.div
        animate={{
          x: [0, 10, -8, 0],
          y: [0, -12, 8, 0],
          rotate: [0, 1.8, -1.8, 0],
        }}
        transition={{
          duration: skill.duration,
          delay: skill.delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.08 }}
        className={`group flex flex-col items-center justify-center rounded-full border bg-white/10 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] ${glowClasses[skill.glow]}`}
        style={{ width: skill.size, height: skill.size }}
      >
        <Icon
          aria-hidden="true"
          className="mb-1 text-[1.55rem] drop-shadow-[0_0_10px_rgba(56,189,248,0.35)] transition group-hover:brightness-125"
        />
        <span className="px-2 text-xs font-semibold tracking-wide text-white/80 transition group-hover:text-white">
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
}
