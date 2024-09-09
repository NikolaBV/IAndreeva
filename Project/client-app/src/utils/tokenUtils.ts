
export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};
