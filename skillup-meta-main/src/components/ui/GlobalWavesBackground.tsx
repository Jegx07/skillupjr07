import { Waves } from "./waves-background"
import { useTheme } from "./ThemeProvider"
import { useEffect } from "react"

export function GlobalWavesBackground() {
  const { theme } = useTheme()
  
  useEffect(() => {
    console.log('GlobalWavesBackground rendered with theme:', theme)
  }, [theme])
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Debug indicator - remove this after confirming waves work */}
      <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
        🌊 Waves Active
      </div>
      
      <Waves
        lineColor={theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)"}
        backgroundColor="transparent"
        waveSpeedX={0.015}
        waveSpeedY={0.008}
        waveAmpX={25}
        waveAmpY={18}
        friction={0.94}
        tension={0.006}
        maxCursorMove={80}
        xGap={18}
        yGap={40}
        className="opacity-80"
      />
    </div>
  )
} 