import React from "react"
import { Input } from "../../components/Input"
import { SubmitButton } from "../../components/SubmitButton"
import "./index.scss"

export function Login(props) {
  // Uncomment when completing the login page functionality
  // handleChange(event) {
  //   this.setState({value: event.target.value})
  // }

  const handleSubmit = (event) => {
    alert('A name was submitted: ')
    event.preventDefault()
  }

  return (
    <div className="login-form__wrapper container">
      <div className="row mx-0 justify-content-center">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column col-11 col-md-8 col-xl-4"
        >
          <Input
            placeholder="Enter your name"
            labelClasses="form-label"
            inputClasses="form-control"
            inputType="text"
          />

          <Input
            placeholder="Enter your password"
            labelClasses="form-label"
            inputClasses="form-control"
            inputType="password"
          />

          <SubmitButton
            text="Submit"
            classes="btn btn-primary"
          />
        </form>
      </div>
    </div>
  )
}