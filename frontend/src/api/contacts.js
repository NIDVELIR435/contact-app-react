const apiUrl = "http://localhost:3002/v1";

export const getContacts = async () => {
  const response = await fetch(`${apiUrl}/contacts`, { method: "GET" });
  return await response.json();
};

export const createContact = async (body) => {
  await fetch(`${apiUrl}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const getContact = async (id) => {
  const response = await fetch(`${apiUrl}/contacts/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const updateContact = async (id, body) => {
  await fetch(`${apiUrl}/contacts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const deleteContact = async (id) => {
  await fetch(`${apiUrl}/contacts/${id}`, {
    method: "DELETE",
  });
};
