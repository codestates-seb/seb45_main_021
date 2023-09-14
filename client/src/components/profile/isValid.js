export const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const isValidPassword = (password) => {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return passwordPattern.test(password);
};

export const isValidPhone = (phone) => {
  const phonePattern = /^010\d{8}$/;
  return phonePattern.test(phone);
};
