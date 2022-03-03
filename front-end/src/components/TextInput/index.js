import React from "react"

export function TextInput({ labelText, placeholder, value, handleChange, inputClasses, labelClasses }) {
  return (
    <label className={labelClasses}>
      {labelText}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={inputClasses}
      // onChange={handleChange} Uncomment when implement the login form functionality
      />
    </label>
  )
}