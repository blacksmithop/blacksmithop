"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

interface AboutData {
  image?: string
  resume?: string
  description?: string
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [aboutData, setAboutData] = useState<AboutData>({})
  const [loading, setLoading] = useState(true)
  const [allEndpointsFailed, setAllEndpointsFailed] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  useEffect(() => {
    const fetchAboutData = async () => {
      const endpoints = [
        { key: "image", url: "http://localhost:8080/image" },
        { key: "resume", url: "http://localhost:8080/resume" },
        { key: "description", url: "http://localhost:8080/about" },
      ]

      const results: AboutData = {}
      let successCount = 0

      await Promise.allSettled(
        endpoints.map(async ({ key, url }) => {
          try {
            const response = await fetch(url)
            if (response.ok) {
              const data = await response.text()
              results[key as keyof AboutData] = data
              successCount++
            }
          } catch (error) {
            console.log(`[v0] Failed to fetch ${key}:`, error)
          }
        }),
      )

      setAboutData(results)
      setAllEndpointsFailed(successCount === 0)
      setLoading(false)
    }

    fetchAboutData()
  }, [])

  const goBack = () => {
    window.history.back()
  }

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
          <p className="mt-4 text-foreground/60">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-background">
      {/* Back button */}
      <button
        onClick={goBack}
        className="fixed top-6 left-6 z-20 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-all duration-300 group"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-12 text-center">About</h1>

          {allEndpointsFailed ? (
            <div className="text-center">
              <img
                src="https://http.cat/images/521.jpg"
                alt="Service unavailable"
                className="mx-auto rounded-lg shadow-lg max-w-md w-full"
              />
              <p className="mt-6 text-foreground/60 text-lg">Sorry, the about information is currently unavailable.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Image section */}
              {aboutData.image && (
                <div className="text-center">
                  <img
                    src={aboutData.image || "/placeholder.svg"}
                    alt="Abhinav KM"
                    className="mx-auto rounded-lg shadow-lg max-w-md w-full"
                  />
                </div>
              )}

              {/* Description section */}
              {aboutData.description && (
                <div className="prose prose-lg max-w-none text-foreground">
                  <div dangerouslySetInnerHTML={{ __html: aboutData.description }} />
                </div>
              )}

              {/* Resume button section */}
              {aboutData.resume && (
                <div className="text-center">
                  <a
                    href={aboutData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                    View Resume
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
