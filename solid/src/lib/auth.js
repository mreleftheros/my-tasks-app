const BASE_URL = "http://localhost:5000/api/auth";

export const signup_post = async (username, email, password) => {
  const res = await fetch(BASE_URL + "/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  const { error, errors, data } = await res.json();
  return { error, errors, data };
};

export const login_post = async (email, password) => {
  const res = await fetch(BASE_URL + "/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const { error, errors, data } = await res.json();
  return { error, errors, data };
};

export const me_get = async () => {
  const res = await fetch(BASE_URL + "/me", {
    credentials: "include",
  });
  const { error, errors, data } = await res.json();
  return { error, errors, data };
};

export const logout_get = async () => {
  const res = await fetch(BASE_URL + "/logout", {
    credentials: "include",
  });
  const { error, errors, data } = await res.json();
  return { error, errors, data };
};
