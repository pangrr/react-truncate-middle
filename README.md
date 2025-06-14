# React Truncate Middle

## Usage

`npm install @pangrr/react-truncate-middle`

```tsx
import useTruncateMiddle from "@pangrr/react-truncate-middle"
import { Tooltip } from "react-tooltip"

export default function App() {
  const text =
    "this is a very looooooooong text this is a very looooooooong text this is a very looooooooong text"
  const { handleContainer, truncatedText } = useTruncateMiddle(text)

  return (
    <>
      <div ref={handleContainer}>{truncatedText}</div>
      {truncatedText !== text && <Tooltip>{text}</Tooltip>}
    </>
  )
}
```
