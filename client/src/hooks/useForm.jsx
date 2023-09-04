import { useState } from 'react';

export default function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e, value, name) => {
    if (e) {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const clearForm = () => {
    setFormData(initialState);
  }

  return [formData, handleInputChange, clearForm];
}