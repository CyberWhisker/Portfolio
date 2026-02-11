"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Github,
    Linkedin,
    Twitter,
    ArrowDownRight,
    Code2,
    Palette,
    Database,
    Cloud,
    Send,
    CheckCircle,
    ChevronRight,
    Star,
    Sparkles,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/layouts/main-layout";

// ─── Utility: Fade-in on scroll ────────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

// ─── Animated counter ──────────────────────────────────────────────────────
function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const { ref, isVisible } = useInView(0.3);

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const step = target / 40;
        const interval = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(interval); }
            else setCount(Math.floor(start));
        }, 25);
        return () => clearInterval(interval);
    }, [isVisible, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        title: "E-Commerce Platform",
        description: "A full-stack online store with real-time inventory, Stripe payments, and a custom CMS built for scalability.",
        tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
        link: "#",
    },
    {
        title: "AI Chat Dashboard",
        description: "An internal analytics dashboard featuring WebSocket streaming, interactive charts, and role-based access control.",
        tags: ["React", "WebSockets", "D3.js", "Node.js"],
        link: "#",
    },
    {
        title: "Task Automation Tool",
        description: "A drag-and-drop workflow builder that connects third-party APIs with a visual pipeline editor.",
        tags: ["Vue 3", "Python", "FastAPI", "Redis"],
        link: "#",
    },
];

const TESTIMONIALS = [
    {
        quote: "Delivered exceptional work ahead of schedule. Their attention to detail and communication made the entire project seamless.",
        author: "Sarah Chen",
        role: "Product Manager, TechFlow",
    },
    {
        quote: "One of the most talented developers I've worked with. Built a complex feature in half the estimated time.",
        author: "Marcus Rivera",
        role: "CTO, StartupXYZ",
    },
    {
        quote: "Clean, well-documented code and a fantastic collaborative spirit. Would absolutely work together again.",
        author: "Emily Park",
        role: "Engineering Lead, DataPulse",
    },
];

const iconMap: any = {
    Frontend: Code2,
    Backend: Database,
    DevOps: Cloud,
    Design: Palette,
};

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {

    const { auth }: any = usePage().props

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = ["About", "Skills", "Projects", "Contact"];
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: scrolled ? "rgba(10,10,12,0.85)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            }}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#hero">
                    <span className="text-lg font-bold tracking-tight text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="text-emerald-400">{"<"}</span>Erick Lopez<span className="text-emerald-400">{" />"}</span>
                    </span>
                </a>
                <div className="flex items-center gap-6">
                    {links.map((l) => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase()}`}
                            className="text-sm text-zinc-400 hover:text-emerald-400 dark:hover: transition-colors duration-300 tracking-wide uppercase"
                        >
                            {l}
                        </a>
                    ))}
                </div>

                {auth.user ? (
                    <Link href={'/dashboard'}>
                        <Button>Dashboard</Button>
                    </Link>

                ) : (
                    <div className="gap-3 flex">
                        <Link href={'/register'}>
                            <Button>Register</Button>
                        </Link>
                        <Link href={'/login'}>
                            <Button variant="outline">Login</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        >
            {/* Ambient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Green glow */}
                <div
                    className="
                    absolute top-[10%] left-[15%] w-96 h-96 rounded-full blur-3xl
                    opacity-20 dark:opacity-30
                    bg-[radial-gradient(circle,#34d399,transparent_70%)]
                    dark:bg-[radial-gradient(circle,#22c55e,transparent_70%)]
                    "
                />

                {/* Indigo glow */}
                <div
                    className="
                    absolute bottom-[15%] right-[10%] w-80 h-80 rounded-full blur-3xl
                    opacity-15 dark:opacity-25
                    bg-[radial-gradient(circle,#6366f1,transparent_70%)]
                    dark:bg-[radial-gradient(circle,#818cf8,transparent_70%)]
                    "
                />

                {/* Amber glow */}
                <div
                    className="
                    absolute top-[60%] left-[55%] w-64 h-64 rounded-full blur-3xl
                    opacity-10 dark:opacity-20
                    bg-[radial-gradient(circle,#f59e0b,transparent_70%)]
                    dark:bg-[radial-gradient(circle,#fbbf24,transparent_70%)]
                    "
                />
            </div>

            {/* Grid overlay */}
            <div
                className="
                absolute 
                inset-0 
                pointer-events-none 
                opacity-[0.03]
                bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]
                dark:bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
                [background-size:60px_60px]
                "
            />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"} mt-5`}>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-4 py-1.5 text-sm">
                        <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
                        Available for freelance work
                    </Badge>
                </div>

                {/* Headline */}
                <h1
                    className={`text-6xl md:text-8xl font-bold mb-6 leading-none tracking-tight transition-all duration-800 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ fontFamily: "'Playfair Display', serif", transitionDelay: "150ms" }}
                >
                    Hi, I'm{" "}
                    <span className="relative inline-block">
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(135deg, #34d399, #6366f1, #f59e0b)" }}
                        >
                            Erick Lopez
                        </span>
                    </span>
                </h1>

                {/* Sub-headline */}
                <p
                    className={`text-xl md:text-2xl text-zinc-400 mb-4 font-light transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: "300ms" }}
                >
                    Full-Stack Developer &amp; Creative Problem Solver
                </p>

                {/* Short bio */}
                <p
                    className={`text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: "450ms" }}
                >
                    I craft elegant digital experiences with clean code and thoughtful design.
                    Passionate about building products that are fast, accessible, and beautifully intuitive.
                </p>

                {/* CTA Buttons */}
                <div
                    className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: "600ms" }}
                >
                    <a href="#projects">
                        <Button
                            size="lg"
                            className="px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 "
                        >
                            View My Work <ArrowDownRight className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                    <Button
                        variant="outline"
                        size="lg"
                        className="py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                        Download CV
                    </Button>
                </div>

                {/* Social links */}
                <div
                    className={`flex items-center justify-center gap-5 mt-14 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: "750ms" }}
                >
                    {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            className="p-3 rounded-full border border-zinc-800 text-zinc-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300 hover:scale-110 hover:bg-emerald-500/5"
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs uppercase tracking-widest animate-bounce">
                <span>Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-transparent to-emerald-500" />
            </div>
        </section>
    );
}

// ─── About + Stats ──────────────────────────────────────────────────────────
function About() {
    const { ref, isVisible } = useInView();
    const { statData, experienceData }: any = usePage().props;
    return (
        <section id="about" className="py-32 px-6">
            <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                {/* Section label */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-emerald-400 text-sm font-mono">01</span>
                    <Separator className="w-12 bg-emerald-500/40" />
                    <span className="text-emerald-400 text-sm font-mono uppercase tracking-widest">About Me</span>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Text */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Building digital products<br />
                            <span className="text-zinc-500">that people love</span>
                        </h2>
                        <p className="text-zinc-400 leading-relaxed mb-4">
                            I'm a passionate full-stack developer with over 5 years of hands-on experience turning ideas into
                            polished, production-ready applications. My background spans both frontend design and backend architecture,
                            giving me a holistic understanding of how great products are built.
                        </p>
                        <p className="text-zinc-400 leading-relaxed mb-8">
                            When I'm not shipping code, you'll find me exploring new frameworks, contributing to open source,
                            or sipping coffee while sketching out the next big idea. I thrive in collaborative environments and
                            believe the best software is built when design and engineering work hand in hand.
                        </p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {statData.map((s: any, i: any) => (
                            <Card key={i} className="hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
                                <CardContent className="pt-6 pb-8 text-center">
                                    <p className="text-4xl font-bold " style={{ fontFamily: "'Playfair Display', serif" }}>
                                        <AnimatedCount target={s.value} suffix={s.suffix} />
                                    </p>
                                    <p className="text-zinc-500 text-sm mt-2">{s.label}</p>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Experience card — spans 3 cols */}
                        <Card className="col-span-3 hover:border-zinc-700 transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="text-base font-semibol">Experiences</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {experienceData.map((data: any, i: any) => (
                                    <div key={i}>
                                        <Separator className="my-4 bg-zinc-800" />
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold">{data.title} — {data.company}</span>
                                            <Badge variant="outline" className="border-zinc-600 text-xs">{data.status}</Badge>
                                        </div>
                                        <p className="text-zinc-500 text-sm">{data.start_date} – {data.end_date}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Skills / Tech Stack ────────────────────────────────────────────────────
function Skills() {
    const { ref, isVisible } = useInView();
    const { skillDatas }: any = usePage().props;
    return (
        <section id="skills" className="py-32 px-6">
            <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-emerald-400 text-sm font-mono">02</span>
                    <Separator className="w-12 bg-emerald-500/40" />
                    <span className="text-emerald-400 text-sm font-mono uppercase tracking-widest">Tech Stack</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-14" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Technologies I <span className="text-zinc-500">work with</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {skillDatas.map((skill: any, i: number) => {
                        const Icon = iconMap[skill.label] || Code2; // default to Code2 if missing
                        return (
                            <Card
                                key={i}
                                className="hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 group"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors duration-300">
                                            <Icon className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <CardTitle className="text-base">{skill.label}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item: any, j: number) => (
                                            <Badge key={j} variant="outline" className="border-zinc-700 text-xs hover:border-emerald-500/40 hover:text-emerald-400 transition-colors duration-300">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Scrolling logo strip */}
                <div className="mt-20 overflow-hidden">
                    <p className="text-zinc-600 text-xs uppercase tracking-widest text-center mb-6">Also familiar with</p>
                    <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-3 opacity-40">
                        {["GraphQL", "Prisma", "Redis", "Stripe", "Vercel", "Tailwind", "Svelte", "Nest.js", "Socket.io", "Jest"].map((t, i) => (
                            <span key={i} className=" text-sm font-mono tracking-wide hover:text-emerald-400 transition-colors duration-300 cursor-default">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Projects ───────────────────────────────────────────────────────────────
function Projects() {
    const { ref, isVisible } = useInView();
    return (
        <section id="projects" className="py-32 px-6" >
            <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="flex items-center gap-3 mb-4 ">
                    <span className="text-emerald-400 text-sm font-mono">03</span>
                    <Separator className="w-full bg-emerald-500/40" />
                    <span className="text-emerald-400 text-sm font-mono uppercase tracking-widest">Projects</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
                    <h2 className="text-4xl md:text-5xl font-bold " style={{ fontFamily: "'Playfair Display', serif" }}>
                        Selected <span className="text-zinc-500">work</span>
                    </h2>
                    <Button variant="outline" className="rounded-full self-start">
                        View All Projects <ChevronRight />
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-5">
                    {PROJECTS.map((p, i) => (
                        <Card
                            key={i}
                            className="hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/5 group overflow-hidden"
                        >
                            {/* Fake image placeholder */}
                            <div className="h-44 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)` }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Code2 className="w-12 h-12 text-zinc-700 group-hover:text-emerald-500/50 transition-colors duration-500" />
                                </div>
                            </div>
                            <CardContent className="pt-5">
                                <h3 className=" font-semibold text-lg mb-2 group-hover:text-emerald-400 transition-colors duration-300">{p.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{p.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((tag, j) => (
                                        <Badge key={j} variant="outline" >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
function Testimonials() {
    const { ref, isVisible } = useInView();
    return (
        <section className="py-28 px-6">
            <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-emerald-400 text-sm font-mono">04</span>
                        <Separator className="w-12 bg-emerald-500/40" />
                        <span className="text-emerald-400 text-sm font-mono uppercase tracking-widest">Testimonials</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold " style={{ fontFamily: "'Playfair Display', serif" }}>
                        What people <span className="text-zinc-500">say</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((t, i) => (
                        <Card key={i}>
                            <CardContent className="pt-6">
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
                                <Separator className="bg-zinc-800 mb-4" />
                                <div>
                                    <p className=" text-sm font-semibold">{t.author}</p>
                                    <p className="text-zinc-600 text-xs">{t.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Contact ────────────────────────────────────────────────────────────────
function Contact() {
    const { ref, isVisible } = useInView();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3500);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="py-32 px-6" >
            <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="flex items-center gap-3 mb-4 ">
                    <span className="text-emerald-400 text-sm font-mono">05</span>
                    <Separator className="bg-emerald-500/40" />
                    <span className="text-emerald-400 text-sm font-mono uppercase tracking-widest">Contact</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold  mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Let's <span className="text-zinc-500">work together</span>
                </h2>
                <p className="text-zinc-500 mb-16 max-w-lg">Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.</p>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Form */}
                    <div>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
                                <CheckCircle className="w-14 h-14 text-emerald-400 mb-4" />
                                <p className=" font-semibold text-lg">Message Sent!</p>
                                <p className="text-zinc-500 text-sm mt-1">I'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <Label className="text-zinc-400 text-sm mb-2 block">Name</Label>
                                    <Input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="rounded-xl py-3 px-4"
                                    />
                                </div>
                                <div>
                                    <Label className="text-zinc-400 text-sm mb-2 block">Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="rounded-xl py-3 px-4"
                                    />
                                </div>
                                <div>
                                    <Label className="text-zinc-400 text-sm mb-2 block">Message</Label>
                                    <Textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        required
                                        rows={5}
                                        className="rounded-xl py-3 px-4 resize-none"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-emerald-500 hover:bg-emerald-400 font-semibold rounded-full py-3 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Send Message <Send className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* Info cards */}
                    <div className="space-y-5">
                        {[
                            { icon: Mail, label: "Email", value: "youremail@email.com" },
                            { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/yourprofile" },
                            { icon: Github, label: "GitHub", value: "github.com/yourprofile" },
                        ].map((item, i) => (
                            <Card key={i}>
                                <CardContent className="flex items-center gap-4 py-5">
                                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors duration-300">
                                        <item.icon className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-600 text-xs uppercase tracking-wide">{item.label}</p>
                                        <p className="text-zinc-300 text-sm">{item.value}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Availability card */}
                        <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/30 border-emerald-500/20 mt-4">
                            <CardContent className="py-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                                    </span>
                                    <span className="text-emerald-400 font-semibold text-sm">Currently Available</span>
                                </div>
                                <p className="text-sm ml-6">
                                    Open to new opportunities — freelance, contract, or full-time roles.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer className="border-t border-zinc-800 py-8 px-6" >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-zinc-600 text-sm">© 2025 Erick Lopez. Built with React & shadcn/ui.</p>
                <div className="flex items-center gap-4">
                    {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                        <a key={i} href="#" className="text-zinc-600 hover:text-emerald-400 transition-colors duration-300">
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

// ─── Main Export ────────────────────────────────────────────────────────────
export default function Welcome() {
    return (
        <MainLayout>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Testimonials />
            <Contact />
            <Footer />
        </MainLayout>
    );
}