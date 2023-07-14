const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const credentialsAreValid = (email: string, password: string, setError: CallableFunction) => {
  if (!emailRegex.test(email)) {
    setError('The email is invalid');
    return false;
  } else if (password.length < 6) {
    setError('The password must be at least 6 characters long');
    return false;
  }
  setError(null);
  return true;
}