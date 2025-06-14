import { useCallback, useState } from "react"

export default function useTruncateMiddle(text: string) {
  const [truncatedText, setTruncatedText] = useState("")

  const handleContainer = useCallback(
    (containerElement: HTMLElement | null) => {
      if (!containerElement) return

      measureAndTruncate()
      new ResizeObserver(measureAndTruncate).observe(containerElement)

      function measureAndTruncate() {
        const {
          fontFamily,
          fontSize,
          fontWeight,
          fontStyle,
          paddingLeft,
          paddingRight,
          borderLeftWidth,
          borderRightWidth
        } = getComputedStyle(containerElement!)
        ctx.font = `${fontWeight} ${fontStyle} ${fontSize} ${fontFamily}`

        const textWidth = ctx.measureText(text).width
        const ellipsisWidth = ctx.measureText(ellipsis).width
        const narrowestCharWidth = ctx.measureText(narrowestChar).width
        const widestCharWidth = ctx.measureText(widestChar).width
        const displayableWidth =
          containerElement!.offsetWidth -
          getPixelLengthValue(paddingLeft) -
          getPixelLengthValue(paddingRight) -
          getPixelLengthValue(borderLeftWidth) -
          getPixelLengthValue(borderRightWidth) -
          safetyMargin

        if (textWidth < displayableWidth) {
          setTruncatedText(text)
        } else if (displayableWidth <= ellipsisWidth) {
          setTruncatedText(ellipsis)
        } else {
          const delta = textWidth + ellipsisWidth - displayableWidth
          const maxCharsToRemove = Math.ceil(delta / narrowestCharWidth)
          const minCharsToRemove = Math.ceil(delta / widestCharWidth)

          for (
            let nCharsToRemove = minCharsToRemove;
            nCharsToRemove <= maxCharsToRemove;
            nCharsToRemove++
          ) {
            const nCharsToRemoveFromLeft = Math.floor(nCharsToRemove / 2)
            const nCharsToRemoveFromRight =
              nCharsToRemove - nCharsToRemoveFromLeft
            const middleIndex = Math.round(text.length / 2)
            const left = text.substring(0, middleIndex - nCharsToRemoveFromLeft)
            const right = text.substring(middleIndex + nCharsToRemoveFromRight)
            const truncatedText = `${left}${ellipsis}${right}`
            const truncatedTextWidth = ctx.measureText(truncatedText).width
            if (truncatedTextWidth < displayableWidth) {
              setTruncatedText(truncatedText)
              return
            }
          }
        }
      }
    },
    [text]
  )

  return { handleContainer, truncatedText }
}

const ctx = document.createElement("canvas").getContext("2d")!
const ellipsis = "..."
const narrowestChar = " "
const widestChar = "  "
const safetyMargin = 2

function getPixelLengthValue(length: string) {
  return Number(length.replace("px", ""))
}
