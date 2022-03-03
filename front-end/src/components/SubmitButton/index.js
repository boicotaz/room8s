import React from "react"

export function SubmitButton({ text, classes }) {
  return (
    <button
      type="submit"
      className={classes}
    >
      {text}
    </button>
  )
}