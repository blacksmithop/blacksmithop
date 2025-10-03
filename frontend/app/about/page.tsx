"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, FileText } from "lucide-react"

interface AboutData {
  image?: string
  about?: {
    quote?: string
    short_description?: string
    long_description?: string
  }
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
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.abhinavkm.com"

      const endpoints = [
        { key: "image", url: `${apiBaseUrl}/image` },
        { key: "about", url: `${apiBaseUrl}/about` },
      ]

      const results: AboutData = {}
      let successCount = 0

      await Promise.allSettled(
        endpoints.map(async ({ key, url }) => {
          try {
            const response = await fetch(url)
            if (response.ok) {
              if (key === "about") {
                const data = await response.json()
                results[key as keyof AboutData] = data
              } else if (key === "image") {
                const blob = await response.blob()
                const imageUrl = URL.createObjectURL(blob)
                results[key as keyof AboutData] = imageUrl
              }
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
              {aboutData.image && (
                <div className="text-center">
                  <div className="relative inline-block">
                    {/* Rotating outer ring */}
                    <div
                      className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-spin"
                      style={{ animationDuration: "3s" }}
                    ></div>
                    <div
                      className="absolute inset-1 rounded-full border-2 border-transparent bg-gradient-to-l from-cyan-500 via-purple-500 to-blue-500 animate-spin"
                      style={{ animationDuration: "2s", animationDirection: "reverse" }}
                    ></div>

                    {/* Profile image container */}
                    <div className="relative p-2">
                      <img
                        src={aboutData.image || "/placeholder.svg"}
                        alt="Abhinav KM"
                        className="w-48 h-48 rounded-full object-cover border-4 border-background shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-8">Abhinav KM</h2>
              </div>

              {aboutData.about && (
                <div className="space-y-8 text-center">
                  {/* Quote section */}
                  {aboutData.about.quote && (
                    <blockquote className="text-2xl md:text-3xl font-bold text-foreground italic">
                      "{aboutData.about.quote}"
                    </blockquote>
                  )}

                  {/* Short description */}
                  {aboutData.about.short_description && (
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                      {aboutData.about.short_description}
                    </p>
                  )}

                  {/* Long description */}
                  {aboutData.about.long_description && (
                    <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                      {aboutData.about.long_description}
                    </p>
                  )}
                </div>
              )}

              <div className="text-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.abhinavkm.com"}/resume`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground/10 hover:bg-foreground/20 rounded-lg transition-all duration-300 hover:scale-105 text-foreground font-medium"
                >
                  <FileText className="w-5 h-5" />
                  Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
