import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ExternalLink,
  FileText, GitBranch, Link2, LockKeyhole, Mail, Menu, Search, ShieldCheck, X,
} from "lucide-react";
import Themer from "@/components/Themer";

type LegalSection = { title: string; body: ReactNode };
type LegalLayoutProps = {
  kind: "privacy" | "terms";
  sections: LegalSection[];
};

const SLUG = (title: string) => title.toLowerCase().replace(/^\d+\.\s*/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const LAST_UPDATED = "October 18, 2026";

export default function LegalLayout({ kind, sections }: LegalLayoutProps) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const subtitle = isPrivacy
    ? "Your code tells a story. Your data deserves respect. Here's how we handle your information when you connect, collaborate, and build on Gitmate."
    : "Great things are built on trust. These are the ground rules that keep Gitmate useful, fair, and safe for the developer community.";
  const Icon = isPrivacy ? ShieldCheck : FileText;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const nav = useMemo(() => sections.map((section) => ({ ...section, id: SLUG(section.title) })), [sections]);
  const matches = nav.filter((section) => section.title.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px", threshold: 0 }
    );
    document.querySelectorAll("[data-legal-section]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [nav]);

  function navigate(id: string) {
    setActive(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  }

  async function copyLink(id: string) {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-10 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.065] blur-[110px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Gitmate home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
              <GitBranch className="h-[18px] w-[18px] text-primary" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Gitmate</span>
            <span className="ml-1 hidden border-l border-border pl-3 text-xs font-medium text-muted-foreground sm:inline">Legal center</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <Themer />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative overflow-hidden border-b border-border/50 px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.065]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(to bottom, black, transparent)" }} />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative mx-auto max-w-7xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium text-primary sm:text-sm">
              <Icon className="h-4 w-4" /> Gitmate / Legal
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {isPrivacy ? <>Privacy <span className="gradient-text">matters.</span></> : <>Built on <span className="gradient-text">trust.</span></>}
            </h1>
            <p className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">{title}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{subtitle}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> {sections.length} sections</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Last updated {LAST_UPDATED}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/privacy" aria-current={isPrivacy ? "page" : undefined} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${isPrivacy ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}>
                <LockKeyhole className="h-4 w-4" /> Privacy Policy
              </Link>
              <Link to="/terms-of-service" aria-current={!isPrivacy ? "page" : undefined} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${!isPrivacy ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}>
                <FileText className="h-4 w-4" /> Terms of Service
              </Link>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-16">
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:self-start">
            <button type="button" aria-expanded={mobileOpen} aria-controls="legal-navigation" onClick={() => setMobileOpen(!mobileOpen)} className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-semibold lg:hidden">
              <span className="inline-flex items-center gap-2"><Menu className="h-4 w-4 text-primary" /> On this page</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
            </button>
            <div id="legal-navigation" className={`${mobileOpen ? "mt-3 block" : "hidden"} rounded-2xl border border-border/60 bg-card/70 p-4 lg:block lg:max-h-full lg:overflow-y-auto lg:p-5`}>
              <div className="mb-4 hidden items-center justify-between lg:flex"><span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">On this page</span><BookOpen className="h-4 w-4 text-primary" /></div>
              <label className="relative mb-4 block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input aria-label="Find a legal section" placeholder="Find a section..." value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-background/70 pl-9 pr-9 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10" />
                {query && <button aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="h-3.5 w-3.5" /></button>}
              </label>
              <nav aria-label={`${title} sections`} className="space-y-0.5">
                {matches.length ? matches.map((section) => (
                  <button type="button" key={section.id} onClick={() => navigate(section.id)} className={`flex w-full items-center rounded-lg border-l-2 px-3 py-2.5 text-left text-[13px] leading-5 transition-colors ${active === section.id ? "border-primary bg-primary/10 font-medium text-primary" : "border-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`}>
                    {section.title}
                  </button>
                )) : <p className="px-2 py-4 text-sm text-muted-foreground">No matching section.</p>}
              </nav>
              <div className="mt-6 border-t border-border/60 pt-4">
                <p className="text-xs text-muted-foreground">Have a question?</p>
                <a href="mailto:abu112abu112abu112@gmail.com" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"><Mail className="h-4 w-4" /> Contact Gitmate <ExternalLink className="h-3 w-3" /></a>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-8 flex gap-4 rounded-2xl border border-primary/20 bg-primary/[0.055] p-5 sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></span>
              <div>
                <h2 className="font-semibold">{isPrivacy ? "Your privacy, clearly explained" : "A better place to build, together"}</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{isPrivacy ? "Explore what we collect, why we use it, how we protect it, and the choices available to you." : "Review the responsibilities, protections, and community standards that apply when you use Gitmate."}</p>
              </div>
            </div>

            <div className="space-y-4">
              {nav.map((section, index) => (
                <motion.section key={section.id} id={section.id} data-legal-section aria-labelledby={`${section.id}-heading`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-35px" }} transition={{ duration: 0.35 }} className="group scroll-mt-28 rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-primary/20 sm:p-7">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.07] text-xs font-bold tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <h2 id={`${section.id}-heading`} className="pt-1 text-lg font-semibold tracking-tight sm:text-xl">{section.title.replace(/^\d+\.\s*/, "")}</h2>
                    </div>
                    <button type="button" onClick={() => copyLink(section.id)} aria-label={`Copy link to ${section.title}`} title="Copy section link" className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                      {copied === section.id ? <Check className="h-4 w-4 text-primary" /> : <Link2 className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="legal-copy pl-0 text-[14px] leading-[1.9] text-muted-foreground sm:pl-[52px] sm:text-[15px] [&_a]:font-medium [&_a]:text-primary [&_a]:decoration-primary/40 [&_a]:transition-colors hover:[&_a]:decoration-primary [&_strong]:font-semibold [&_strong]:text-foreground [&_li]:pl-1 [&_ul]:my-3">{section.body}</div>
                </motion.section>
              ))}
            </div>

            <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-card p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-[60px]" />
              <div className="relative">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Mail className="h-5 w-5 text-primary" /></span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Questions? We're here to help.</h2>
                <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">Have a question about these policies or your Gitmate account? Reach out to our team.</p>
                <a href="mailto:abu112abu112abu112@gmail.com" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Get in touch <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 bg-card/30 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold"><GitBranch className="h-4 w-4 text-primary" /> Gitmate <span className="font-normal text-muted-foreground">· Built for developers, by developers.</span></Link>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-primary">Terms</Link>
            <Link to="/" className="hover:text-primary">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
