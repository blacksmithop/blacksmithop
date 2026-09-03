"use client"

import { useEffect, useState } from "react"

const ThemeToggle = ({ isDark, onClick }: { isDark: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 top-6 z-10 rounded-full bg-foreground/10 p-2.5 transition hover:bg-foreground/20"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {isDark ? (
          <circle cx="12" cy="12" r="5" />
        ) : (
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        )}
      </svg>
    </button>
  )
}

const socialLinks = [
  { name: "GitHub", url: "https://github.com/blacksmithop" },
  { name: "Medium", url: "https://medium.com/@blacksmithop" },
  { name: "StackOverflow", url: "https://stackoverflow.com/users/11493344" },
  { name: "Notion", url: "https://abhinavkm.notion.site/" },
]

const navLinks = [
  { name: "About", href: "/about/" },
  { name: "Projects", href: "/projects/" },
  { name: "Blog", href: "/blog/" },
]

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle("dark", newIsDark)
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <ThemeToggle isDark={isDark} onClick={toggleTheme} />

      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Abhinav KM</h1>

        <p className="mt-3 text-lg text-foreground/70">Developer &middot; Gamer &middot; Reader</p>

        <p className="mt-6 leading-relaxed text-foreground/80">
          I like bringing unconventional ideas to life. This is my little corner of the internet — links to what
          I've written, built, and am up to below.
        </p>

        <hr className="mt-8 border-foreground/10" />

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground underline decoration-foreground/30 underline-offset-4 transition hover:decoration-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 transition hover:text-foreground"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
