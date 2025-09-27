"use client"

import { useEffect, useState } from "react"

const Eye = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-20 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-all duration-300 group"
      aria-label={isOpen ? "Switch to dark mode" : "Switch to light mode"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-foreground transition-all duration-300"
      >
        {/* Eye outline */}
        <path
          d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-60"}`}
        />

        {/* Pupil - visible when eye is open */}
        {isOpen && <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />}

        {/* Eyelid - covers eye when closed */}
        {!isOpen && (
          <path
            d="M1 12c1.73-4.89 6-8 11-8s9.27 3.11 11 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            className="opacity-80"
          />
        )}
      </svg>
    </button>
  )
}

const TypingAnimation = ({ texts, mounted }: { texts: string[]; mounted: boolean }) => {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const currentText = texts[currentTextIndex]

  useEffect(() => {
    if (!mounted) return

    const timeout = setTimeout(
      () => {
        if (isTyping) {
          if (currentIndex < currentText.length) {
            setDisplayText(currentText.slice(0, currentIndex + 1))
            setCurrentIndex(currentIndex + 1)
          } else {
            // Pause before backspacing
            setTimeout(() => setIsTyping(false), 2000)
          }
        } else {
          if (currentIndex > 0) {
            setDisplayText(currentText.slice(0, currentIndex - 1))
            setCurrentIndex(currentIndex - 1)
          } else {
            // Move to next text in array
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
            setTimeout(() => setIsTyping(true), 1000)
          }
        }
      },
      isTyping ? 150 : 100,
    ) // Typing speed vs backspace speed

    return () => clearTimeout(timeout)
  }, [currentIndex, isTyping, currentText, texts, mounted, currentTextIndex])

  return (
    <span className="text-foreground/80">
      {displayText}
      <span className="animate-pulse text-foreground">|</span>
    </span>
  )
}

const SocialIcons = () => {
  const socialLinks = [
    {
      name: "Notion",
      url: "https://abhinavkm.notion.site/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "http://github.com/blacksmithop",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Medium",
      url: "https://medium.com/@blacksmithop",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
    },
    {
      name: "StackOverflow",
      url: "https://stackoverflow.com/users/11323371/insertcheesyline",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092L6.785 12.743zM24 22.25v-6.5h-2.5v4h-14v-4H5v6.5h19zM6.5 17.75h11v-2h-11v2z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-20 flex gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-all duration-300 group text-foreground hover:scale-110"
          aria-label={`Visit ${social.name} profile`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}

const ActionIcons = ({ mounted }: { mounted: boolean }) => {
  const actions = [
    {
      name: "Hire Me",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
      onClick: () => (window.location.href = "/about"),
    },
    {
      name: "Contact",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      onClick: () => window.open("mailto:contact@example.com", "_blank"),
    },
    {
      name: "Projects",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      onClick: () => (window.location.href = "/projects"),
    },
  ]

  return (
    <div
      className={`
        mt-8 flex gap-4 justify-center
        transition-all duration-1000 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: "2.5s" }}
    >
      {actions.map((action) => (
        <button
          key={action.name}
          onClick={action.onClick}
          className="
            p-4 
            border-2 border-foreground/20 
            bg-transparent 
            text-foreground 
            font-medium 
            rounded-full 
            hover:bg-foreground 
            hover:text-background 
            hover:border-foreground
            transition-all duration-300 
            group
            hover:scale-110
            cursor-pointer
          "
          aria-label={action.name}
          title={action.name}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">{action.icon}</span>
        </button>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const typingTexts = ["Developer", "Gamer", "Reader"]

  useEffect(() => {
    setMounted(true)
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
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <Eye isOpen={!isDark} onClick={toggleTheme} />
      <SocialIcons />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${20 + Math.random() * 80}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={`rain-layer-${i}`}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${10 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${0.8 + Math.random() * 1.5}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`light-rain-${i}`}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${5 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1.5 + Math.random() * 2.5}s`,
              opacity: 0.2,
              width: "1px",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <h1
          className={`
            text-6xl md:text-8xl lg:text-9xl 
            font-bold 
            text-foreground 
            name-hover 
            text-balance
            ${mounted ? "fade-in" : "opacity-0"}
          `}
          style={{
            fontFamily: "var(--font-sans)",
            letterSpacing: "-0.02em",
            lineHeight: "0.9",
          }}
        >
          Abhinav KM
        </h1>

        <div
          className={`
            mt-6 text-xl md:text-2xl lg:text-3xl
            font-medium
            transition-all duration-1000 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{
            fontFamily: "var(--font-sans)",
            letterSpacing: "-0.01em",
            transitionDelay: "1.5s",
          }}
        >
          <TypingAnimation texts={typingTexts} mounted={mounted} />
        </div>

        <div
          className={`
            mt-8 mx-auto h-px bg-foreground/20 
            transition-all duration-1000 ease-out
            ${mounted ? "w-32 opacity-100" : "w-0 opacity-0"}
          `}
          style={{ transitionDelay: "2s" }}
        />

        <ActionIcons mounted={mounted} />
      </div>
    </main>
  )
}
