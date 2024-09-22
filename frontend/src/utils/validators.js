export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Must be at least 8 characters long.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain at least one uppercase letter.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain at least one lowercase letter.');
  }
  if (!/\d/.test(password)) {
    errors.push('Must contain at least one number.');
  }
  return errors;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Invalid email format.';
};