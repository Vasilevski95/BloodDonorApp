import { useState } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };

    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue);
  };

  const handleResetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    setErrors({});
    setCurrentId(0);
  };

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    handleResetForm,
  };
};

export default useForm;
