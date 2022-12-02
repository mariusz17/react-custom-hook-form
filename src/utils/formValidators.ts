export interface Validators {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  includes?: {
    upperCase?: boolean;
    lowerCase?: boolean;
    specialCharacter?: boolean;
    number?: boolean;
  };
}

const required = (text: string) => {
  return text.trim().length > 0;
};

const minLength = (text: string, minLength: number) => {
  return text.length >= minLength;
};

const maxLength = (text: string, maxLength: number) => {
  return text.length <= maxLength;
};

const isEmail = (text: string) => {
  if (
    text.split("@").length - 1 !== 1 ||
    !text[text.indexOf("@") - 1].trim() ||
    !text[text.indexOf("@") + 1].trim()
  ) {
    return false;
  }

  return true;
};

// TODO:
const doesContainUpperCase = (text: string) => {
  for (const letter of text) {
    if (letter === letter.toLocaleUpperCase()) {
      return true;
    }
  }

  return false;
};

// TODO:
const doesContainLowerCase = (text: string) => {
  for (const letter of text) {
    if (letter === letter.toLocaleLowerCase()) {
      return true;
    }
  }

  return false;
};

export const validate = (
  text: string,
  validators: Validators
): string | null => {
  for (const key of Object.keys(validators)) {
    if (!Array.isArray(key)) {
      switch (key) {
        case "required":
          if (!required(text)) {
            return "Has to be filled in.";
          }
          break;
        case "minLength":
          if (!minLength(text, validators.minLength!)) {
            return `Has to be longer than ${validators.minLength!} characters.`;
          }
          break;
        case "maxLength":
          if (!maxLength(text, validators.maxLength!)) {
            return `Has to be not longer than ${validators.maxLength!} characters.`;
          }
          break;
        case "email":
          if (!isEmail(text)) {
            return "Has to be email format.";
          }
          break;
        default:
          break;
      }
    } else {
    }
  }

  return null;
};
