import React from "react";
import { useState } from "react";
import useForm from "./hooks/useForm";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { updateForm, tag, errors, isError } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateForm(formData);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const propName = e.currentTarget.name;
    const newValue = e.currentTarget.value;

    setFormData((prev) => ({
      ...prev,
      [propName]: newValue,
    }));
  };

  return (
    <>
      <h1>Register new user</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            {...tag("email", { email: true })}
            placeholder="email"
            type="text"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          Errors: {errors.password}
        </p>

        <button type="submit">Submit</button>
      </form>
      <p>Błędy na formularzu: {isError ? "TAK" : "NIE"}</p>
    </>
  );
}

export default App;
