"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BriefcaseBusiness,
  CircleDot,
  GraduationCap,
  Heart,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Search,
  Send,
  Target,
  UserRoundCheck,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ThemeToggle } from "@/components/theme-toggle";
import { SkillsCloud } from "@/components/skills-cloud";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    __portfolioIntroSoundPlayed?: boolean;
  }
}

const navItems = ["Home", "About", "Services", "Skills", "Apps", "Contact"];

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Tell a little more about your project."),
});

type FormData = z.infer<typeof formSchema>;

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function PortfolioPage() {
  const [showIntro, setShowIntro] = useState(true);
  const hasPlayedIntroSoundRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 2800);
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 3600);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntro || hasPlayedIntroSoundRef.current) {
      return;
    }

    const existingFlag = window.__portfolioIntroSoundPlayed;
    if (existingFlag) {
      hasPlayedIntroSoundRef.current = true;
      return;
    }

    const playIntroSound = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) {
          return false;
        }

        const context = new AudioContextClass();
        if (context.state === "suspended") {
          context.close().catch(() => undefined);
          return false;
        }

        const now = context.currentTime;
        const master = context.createGain();
        const filter = context.createBiquadFilter();
        const tone = context.createOscillator();
        const shimmer = context.createOscillator();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(520, now);
        filter.frequency.exponentialRampToValueAtTime(5400, now + 1.15);

        tone.type = "triangle";
        tone.frequency.setValueAtTime(180, now);
        tone.frequency.exponentialRampToValueAtTime(760, now + 1.15);

        shimmer.type = "sine";
        shimmer.frequency.setValueAtTime(620, now);
        shimmer.frequency.exponentialRampToValueAtTime(1080, now + 0.85);

        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.05, now + 0.18);
        master.gain.exponentialRampToValueAtTime(0.022, now + 0.65);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 1.22);

        tone.connect(filter);
        shimmer.connect(filter);
        filter.connect(master);
        master.connect(context.destination);

        tone.start(now);
        shimmer.start(now + 0.03);
        tone.stop(now + 1.25);
        shimmer.stop(now + 1.1);

        window.setTimeout(() => {
          context.close().catch(() => undefined);
        }, 1600);

        return true;
      } catch {
        return false;
      }
    };

    const playedImmediately = playIntroSound();
    if (playedImmediately) {
      hasPlayedIntroSoundRef.current = true;
      window.__portfolioIntroSoundPlayed = true;
      return;
    }

    const onFirstInteraction = () => {
      const played = playIntroSound();
      if (played) {
        hasPlayedIntroSoundRef.current = true;
        window.__portfolioIntroSoundPlayed = true;
      }
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [showIntro]);

  return (
    <>
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
            className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#04050b]"
            aria-hidden="true"
          >
            <motion.div
              animate={{ opacity: [0.78, 1, 0.84], scale: [1, 1.02, 1] }}
              transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.14),transparent_45%)]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.965, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative px-6 text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-3 text-[11px] uppercase tracking-[0.5em] text-white/65"
              >
                Portfolio
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22, letterSpacing: "0.24em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.08em" }}
                transition={{ duration: 1.15, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-r from-white via-slate-200 to-blue-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
              >
                Suleman Khan
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0, opacity: 0.35 }}
                animate={{ scaleX: 1, opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 1.3, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-4 h-px w-48 origin-center bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
              />
              <motion.div
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: "125%", opacity: [0, 0.92, 0] }}
                transition={{ duration: 1.15, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/75 to-transparent"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: showIntro ? 0.45 : 1, y: showIntro ? 6 : 0 }}
        transition={{ duration: showIntro ? 0.25 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="#home" className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Suleman.
          </Link>
          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-800 transition hover:text-blue-600 dark:text-slate-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <a href="/api/resume" target="_blank" rel="noreferrer">
              <Button variant="outline" size="default" className="rounded-full">Resume</Button>
            </a>
            <Link href="#contact">
              <Button size="default" className="rounded-full">Hire Me</Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen((p) => !p)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-slate-700 dark:text-slate-200" onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              ))}
              <a
                href="/api/resume"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 dark:text-slate-200"
                onClick={() => setMenuOpen(false)}
              >
                Resume
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-24 px-4 pb-16 pt-10 sm:px-6">
        <section id="home" className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6">
            <Badge>⚡ Available for freelance &amp; remote work</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Hi, I&apos;m <span className="text-slate-900 dark:text-slate-50">Suleman </span>
              <span className="text-blue-600">Khan</span>
            </h1>
            <p className="max-w-xl text-lg text-slate-800 dark:text-slate-300">
              Flutter Mobile App Developer · Dart Programmer · UI Enthusiast. Building modern, responsive mobile applications with passion and creativity.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#contact"><Button size="lg">Hire Me →</Button></Link>
              <Link href="#apps"><Button variant="outline" size="lg">View My Apps</Button></Link>
              <a href="/api/resume" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg">View Resume</Button>
              </a>
              <a href="/api/resume?download=1">
                <Button size="lg">Download Resume</Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-5 pt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <span>1+ YEAR EXPERIENCE</span><Separator orientation="vertical" />
              <span>10+ PROJECTS BUILT</span><Separator orientation="vertical" />
              <span>100% CLIENT FOCUS</span>
            </div>
          </motion.div>
          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative mx-auto w-full max-w-md">
            <div className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-blue-300 dark:border-blue-700" />
            <div className="relative m-8 overflow-hidden rounded-full border-8 border-white shadow-xl dark:border-slate-900">
              <Image src="/profile-photo.jpg" alt="Suleman Khan profile" width={500} height={500} className="h-full w-full object-cover object-[50%_32%]" priority />
            </div>
            <div className="absolute right-0 top-8 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-lg dark:bg-slate-900">Flutter Pro</div>
            <div className="absolute bottom-2 left-8 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-lg dark:bg-slate-900">🟢 Open to Work</div>
          </motion.div>
        </section>

        <SectionTitle id="about" label="ABOUT" title="Crafting mobile apps that turn ideas into real products" highlight="ideas into real products" centered />
        <p className="mx-auto -mt-16 max-w-4xl text-center text-slate-800 dark:text-slate-300">
          I&apos;m Suleman, a passionate Flutter Mobile App Developer specializing in Dart, Firebase, and clean UI design. With one year of hands-on client experience, I help brands launch fast, responsive mobile applications — and I&apos;m actively looking for remote opportunities to grow with great teams.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard icon={<Heart className="h-5 w-5 text-blue-600" />} title="Client-Focused" text="I prioritize clear communication and business outcomes to keep every project aligned with your goals." />
          <InfoCard icon={<Target className="h-5 w-5 text-blue-600" />} title="Hard-Working" text="Reliable, deadline-driven, and committed to delivering polished mobile apps with measurable value." />
          <InfoCard icon={<GraduationCap className="h-5 w-5 text-blue-600" />} title="Continuous Learner" text="Always exploring new tools, plugins, and modern workflows to improve speed and quality." />
        </div>

        <section id="services" className="relative isolate overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/60 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_50%)]" />
          <div className="space-y-12">
            <SectionTitle label="MOBILE APP SERVICES" title="What I can build for your app" centered />
            <p className="-mt-8 mx-auto max-w-2xl text-center text-sm text-slate-800 dark:text-slate-300 sm:text-base">
              End-to-end mobile app support from product-focused UI to launch-ready performance, designed to keep your users engaged.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <ServiceCard icon={<CircleDot className="h-5 w-5 text-blue-600" />} title="Flutter App Development" text="Custom Flutter apps tailored to your product goals, fast and scalable." featured />
              <ServiceCard icon={<BriefcaseBusiness className="h-5 w-5 text-blue-600" />} title="Business Mobile Apps" text="Conversion-focused mobile apps that help users take action." featured />
              <ServiceCard icon={<UserRoundCheck className="h-5 w-5 text-blue-600" />} title="App UI Screens" text="Clean, high-converting app screens built for usability and growth." />
              <ServiceCard icon={<CircleDot className="h-5 w-5 text-blue-600" />} title="App Redesign" text="Modernize outdated apps with a smooth, mobile-first experience." />
              <ServiceCard icon={<Palette className="h-5 w-5 text-blue-600" />} title="Mobile UI Design" text="Clean, modern app interfaces designed around user experience." />
              <ServiceCard icon={<Search className="h-5 w-5 text-blue-600" />} title="App Performance Optimization" text="Improve app speed, responsiveness, and overall performance." />
            </div>
          </div>
        </section>

        <section id="skills" className="space-y-12">
          <SkillsCloud />
        </section>

        <section className="space-y-12">
          <SectionTitle label="JOURNEY" title="Education & Experience" centered />
          <div className="grid gap-10 lg:grid-cols-2">
            <Timeline title="Education" icon={<GraduationCap className="h-5 w-5 text-blue-600" />} entries={[["2024 — PRESENT", "Intermediate (FSc)", "Currently pursuing", "Building academic foundation alongside professional mobile app development work."], ["2023", "Matriculation", "Completed", "Successfully completed secondary education with a focus on science."]]} />
            <Timeline title="Experience" icon={<BriefcaseBusiness className="h-5 w-5 text-blue-600" />} entries={[["2024 — PRESENT", "Freelance Flutter Mobile App Developer", "Client Work", "Designed and developed responsive mobile applications using Flutter and Dart, focusing on conversion-friendly UI and app performance."], ["2023 — 2024", "Self-Taught Mobile App Developer", "Independent", "Mastered Flutter, Dart, and mobile UI design fundamentals through real-world practice projects."]]} />
          </div>
        </section>

        <section id="apps" className="space-y-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionTitle label="APP PROJECTS" title="Recent app projects" />
            <p className="max-w-md text-slate-800 dark:text-slate-300">A selection of mobile apps I&apos;ve designed and developed over the past year.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <ProjectCard gradient="from-blue-600 to-cyan-500" title="Corporate Business App" text="Modern mobile app with services, team info, and lead generation flow." tags={["Flutter", "Dart", "Firebase"]} />
            <ProjectCard gradient="from-orange-500 to-pink-500" title="Restaurant Ordering App" text="User-friendly app with menu browsing, reservations, and map integration." tags={["Flutter", "UI Design", "Responsive"]} />
            <ProjectCard gradient="from-teal-500 to-emerald-400" title="Real Estate App" text="Property listings with filters, gallery, and inquiry forms — fully responsive." tags={["Flutter", "State Management", "Firebase"]} />
          </div>
        </section>

        <section id="contact" className="space-y-12">
          <SectionTitle label="CONTACT" title="Let&apos;s build something together" centered />
          <p className="-mt-10 text-center text-slate-800 dark:text-slate-300">Have a project in mind or a remote role to discuss? I&apos;d love to hear from you.</p>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <ContactInfo icon={<Mail className="h-5 w-5 text-blue-600" />} text="sulmankhan88748r@gmail.com" />
              <ContactInfo icon={<Phone className="h-5 w-5 text-blue-600" />} text="0318-5958133" />
              <ContactInfo icon={<MapPin className="h-5 w-5 text-blue-600" />} text="Attock City, Punjab, Pakistan" />
              <ContactInfo icon={<Link2 className="h-5 w-5 text-blue-600" />} text="suleman-khan90" />
              <a
                href="https://wa.me/923185958133"
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <Button className="mt-2 w-full rounded-lg">Chat on WhatsApp</Button>
              </a>
            </div>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Input placeholder="Your name" {...register("name")} />{errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name.message}</p> : null}</div>
                    <div><Input placeholder="you@example.com" {...register("email")} />{errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : null}</div>
                  </div>
                  <div><Textarea placeholder="Tell me about your project..." {...register("message")} />{errors.message ? <p className="mt-1 text-xs text-red-500">{errors.message.message}</p> : null}</div>
                  <Button type="submit" className="w-full rounded-lg" disabled={isSubmitting}>
                    <Send className="h-4 w-4" /> {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  {success ? <p className="text-sm font-medium text-green-600">Thanks! Your message has been sent successfully.</p> : null}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-800 dark:border-slate-800 dark:text-slate-300">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 sm:px-6">
          <span>© {year} Suleman Khan. All rights reserved.</span>
        </div>
      </footer>
      <a
        href="https://wa.me/923185958133"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition hover:scale-105 hover:bg-green-600"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      </motion.div>
    </>
  );
}

function SectionTitle({
  id,
  label,
  title,
  centered,
  highlight,
}: {
  id?: string;
  label: string;
  title: string;
  centered?: boolean;
  highlight?: string;
}) {
  const parts = highlight ? title.split(highlight) : [title];
  return (
    <div id={id} className={cn("space-y-3", centered ? "text-center" : "")}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{label}</p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {parts[0]}
        {highlight ? <span className="text-blue-600">{highlight}</span> : null}
        {parts[1]}
      </h2>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-lg"><CardHeader><div className="mb-3 inline-flex rounded-full bg-blue-50 p-3">{icon}</div><CardTitle>{title}</CardTitle></CardHeader><CardContent><p className="text-slate-800 dark:text-slate-300">{text}</p></CardContent></Card>;
}

function ServiceCard({
  icon,
  title,
  text,
  featured,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  featured?: boolean;
}) {
  return (
    <motion.article
      whileInView={{ opacity: [0, 1], y: [18, 0] }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card
        className={cn(
          "group relative h-full overflow-hidden border-slate-200/80 bg-white/80 transition-all duration-300 hover:border-blue-200 hover:shadow-[0_16px_36px_-20px_rgba(37,99,235,0.45)] dark:border-slate-700/80 dark:bg-slate-900/80 dark:hover:border-blue-800",
          featured ? "ring-1 ring-blue-200/70 dark:ring-blue-800/70" : "",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-cyan-400/[0.08] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CardHeader className="relative">
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50/90 px-3 py-2 text-sm font-medium shadow-sm dark:border-blue-900/60 dark:bg-blue-950/50">
            {icon}
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
              Service
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <CardTitle>{title}</CardTitle>
            {featured ? (
              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                Popular
              </span>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-slate-800 dark:text-slate-300">{text}</p>
        </CardContent>
      </Card>
    </motion.article>
  );
}

function Timeline({
  title,
  icon,
  entries,
}: {
  title: string;
  icon: React.ReactNode;
  entries: [string, string, string, string][];
}) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3 text-xl font-semibold">{icon}{title}</div>
      <div className="relative ml-1 space-y-8 border-l-2 border-blue-200 pl-6 dark:border-blue-900/60">
        {entries.map(([date, heading, status, desc]) => (
          <div key={heading} className="relative">
            <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950" />
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{date}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{heading}</h3>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-300">{status}</p>
            <p className="mt-2 text-slate-800 dark:text-slate-300">{desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProjectCard({
  gradient,
  title,
  text,
  tags,
}: {
  gradient: string;
  title: string;
  text: string;
  tags: string[];
}) {
  return (
    <Card className="overflow-hidden transition duration-300 hover:scale-[1.02]">
      <div className={cn("h-36 bg-gradient-to-br p-4 text-right text-white", gradient)}>↗</div>
      <CardContent className="space-y-4 p-5">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-800 dark:text-slate-300">{text}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">{tag}</span>)}
        </div>
      </CardContent>
    </Card>
  );
}

function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <Card><CardContent className="flex items-center gap-4 p-4">{icon}<p className="text-slate-700 dark:text-slate-200">{text}</p></CardContent></Card>;
}
