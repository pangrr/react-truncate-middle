# react hook to truncate text in the middle

I prefer hooks over components because components limit my styling.

![Screenshot 2025-06-13 at 6 41 05 PM](https://github.com/user-attachments/assets/e28a1be3-984a-430e-8de2-67a1027c3ada)

## [playable example](https://playcode.io/2422815)

## use

`npm install @pangrr/react-truncate-middle`

```tsx
import useTruncateMiddle from "@pangrr/react-truncate-middle"
import { Tooltip } from "react-tooltip"

function App() {
  const text =
    "this is a very looooooooong text this is a very looooooooong text this is a very looooooooong text"
  const { handleContainer, truncatedText } = useTruncateMiddle(text)

  return (
    <>
      /* use "noWrap" to prevent temporary text wrap when container width
      quickly descreases */
      <div ref={handleContainer} style={{ textWrap: "noWrap" }}>
        {truncatedText}
      </div>
      {truncatedText !== text && <Tooltip>{text}</Tooltip>}
    </>
  )
}
```
