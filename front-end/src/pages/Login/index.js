import React from "react"
import { SubmitButton } from "../../components/SubmitButton"
import "./index.scss"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required("E-mail is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters")
    .max(10, "Password must contain maximum 10 characters")
}).required()

export function Login(props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = data => console.log(data)

  return (
    <div className="login-form__wrapper container">
      <h2 className="text-center mb-4">Login to your account</h2>
      <div className="row mx-0 justify-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column col-11 col-md-8 col-xl-4"
        >
          <input
            placeholder="Enter your name"
            className="form-control"
            type="text"
            name="email"
            {...register("email")}
          />
          <p className="error">{errors.email?.message}</p>

          <input
            placeholder="Enter your password"
            className="form-control"
            type="password"
            name="password"
            {...register("password")}
          />
          <p className="error">{errors.password?.message}</p>

          <SubmitButton
            text="Submit"
            classes="btn btn-primary"
          />
        </form>
      </div>
    </div>
  )
}