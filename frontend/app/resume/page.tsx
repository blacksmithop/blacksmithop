"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ExternalLink, Download } from "lucide-react"

export default function ResumePage() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.abhinavkm.com"
        const resumePdfUrl = `${apiBaseUrl}/resume`
        setResumeUrl(resumePdfUrl)
      } catch (error) {
        console.log("[v0] Failed to fetch resume URL:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchResumeUrl()
  }, [])

  const goBack = () => {
    window.history.back()
  }

  const handleDownload = () => {
    if (resumeUrl) {
      const link = document.createElement("a")
      link.href = resumeUrl
      link.download = "Abhinav_KM_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
          <p className="mt-4 text-foreground/60">Loading resume...</p>
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-12">Resume</h1>

          {error || !resumeUrl ? (
            <div className="space-y-6">
              <img
                src="https://http.cat/images/521.jpg"
                alt="Service unavailable"
                className="mx-auto rounded-lg shadow-lg max-w-md w-full"
              />
              <p className="text-foreground/60 text-lg">Sorry, the resume is currently unavailable.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <p className="text-foreground/80 text-lg">View my resume online or download the PDF file.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Resume
                </a>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-foreground text-foreground font-medium rounded-lg hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
