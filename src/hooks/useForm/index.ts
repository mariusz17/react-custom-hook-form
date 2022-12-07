import { useState } from "react";
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
    [name: string]: string;
  }>({});

  const form: Form = {};

  // Function that adds validators to the given form field and returns html tags
  const tag = (name: string, validators: Validators) => {
    form[name] = {
      value: "",
      validators,
    };

    return {
      name: name,
      id: name,
    };
  };

  // Update form with given data and validate
  const updateForm = (formData: { [name: string]: string }) => {
    // Reset errors
    setErrors({});
    setIsError(false);

    // Update values on the form
    for (const key of Object.keys(formData)) {
      form[key].value = formData[key];
    }

    // Validate all form fields
    for (const key of Object.keys(form)) {
      const validateMessage = validate(form[key].value, form[key].validators);

      if (validateMessage) {
        setIsError(true);
        setErrors((prev) => {
          return { ...prev, [key]: validateMessage };
        });
      }
    }
  };

  return { isError, errors, updateForm, tag };
};

export default useForm;
