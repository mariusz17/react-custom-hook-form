import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { validate } from "./validators";
import type { Validators } from "./validators";

const setInitialErrors = <T extends Record<string, string>>(
  initialFormState: T
) => {
  let initialErrors: Record<string, null> = {};

  for (const key of Object.keys(initialFormState)) {
    initialErrors[key] = null;
  }

  return initialErrors as Record<keyof T, null>;
};

const useForm = <T extends Record<string, string>>(initialFormState: T) => {
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    setInitialErrors(initialFormState)
  );
  const [form, setForm] = useState<T>(initialFormState);
  const [formValidators, setFormValidators] = useState<
    Record<string, Validators>
  >({});

  // Function that adds validators to the given form field and returns html tags
  const tag = (name: string, validators: Validators) => {
    if (!formValidators[name]) {
      setFormValidators((prev) => ({ ...prev, [name]: validators }));
    }

    return {
      name: name,
      id: name,
    };
  };

  // Update form value from user input
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate field on the fly while user writes text
    if (formValidators[name]) {
      const validateMessage = validate(value, formValidators[name]);

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
    }
  };

  const submitForm =
    (userSubmit: FormEventHandler<HTMLFormElement>) =>
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let error = false;

      // Check for errors on the form
      for (const name of Object.keys(form)) {
        if (formValidators[name]) {
          const validateMessage = validate(form[name], formValidators[name]);

          if (validateMessage) {
            setErrors((prev) => ({ ...prev, [name]: validateMessage }));
            error = true;
          } else {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
          }
        }
      }

      if (error) {
        setIsError(true);
      } else {
        setIsError(false);
        userSubmit(e);
      }
    };

  return { isError, errors, tag, updateValue, form, submitForm };
};

export default useForm;
