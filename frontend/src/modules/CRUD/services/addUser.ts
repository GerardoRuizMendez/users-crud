import user from "../models/user";

export default function addUser(newUser: user, accessToken: string) {
  return fetch(`${import.meta.env.VITE_URL_BASE}/api/v1/create-user`, {
    method: "POST",

    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => {
      if (res.status != 201) throw new Error("Error");
      return res.json();
    })
    .then((res) => {
      return res;
    });
}
