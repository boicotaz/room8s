import React from "react"

export function Input({ inputType, labelText, placeholder, value, handleChange, inputClasses, labelClasses }) {
  return (
    <label className={labelClasses}>
      {labelText}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        className={inputClasses}
      // onChange={handleChange} Uncomment when implement the login form functionality
      />
    </label>
  )
}