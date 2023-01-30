const BASE_URL = "http://localhost:5000/api/tasks";

export const index_get = async () => {
  try {
    const res = await fetch(BASE_URL, {
      credentials: "include",
    });
    const { error, data } = await res.json();
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const index_post = async (title, description) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  return await res.json();
};

export const idParam_get = async id => {
  const res = await fetch(BASE_URL + `/${id}`, {
    credentials: "include",
  });
  const { error, data } = await res.json();
  if (error) throw error;
  return data;
};

export const idParam_put = async (id, title, description) => {
  const res = await fetch(BASE_URL + `/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  return await res.json();
};

export const idParam_delete = async id => {
  const res = await fetch(BASE_URL + `/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await res.json();
};
