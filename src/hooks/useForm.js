import { useState, useCallback } from "react";

export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "name" && /\d/.test(value)) {
      setErrors({
        ...errors,
        [name]: "Имя может содержать латиницу, кириллицу пробел и дефис",
      });
      setIsValid(false);
    } else {
      setErrors({ ...errors, [name]: event.target.validationMessage });
      setIsValid(event.target.closest("form").checkValidity());
    }

    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
