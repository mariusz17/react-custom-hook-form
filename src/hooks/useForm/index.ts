import React, { FormEvent, useState } from "react";
import { validate } from "./validators";
import type { Validators } from "./validators";

type FormElement = {
  value: string;
  validators: Validators;
};

interface Form {
  [name: string]: FormElement;
}

const useForm = () => {
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<{
    [name: string]: string | null;
  }>({});
  const [form, setForm] = useState<Form>({});

  // Function that adds validators to the given form field and returns html tags
  const tag = (name: string, validators: Validators) => {
    if (!Object.keys(form).includes(name)) {
      setForm((prev) => ({ ...prev, [name]: { value: "", validators } }));
    }

    return {
      name: name,
      id: name,
    };
  };

  // Update form value from user input
  const updateValue = (e: FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setForm((prev) => ({ ...prev, [name]: { ...prev[name], value } }));

    // Validate field on the fly while user writes text
    const validateMessage = validate(value, form[name].validators);

    if (validateMessage) {
      setErrors((prev) => {
        return { ...prev, [name]: validateMessage };
      });
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const submitForm = (userSubmit: React.FormEventHandler<HTMLFormElement>) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let error = false;

      for (const key of Object.keys(form)) {
        const validateMessage = validate(form[key].value, form[key].validators);

        if (validateMessage) {
          setErrors((prev) => {
            return { ...prev, [key]: validateMessage };
          });
          error = true;
        }
      }

      if (error) {
        setIsError(true);
        return;
      } else {
        setIsError(false);
        return userSubmit;
      }
    };
  };

  return { isError, errors, tag, updateValue, form, submitForm };
};

export default useForm;
