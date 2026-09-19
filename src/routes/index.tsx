import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { bumpPortfolioView, getPortfolioViews } from "@/lib/views.functions";


import africaNoCodeThumb from "@/assets/africa-no-code-thumbnail.jpg";
import dipyThumb from "@/assets/dipy-thumbnail.jpg";
import tidydenThumb from "@/assets/tidyden-thumbnail.jpg";
import lovemeThumb from "@/assets/loveme-thumbnail.png";
import cashwiseThumb from "@/assets/cashwise-thumbnail.jpg";
import spectrumThumb from "@/assets/spectrum-thumbnail.jpg";
import mathsSafariThumb from "@/assets/maths-safari-thumbnail.png";
import smartHairPlannerThumb from "@/assets/smart-hair-planner-thumbnail.jpg";
import caetanoThumb from "@/assets/caetano-thumbnail.jpg";
import aripThumb from "@/assets/arip-thumbnail.png";
import futascoresThumb from "@/assets/futascores.png";
import fitscheduleThumb from "@/assets/fitschedule-thumbnail.jpg";
import randyProfile from "@/assets/randy-profile.jpg";
import whatsappQr from "@/assets/whatsapp-qr-code.jpeg";
import ccnaBadge from "@/assets/ccna-badge.jpg";
import slaBadge from "@/assets/sla-badge.jpg";
import orbitDevelopers from "@/assets/orbit-developers.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Randy Cheruiyot | Orbit Developers Founder" },
      {
        name: "description",
        content: "Randy Cheruiyot is the owner and founder of Orbit Developers, creator of LoveMe International Dating and FutaScores Soccer Predictions.",
      },
      { property: "og:title", content: "Randy Cheruiyot | Orbit Developers Founder" },
      {
        property: "og:description",
        content: "Meet Randy Cheruiyot, founder of Orbit Developers and creator of mobile products including LoveMe International Dating and FutaScores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function useViewCounter() {
  const fetchViews = useServerFn(getPortfolioViews);
  const bump = useServerFn(bumpPortfolioView);
  const query = useQuery({
    queryKey: ["portfolio-views"],
    queryFn: () => fetchViews(),
    staleTime: 60_000,
  });
  const mutation = useMutation({
    mutationFn: () => bump(),
    onSuccess: (data) => query.refetch().catch(() => data),
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("pv-bumped") === "1") return;
    sessionStorage.setItem("pv-bumped", "1");
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return query.data?.count ?? 0;
}


const NAV = [
  { label: "Orbit Developers", href: "#orbit-developers" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Skills", href: "#skills" },
  { label: "Tools", href: "#tools" },
  { label: "Certifications", href: "#certifications" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

type Project = {
  n: string;
  title: string;
  role: string;
  desc: string;
  languages: string[];
  live?: string;
  sameTab?: boolean;
  image?: string;
  hidden?: boolean;
};

const PROJECTS: Project[] = [
  {
    n: "01",
    title: "Africa No-code",
    role: "Founder & Lead Developer",
    desc: "Digital innovation platform helping startups, SMEs and enterprises build and launch products faster with no-code. Covers SaaS development, workflow automation and API integrations.",
    languages: ["Bubble.io", "JavaScript", "HTML", "CSS", "REST APIs"],
    live: "https://africano-coders.bubbleapps.io/version-test",
    image: africaNoCodeThumb,
  },
  {
    n: "02",
    title: "Dipy, Creator Marketplace",
    role: "Bubble.io Developer",
    desc: "Israel's largest platform connecting content creators with businesses and individuals. It centralizes creator discovery, inquiries, contracts, payments and negotiations into one transparent workflow so both sides can hire and deliver without scattered tools.",
    languages: ["Bubble.io", "JavaScript", "Stripe API", "HTML/CSS"],
    live: "https://dipy.io/",
    image: dipyThumb,
  },
  {
    n: "03",
    title: "Tidy Den",
    role: "Bubble.io Developer",
    desc: "Service marketplace that lets customers quickly find and book trusted professional cleaning services with automated notifications and scheduling.",
    languages: ["Bubble.io", "JavaScript", "Twilio API"],
    live: "https://au.tidyden.com/",
    image: tidydenThumb,
  },
  {
    n: "04",
    title: "Love Me International Dating",
    role: "Founder & Lead Developer",
    desc: "Global dating platform (live on Google Play) connecting people across countries with swipe matching, real time messaging, voice/video calls and premium subscriptions.",
    languages: ["Bubble.io", "Java", "Kotlin", "Android Studio", "RevenueCat", "AdMob"],
    live: "https://play.google.com/store/apps/details?id=com.loveme.intldating&pcampaignid=web_share",
    image: lovemeThumb,
  },
  {
    n: "05",
    title: "CashWise Manager",
    role: "Founder & Lead Developer",
    desc: "Personal finance and business management app to track expenses, budgets, invoices and financial performance, monetized with AdMob and Meta Audience Network.",
    languages: ["Bubble.io", "Java", "Android Studio", "JavaScript"],
    live: "https://play.google.com/store/apps/details?id=com.dimakukhta.diploma",
    image: cashwiseThumb,
  },
  {
    n: "06",
    title: "Spectrum Life",
    role: "Full Stack Developer",
    desc: "Enterprise workplace wellbeing platform with wellness programs, mental health support, appointment scheduling and health analytics dashboards.",
    languages: ["PHP", "Laravel", "MySQL", "JavaScript", "HTML/CSS", "Blade"],
    live: "https://www.spectrum.life",
    image: spectrumThumb,
  },
  {
    n: "07",
    title: "Maths Safari Kids",
    role: "Founder & Developer",
    desc: "Educational mobile app that makes mathematics fun and engaging for children through interactive gamified lessons and progress tracking.",
    languages: ["Bubble.io", "Java", "Android Studio"],
    live: "https://play.google.com/store/apps/details?id=org.dynamicladiesdfw.kidsgame",
    image: mathsSafariThumb,
  },
  {
    n: "08",
    title: "FutaScores Predictions",
    role: "Founder & Developer",
    desc: "Football prediction platform delivering match analysis, statistics, premium memberships and performance analytics.",
    languages: ["Bubble.io", "JavaScript", "REST APIs"],
    live: "https://futascores.live/",
    image: futascoresThumb,
  },
  {
    n: "09",
    title: "FitSchedule",
    role: "Product Designer & Developer",
    desc: "Fitness planning app that helps users organize workouts, track goals and stay accountable with reminders and progress reports.",
    languages: ["Bubble.io", "JavaScript"],
    image: fitscheduleThumb,
  },
  {
    n: "10",
    title: "Smart Hair Planner",
    role: "Founder & Developer",
    desc: "Salon and customer management platform that streamlines appointment booking, customer profiles and haircare planning.",
    languages: ["Bubble.io", "JavaScript"],
    live: "https://healthy-hair-by-debs.bubbleapps.io/version-test",
    image: smartHairPlannerThumb,
  },
  {
    n: "11",
    title: "ARIP",
    role: "Full Stack Developer",
    desc: "Your directors are personally liable. Is your compliance ready to be tested? ARIP is Australia's only fully automated WHS compliance platform covering all 10 jurisdictions. From incident logging to regulator notification, every deadline tracked, every alert automated, every director protected. This is the largest Australian project web app and mobile application I am currently working on and shall be launched soon.",
    languages: ["Bubble.io", "JavaScript", "HTML/CSS", "Workflow Automation"],
    live: "https://arip-website-frontend.vercel.app/#top",
    image: aripThumb,
  },
  {
    n: "12",
    title: "Caetano Kids",
    role: "Website Designer & Developer",
    desc: "Responsive digital showcase for children's playground equipment promoting safe, educational and engaging play.",
    languages: ["Bubble.io", "JavaScript", "HTML/CSS"],
    live: "https://gucaetanoe-kiddy-randy.bubbleapps.io/version-test",
    image: caetanoThumb,
  },
];

const SKILLS: { n: string; title: string; items: string[] }[] = [
  { n: "1", title: "No-code Development", items: ["Bubble.io", "Lovable", "Weweb", "Glide"] },
  { n: "2", title: "Programming & Backend", items: ["PHP Laravel", "JavaScript", "Java", "Kotlin", "Dart", "HTML/CSS", "REST APIs", "MySQL"] },
  { n: "3", title: "Mobile Development", items: ["Android Studio", "Flutter", "WebView Wrapper Apps", "AdMob", "Meta Audience Network", "Start.io"] },
  { n: "4", title: "Payments & Integrations", items: ["Stripe", "PayPal", "Flutterwave", "Paystack", "Twilio", "RevenueCat"] },
  { n: "5", title: "Specialized Solutions", items: ["SaaS Platforms", "Marketplaces", "Dating Apps", "Finance Apps", "Health Platforms", "Education", "Memberships", "Automation"] },
];

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <OrbitDevelopers />
      <Pricing />
      <Process />
      <Projects />
      <Skills />
      <Tools />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

const PHASES = [
  { name: "Analysis & Discovery", pct: 15, color: "var(--orange)", desc: "Requirements, user research, scoping." },
  { name: "Planning & Architecture", pct: 15, color: "#f4b942", desc: "Roadmap, data model, tech choices." },
  { name: "UI / UX Design", pct: 20, color: "#8ee06b", desc: "Wireframes, prototypes, design system." },
  { name: "Development", pct: 30, color: "var(--green)", desc: "Build, integrate, develop features." },
  { name: "Testing & QA", pct: 12, color: "#6bd4c6", desc: "Manual + automated, bug bash." },
  { name: "Launch & Support", pct: 8, color: "#c58bff", desc: "Deploy, monitor, iterate." },
];

function PhasePie() {
  const size = 260;
  const r = 110;
  const cx = size / 2;
  const cy = size / 2;
  let acc = 0;
  const arcs = PHASES.map((p) => {
    const start = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    acc += p.pct;
    const end = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    const large = p.pct > 50 ? 1 : 0;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    return { d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`, color: p.color, name: p.name };
  });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-xs">
      {arcs.map((a) => (
        <path key={a.name} d={a.d} fill={a.color} opacity={0.92} stroke="hsl(var(--background))" strokeWidth={2} />
      ))}
      <circle cx={cx} cy={cy} r={52} fill="hsl(var(--background))" />
      <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground" style={{ fontSize: 14, fontWeight: 600 }}>Project</text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 11 }}>lifecycle</text>
    </svg>
  );
}

function PhaseBars() {
  return (
    <div className="space-y-4">
      {PHASES.map((p, i) => (
        <div key={p.name}>
          <div className="flex items-baseline justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="font-display text-[var(--orange)] text-lg tabular-nums">0{i + 1}</span>
              <span className="text-foreground font-medium">{p.name}</span>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">{p.pct}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min(100, p.pct * 2.8)}%`, background: p.color, boxShadow: `0 0 12px ${p.color}` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function PhaseTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-6 h-px bg-border" />
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
        {PHASES.map((p, i) => (
          <div key={p.name} className="relative flex flex-col items-center text-center">
            <div
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-sm"
              style={{ borderColor: p.color, color: p.color, background: "hsl(var(--background))" }}
            >
              0{i + 1}
            </div>
            <div className="mt-3 text-xs font-semibold text-foreground">{p.name.split(" ")[0]}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
      <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">Process</div>
      <h2 className="font-display mt-5 text-5xl md:text-7xl max-w-3xl">
        How I <span className="text-gradient-warm">track &amp; develop</span> every project.
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        From first conversation to launch, a transparent 6 phase workflow with clear deliverables at each stage.
      </p>

      <div className="mt-8 grid gap-6 rounded-3xl border border-border bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] p-5 md:grid-cols-2 md:p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">Effort distribution</div>
          <PhasePie />
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {PHASES.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
                <span className="text-muted-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 mb-4">Phase breakdown</div>
          <PhaseBars />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] p-5 md:p-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 mb-6">Delivery timeline</div>
        <PhaseTimeline />
      </div>
    </section>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-background/80 backdrop-blur-xl px-4 py-3 md:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--green)] shadow-[0_0_14px_var(--green)]" />
          <span className="tracking-tight whitespace-nowrap">Randy<span className="text-muted-foreground">.dev</span></span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="whitespace-nowrap hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full btn-gradient px-4 py-2 text-sm font-semibold whitespace-nowrap"
          >
            Hire me
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-foreground"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-b border-border/70 bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 md:px-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full btn-gradient px-4 py-2.5 text-sm font-semibold sm:hidden"
            >
              Hire me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const views = useViewCounter();
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-[var(--orange)]/15 blur-3xl" />
        <div className="absolute top-20 right-0 h-[460px] w-[460px] rounded-full bg-[var(--green)]/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24">
        <div className="flex flex-wrap items-center gap-3">
          <div className="alert-blink inline-flex items-center gap-2 rounded-full border border-[var(--green)] bg-[var(--green)]/15 px-4 py-1.5 text-xs font-semibold text-[var(--green)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--green)] shadow-[0_0_14px_var(--green)]" />
            </span>
            Available for new no-code /coded projects
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="text-[var(--orange)]">●</span>
            <span className="font-semibold text-foreground">{views.toLocaleString()}</span>
            {" "}visitors viewed this portfolio
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const url = "https://play.google.com/store/apps/details?id=com.loveme.intldating&pcampaignid=web_share";
            const win = window.open(url, "_blank", "noopener,noreferrer");
            if (!win || win.closed || typeof win.closed === "undefined") {
              window.location.href = url;
            }
          }}
          className="mt-4 inline-flex w-fit max-w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold text-white pink-blink sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <span className="new-badge-blink inline-flex shrink-0 items-center rounded-md bg-white/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider sm:text-[10px]">
            NEW
          </span>
          <span className="truncate">Download LoveMe International Dating</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div>
            <h1 className="font-display text-[9vw] leading-[1.1] md:text-[5rem] max-w-5xl">
              Senior <span className="text-gradient-warm">Full-Stack &amp; Bubble.io</span> Developer.
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              I'm <span className="text-foreground font-semibold">Randy</span>, a{" "}
              <span className="text-gradient-warm font-semibold">Full-Stack & No-Code Developer</span>{" "}
              specializing in scalable SaaS platforms, marketplaces, web and mobile applications. I work across{" "}
              <span className="text-foreground font-semibold">React, TypeScript, JavaScript, Node.js, PHP, Flutter, Kotlin, Dart, HTML, JSON</span> and{" "}
              <span className="text-foreground font-semibold">WeWeb</span>.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              I'm also an <span className="text-gradient-warm font-semibold">AI-powered development specialist</span>,
              experienced in building production-ready applications with{" "}
              <span className="text-foreground font-semibold">Lovable AI</span> and other leading AI development
              platforms. Additionally, I develop{" "}
              <span className="text-foreground font-semibold">Android Studio wrapper apps</span> and implement
              monetization using <span className="text-foreground font-semibold">AdMob, Start.io and Meta Ads</span>.
              I turn ideas into scalable, production-ready digital products using code, no-code and AI.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-3 text-sm font-semibold">
                View my work
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-6 py-3 text-sm hover:bg-white/5 transition">
                Start a project →
              </a>
            </div>
          </div>

          <ProfileCard />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["5+", "Years experience"],
            ["13+", "Developed products"],
            ["8+", "Founder roles"],
            [views.toLocaleString(), "Portfolio views"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] p-5">
              <div className="font-display text-4xl text-[var(--orange)]">{n}</div>
              <div className="mt-2 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
  return (
    <div className="h-fit rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30">
          <img
            src={randyProfile}
            alt="Randy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="text-lg font-semibold">Randy</div>
          <div className="text-xs text-muted-foreground">Full-Stack &amp; Bubble.io Developer</div>
        </div>
      </div>

      <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Age</span>
          <span className="font-medium">31</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Location</span>
          <span className="font-medium">Nairobi, Kenya</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Timezone</span>
          <span className="font-medium">GMT+3 East, Africa</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="shrink-0 text-muted-foreground">Education</span>
          <span className="text-right font-medium">BSc. Information Technology, Kabarak University, Kenya</span>
        </div>
      </div>
    </div>
  );
}



function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
      <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">About</div>
      <h2 className="font-display mt-5 text-5xl md:text-7xl max-w-4xl">
        Randy as a Developer.
      </h2>
      <div className="mt-6 columns-1 gap-8 text-lg text-muted-foreground md:columns-2">
        <p className="break-inside-avoid mb-6">
          I specialize in building scalable SaaS platforms, marketplaces and mobile applications using both traditional software engineering and modern no-code technologies and AI. With extensive expertise in <span className="text-foreground">Bubble.io</span>{" "}
          and <span className="text-foreground">WeWeb</span>, I deliver robust products rapidly while maintaining the flexibility to develop custom solutions using <span className="text-foreground">HTML, CSS, JavaScript, PHP, Java, JSON, Kotlin, Dart, Flutter, Laravel</span>{" "}
          and <span className="text-foreground">MySQL</span> when project requirements demand deeper technical implementation.
        </p>
        <p className="break-inside-avoid mb-6">
          Over the years, I have designed and developed digital products for founders, startups and businesses across the globe, helping transform ideas into scalable, production-ready solutions. My experience spans full-stack application development, API integrations, database architecture, workflow automation, responsive UI/UX design and performance optimization. I have also held remote Bubble.io No-Code Developer positions with <span className="text-foreground">Bluemongoose No-Code Agency</span> based in England and <span className="text-foreground">Deploy No-Code Agency</span> located in Israel, collaborating with international teams to deliver high-quality web and mobile solutions across diverse industries.
        </p>
        <p className="break-inside-avoid mb-6">
          In addition to no-code development, I am an expert in Android application and deployment and web-to-mobile conversion, using <span className="text-foreground">Android Studio</span> to transform web applications into native Android experiences. I have successfully implemented monetization strategies through advertising platforms such as <span className="text-foreground">AdMob, Start.io</span>{" "}
          and <span className="text-foreground">Meta Ads</span>, helping businesses generate sustainable revenue from their applications.
        </p>
        <p className="break-inside-avoid mb-6">
          Beyond client work, I am the Founder of <span className="text-foreground">Africa No-Code</span>, an initiative dedicated to empowering the next generation of African innovators through no-code education, mentorship and community building. Through training programs, workshops and practical mentorship, I help aspiring developers and entrepreneurs leverage no-code technologies to build and launch digital products. I have also developed and launched several successful products, including <span className="text-gradient-warm font-semibold">Maths Safari</span>, a kids mathematical hub that helps young learners, and <span className="text-gradient-warm font-semibold">Loveme International Dating App</span>, a live dating platform available on Google Play that serves users across multiple countries. My mission is to bridge the gap between innovative ideas and scalable technology solutions by combining the speed of no-code development with the power of traditional software engineering.
        </p>
      </div>
    </section>
  );
}

function OrbitDevelopers() {
  return (
    <section id="orbit-developers" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
        <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">My company</div>
        <h2 className="font-display mt-5 text-5xl md:text-7xl">
          Owner & Founder of <span className="text-gradient-warm">Orbit Developers.</span>
        </h2>

        <div className="mt-8 flex flex-col items-center gap-6 sm:mt-6 sm:flex-row sm:items-start">
          <div className="w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-background sm:w-32 md:w-40">
            <img
              src={orbitDevelopers}
              alt="The Orbit Developers logo, Ideas, Code, Impact"
              className="aspect-square h-full w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I am the owner and founder of <span className="font-semibold text-foreground">Orbit Developers</span>,
              a technology company that turns ambitious ideas into useful, accessible digital products. We combine
              thoughtful product design, no-code speed and full-stack development to build and grow web and mobile
              applications with real-world impact.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Orbit Developers is home to <span className="font-semibold text-foreground">LoveMe International Dating</span>,
              available on Google Play and designed to connect people across countries, and
              <span className="font-semibold text-foreground"> FutaScores Soccer Predictions</span>, which gives football
              fans match analysis, statistics and informed predictions.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.loveme.intldating&pcampaignid=web_share"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full btn-gradient px-5 py-3 text-sm font-semibold"
          >
            LoveMe on Google Play ↗
          </a>
          <a
            href="https://futascores.live/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--orange)]/40 bg-[var(--orange)]/10 px-5 py-3 text-sm font-semibold text-[var(--orange)] transition hover:bg-[var(--orange)]/20"
          >
            Preview FutaScores ↗
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-5 py-3 text-sm transition hover:border-primary/60 hover:text-primary"
          >
            Explore our products
          </a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
      <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">Pricing</div>
      <h2 className="font-display mt-5 text-5xl md:text-7xl max-w-4xl">
        Simple, transparent <span className="text-gradient-warm">rates</span>.
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Flexible engagement options for startups, founders and teams. Fixed price builds are scoped before work begins.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface)_55%,transparent)] p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--green)]">Hourly</div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl text-[var(--orange)]">$20</span>
            <span className="text-muted-foreground">/ hour</span>
          </div>
          <p className="mt-4 text-muted-foreground">
            Best for ongoing work, maintenance, bug fixes, feature additions and consulting where scope shifts often.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><span className="text-[var(--green)]">✓</span> Weekly time reports</li>
            <li className="flex items-center gap-2"><span className="text-[var(--green)]">✓</span> Pause or cancel anytime</li>
            <li className="flex items-center gap-2"><span className="text-[var(--green)]">✓</span> Ideal for long-term support</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface)_55%,transparent)] p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--green)]">Fixed project</div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl text-[var(--orange)]">$2k to $6k</span>
          </div>
          <p className="mt-4 text-muted-foreground">
            Fixed price builds for mobile applications and websites. Final cost depends on scope, features, integrations and timeline.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><span className="text-[var(--green)]">✓</span> Scope locked before payment</li>
            <li className="flex items-center gap-2"><span className="text-[var(--green)]">✓</span> Milestone-based delivery</li>
            <li className="flex items-center gap-2"><span className="text-[var(--green)]">✓</span> Mobile apps &amp; websites</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-white/[0.02] p-6 text-center text-sm text-muted-foreground">
        Not sure which fits? <a href="#contact" className="text-[var(--orange)] hover:underline">Book a free call</a> and I'll recommend the right model.
      </div>
    </section>
  );
}

function Projects() {
  const visible = PROJECTS.filter((p) => !p.hidden);
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
      <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">Selected work</div>
      <h2 className="font-display mt-5 text-5xl md:text-7xl">Projects &amp; products</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {visible.length} developed platforms. Numbered, explained, with the exact languages &amp; tools used on each build.
      </p>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {visible.map((p) => (
          <ProjectRow key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ p }: { p: Project }) {
  return (
    <article className="group grid gap-5 py-7 md:grid-cols-[5rem_16rem_1fr_auto] md:items-start md:gap-8">
      <div className="font-display text-5xl text-gradient-warm md:text-6xl">{p.n}</div>

      {/* Thumbnail slot — swap the placeholder for an <img src=... /> when you have artwork */}
      <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white/[0.04] to-white/[0.01] md:aspect-[4/3] md:w-64">
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.title} thumbnail`}
            className="absolute inset-0 m-auto max-h-full max-w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
            <div className="font-display text-3xl text-white/25">{p.title.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Add thumbnail</div>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
        <div className="mt-1 text-xs uppercase tracking-wider text-[var(--green)]">{p.role}</div>
        <p className="mt-3 max-w-2xl text-muted-foreground">{p.desc}</p>

        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            Languages &amp; Tools
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.languages.map((l) => (
              <span
                key={l}
                className="rounded-full border border-[var(--orange)]/30 bg-[var(--orange)]/5 px-2.5 py-1 text-[11px] text-[var(--orange)]"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>


      <div className="md:pt-2">
        {p.live ? (
          <a
            href={p.live}
            target={p.sameTab ? "_self" : "_blank"}
            rel={p.sameTab ? undefined : "noreferrer"}
            onClick={p.sameTab ? (event) => {
              event.preventDefault();
              window.location.assign(event.currentTarget.href);
            } : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-2 text-sm hover:border-[var(--orange)]/60 hover:text-[var(--orange)] transition"
          >
            Live ↗
          </a>
        ) : (
          <span className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
            Case study
          </span>
        )}
      </div>
    </article>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
      <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">Toolbox</div>
      <h2 className="font-display mt-5 text-5xl md:text-7xl">Technical expertise</h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface)_55%,transparent)] p-6">
            <div className="font-display text-4xl text-gradient-warm">{s.n}</div>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.items.map((i) => (
                <span key={i} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import figmaLogo from "@/assets/figma_logo.png";
import miroLogo from "@/assets/miro_logo.png";
import clickupLogo from "@/assets/clickup.jpg";
import twilioLogo from "@/assets/Twilio-Logo.wine.png";
import airdevLogo from "@/assets/images.png";
import timeDoctorLogo from "@/assets/time-doctor.png";
import canvaLogo from "@/assets/canva-logo.png";
import androidStudioLogo from "@/assets/android-studio-logo.jpg";

const TOOLS: { name: string; desc: string; icon: string }[] = [
  { name: "Figma", desc: "UI/UX design, prototypes and design systems.", icon: figmaLogo },
  { name: "Miro", desc: "Whiteboarding, user flows and workshop collaboration.", icon: miroLogo },
  { name: "Notion", desc: "Project docs, wikis and product knowledge base.", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "ClickUp", desc: "Task management, sprints and delivery tracking.", icon: clickupLogo },
  { name: "Monday.com", desc: "Work management and team collaboration boards.", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Monday_logo.svg" },
  { name: "Twilio", desc: "SMS, voice and messaging API integrations.", icon: twilioLogo },
  { name: "Airdev", desc: "Bubble.io Canvas framework for rapid SaaS builds.", icon: airdevLogo },
  { name: "Time Doctor", desc: "Time tracking and productivity reporting for client work.", icon: timeDoctorLogo },
  { name: "Canva", desc: "Quick graphics, social assets and pitch decks.", icon: canvaLogo },
  { name: "Android Studio", desc: "Native Android development, Kotlin builds and mobile app wrapping.", icon: androidStudioLogo },
];

function Tools() {
  const items = [...TOOLS, ...TOOLS];
  return (
    <section id="tools" className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">Workflow Tools</div>
        <h2 className="font-display mt-5 text-5xl md:text-7xl">Tools I use daily.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Design, planning, communication and development tools that keep projects moving.
        </p>
      </div>

      <div className="hover-pause-marquee mx-[10px] mt-10 overflow-hidden rounded-3xl">
        <div className="marquee-track animate-marquee flex w-max gap-6">
          {items.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="group flex w-[340px] shrink-0 flex-col gap-5 rounded-3xl border border-border bg-white p-8 shadow-sm"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gray-50 p-3 shadow-sm">
                <img
                  src={t.icon}
                  alt={`${t.name} logo`}
                  className="max-h-20 max-w-20 object-contain transition duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CERTIFICATIONS: { title: string; items: string[] }[] = [
  {
    title: "Google Certifications",
    items: ["Google Project Management Certificate", "Google UX Design Certificate", "Google Digital Marketing & E-commerce Certificate", "Google Analytics Certification"],
  },
  {
    title: "Udemy Bubble Courses",
    items: ["The Complete Bubble Developer Course", "Build SaaS with Bubble.io", "Bubble.io Mobile App Development", "Advanced Bubble Workflows & APIs"],
  },
  {
    title: "Technical Certifications",
    items: ["CCNA (Cisco Certified Network Associate)", "SLA Software Developer Associate Certificate", "Android Development with Kotlin", "PHP & Laravel for Web Development", "Full-Stack Web Development", "REST API Design & Integration"],
  },
  {
    title: "Relevant Training",
    items: ["No-Code Product Management", "Mobile App Monetization Strategies", "Agile & Scrum Fundamentals", "Startup Product Development"],
  },
];

const FEATURED_BADGES: { name: string; org: string; image: string }[] = [
  { name: "CCNA", org: "Cisco", image: ccnaBadge },
  { name: "Software Developer Associate", org: "SLA", image: slaBadge },
];

function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
      <div className="text-sm uppercase tracking-[0.25em] text-[var(--green)]">Credentials</div>
      <h2 className="font-display mt-5 text-5xl md:text-7xl max-w-4xl">
        Certifications &amp; <span className="text-gradient-warm">badges</span>.
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Continuous learning across no-code, mobile development, product management, networking and software engineering.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        {FEATURED_BADGES.map((b) => (
          <div
            key={b.name}
            className="flex items-center gap-4 rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface)_55%,transparent)] px-5 py-4"
          >
            <img
              src={b.image}
              alt={`${b.name} certification badge`}
              className="h-16 w-16 shrink-0 rounded-xl object-contain"
              loading="lazy"
              width={128}
              height={128}
            />
            <div>
              <div className="font-display text-xl text-foreground">{b.name}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{b.org}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {CERTIFICATIONS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface)_55%,transparent)] p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--orange)]/10 text-[var(--orange)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {c.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
      <div className="rounded-3xl border border-[var(--orange)]/25 bg-gradient-to-br from-[color-mix(in_oklab,var(--orange)_10%,transparent)] via-transparent to-[color-mix(in_oklab,var(--green)_10%,transparent)] p-8 md:p-12">
        <h2 className="font-display text-5xl md:text-7xl max-w-3xl">
          Have an idea? Let's turn it into a{" "}
          <span className="text-gradient-warm">launched product</span>.
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Whether it's a marketplace, SaaS, mobile app or internal automation. I can help
          you scope, design and develop it fast.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="mailto:hello@randy.dev" className="inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-3 text-sm font-semibold">
            Message me
          </a>
          <a
            href={whatsappQr}
            target="_blank"
            rel="noreferrer"
            aria-label="Scan QR code to message me on WhatsApp"
            className="inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-3 text-sm font-semibold"
          >
            WhatsApp Me
          </a>
          <a
            href="https://calendly.com/randycheruiyot/30min"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-6 py-3 text-sm hover:bg-white/5"
          >
            Book a call ↗
          </a>
          <a
            href="https://www.linkedin.com/in/randie-randy-52817711a/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-6 py-3 text-sm hover:bg-white/5"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--green)]" />
          Randy<span className="text-muted-foreground">.dev</span>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Built in Nairobi · Designed &amp; coded by me
        </div>
      </div>
    </footer>
  );
}
