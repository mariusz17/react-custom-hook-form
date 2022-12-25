import React from "react";
import useForm from "./hooks/useForm";

function App() {
  const { form, tag, errors, updateValue, isError, submitForm } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <>
      <h1>Register new user</h1>
      <form onSubmit={submitForm(handleSubmit)}>
        <p>
          <input
            {...tag("email", { email: true })}
            placeholder="email"
            type="text"
            onChange={updateValue}
          />
          Errors: {errors.email}
        </p>
        <p>
          <input
            {...tag("password", {
              required: true,
              minLength: 5,
              maxLength: 10,
            })}
            placeholder="password"
            type="password"
            onChange={updateValue}
          />
          Errors: {errors.password}
        </p>

        <button type="submit">Submit</button>
        <p>
          Errors on form (updates when submit is clicked):{" "}
          {isError ? "YES" : "NO"}
        </p>
      </form>
    </>
  );
}

export default App;
