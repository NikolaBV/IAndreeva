import { jwtDecode } from "jwt-decode";
interface TokenClaims {
  role: string; // Assuming the token has a single role. If it's an array of roles, update accordingly.
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getRoles = (): string[] | null => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<TokenClaims>(token); // Decoding the token and assuming the role is a field in the token.
    if (!decodedToken || !decodedToken.role) {
      return null;
    }
    console.log("User role(s) from token:", [decodedToken.role]); // Logging the roles for debugging.
    return [decodedToken.role]; // Assuming a single role, convert to array for future-proofing.
  } catch (error) {
    return null;
  }
};

export const isAdmin = (): boolean => {
  const roles = getRoles();
  if (!roles || roles.length === 0) {
    return false;
  }

  return roles.includes("Admin"); // Assuming "Admin" is the role string, adjust accordingly.
};

export const clearToken = (): void => {
  localStorage.removeItem("token");
};
