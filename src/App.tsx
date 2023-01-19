import React from "react";
import useForm from "./hooks/useForm";

type FormType = {
  email: string;
  password: string;
};

function App() {
  const { form, errors, tag, updateValue, isError, submitForm } =
    useForm<FormType>({
      email: "",
      password: "",
    });

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
            value={form.email}
          />
          Errors: {errors.email}
        </p>
        <p>
          <input
            {...tag("password", {
              minLength: 5,
              maxLength: 10,
            })}
            placeholder="password"
            type="password"
            onChange={updateValue}
            value={form.password}
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
