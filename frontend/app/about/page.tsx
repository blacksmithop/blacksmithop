"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";

interface Section {
  text: string;
  enabled: boolean;
}
interface AboutData {
  image?: string;
  introduction?: Section;
  long_text?: Section;
  hobbies?: Section;
  quote?: Section;
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState<AboutData>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  /* ── Theme ─────────────────────────────────────── */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved === "dark" || (!saved && prefers);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  /* ── Data ──────────────────────────────────────── */
  useEffect(() => {
    const fetchData = async () => {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.abhinavkm.com";
      const endpoints = [
        { key: "image", url: `${base}/image` },
        { key: "about", url: `${base}/about` },
      ];

      const result: AboutData = {};
      let ok = 0;

      await Promise.allSettled(
        endpoints.map(async ({ key, url }) => {
          try {
            const res = await fetch(url);
            if (!res.ok) return;

            if (key === "about") {
              const json = await res.json();
              result.introduction = json.introduction;
              result.long_text = json.long_text;
              result.hobbies = json.hobbies;
              result.quote = json.quote;
            } else {
              const blob = await res.blob();
              result.image = URL.createObjectURL(blob);
            }
            ok++;
          } catch (e) {
            console.log(`[fetch] ${key}`, e);
          }
        })
      );

      setData(result);
      setFailed(ok === 0);
      setLoading(false);
    };
    fetchData();
  }, []);

  const goBack = () => window.history.back();

  /* ── Loading ───────────────────────────────────── */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-foreground mx-auto" />
          <p className="mt-3 text-foreground/60">Loading…</p>
        </div>
      </main>
    );
  }

  /* ── Render ────────────────────────────────────── */
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-center">
      {/* Back button – top‑left */}
      <button
        onClick={goBack}
        className="fixed left-4 top-4 z-10 rounded-full bg-foreground/10 p-2 transition hover:bg-foreground/20"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-foreground" />
      </button>

      {failed ? (
        <div className="max-w-xs">
          <img
            src="https://http.cat/images/521.jpg"
            alt="Unavailable"
            className="mx-auto w-full rounded-lg shadow-md"
          />
          <p className="mt-4 text-foreground/60">Info unavailable right now.</p>
        </div>
      ) : (
        <div className="flex w-full max-w-md flex-col items-center space-y-6">
          {/* Avatar + Gradient Rings */}
          {data.image && (
            <div className="relative w-32 sm:w-40">
              <div className="relative z-10 overflow-hidden rounded-full border-4 border-background shadow-lg">
                <img src={data.image} alt="Abhinav KM" className="h-full w-full object-cover" />
              </div>
            </div>
          )}

          {/* Name */}
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Abhinav KM</h2>

          {/* Quote */}
          {data.quote?.enabled && (
            <blockquote className="italic text-foreground/80">
              “{data.quote.text}”
            </blockquote>
          )}

          {/* Introduction */}
          {data.introduction?.enabled && (
            <p className="max-w-xl text-base leading-snug text-foreground/90 sm:text-lg">
              {data.introduction.text}
            </p>
          )}

          {/* Long text */}
          {data.long_text?.enabled && (
            <p className="max-w-xl text-sm leading-snug text-foreground/70 sm:text-base">
              {data.long_text.text}
            </p>
          )}

          {/* Hobbies */}
          {data.hobbies?.enabled && (
            <div className="w-full max-w-xl rounded-xl bg-foreground/5 p-4">
              <p className="mb-1 text-xs uppercase tracking-widest text-foreground/50">
                When I’m not coding…
              </p>
              <p className="text-sm leading-snug text-foreground/80 sm:text-base">
                {data.hobbies.text}
              </p>
            </div>
          )}

          {/* Resume */}
          <a
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.abhinavkm.com"}/resume`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground/10 px-5 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/20 hover:scale-105"
          >
            <FileText className="h-4 w-4" />
            View Resume
          </a>
        </div>
      )}
    </main>
  );
}