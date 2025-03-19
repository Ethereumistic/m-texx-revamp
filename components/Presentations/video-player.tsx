"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

// Create a global variable to track the active player ID
let activePlayerId: string | null = null

interface VideoPlayerProps {
  src: string
  title: string
  thumbnailUrl?: string
  className?: string
  id: string // Add an ID prop to uniquely identify each player
}

export function VideoPlayer({ src, title, thumbnailUrl, className, id }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isActive, setIsActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }, [])

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }, [])

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }, [])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }, [])

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [])

  // Set this player as active when clicked
  const setAsActive = useCallback(() => {
    activePlayerId = id
    setIsActive(true)
    // Deactivate all other players
    document.querySelectorAll(".video-player").forEach((player) => {
      if (player.id !== `video-player-${id}`) {
        player.classList.remove("is-active")
      } else {
        player.classList.add("is-active")
      }
    })
  }, [id])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle events for the active player
      if (activePlayerId === id) {
        if (e.code === "Space") {
          e.preventDefault() // Prevent page scrolling
          togglePlay()
        } else if (e.code === "ArrowRight") {
          if (videoRef.current) {
            videoRef.current.currentTime += 5 // Skip forward 5 seconds
          }
        } else if (e.code === "ArrowLeft") {
          if (videoRef.current) {
            videoRef.current.currentTime -= 5 // Skip backward 5 seconds
          }
        } else if (e.code === "KeyM") {
          toggleMute()
        } else if (e.code === "KeyF") {
          toggleFullscreen()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [id, isPlaying, togglePlay, toggleMute, toggleFullscreen])

  // Set tabIndex to make the container focusable
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.tabIndex = 0
    }
  }, [])

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div
      id={`video-player-${id}`}
      ref={containerRef}
      className={cn(
        "relative group overflow-hidden rounded-lg bg-black aspect-video focus:outline-none focus:ring-2 focus:ring-primary video-player",
        isActive && "is-active",
        className,
      )}
      onClick={() => {
        setAsActive()
        togglePlay()
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumbnailUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={(e) => {
          e.stopPropagation() // Prevent double-triggering with container click
          setAsActive()
          togglePlay()
        }}
      />

      {/* Video Title Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-white font-medium">{title}</h3>
      </div>

      {/* Play/Pause Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={(e) => {
          e.stopPropagation() // Prevent double-triggering with container click
          setAsActive()
          togglePlay()
        }}
      >
        <div className="bg-black/30 rounded-full p-4">
          {isPlaying ? <Pause className="h-12 w-12 text-white" /> : <Play className="h-12 w-12 text-white" />}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation() // Prevent triggering container click
            handleProgressClick(e)
          }}
        >
          <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setAsActive()
                togglePlay()
              }}
              className="text-white hover:text-primary transition-colors"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            <div className="relative group/volume" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setAsActive()
                  toggleMute()
                }}
                className="text-white hover:text-primary transition-colors"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>

              {/* Volume Slider - Using group hover instead of mouseenter/leave */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 p-3 rounded-lg w-24 opacity-0 invisible group-hover/volume:opacity-100 group-hover/volume:visible transition-all">
                <Slider
                  defaultValue={[volume]}
                  value={[volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setAsActive()
              toggleFullscreen()
            }}
            className="text-white hover:text-primary transition-colors"
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}

