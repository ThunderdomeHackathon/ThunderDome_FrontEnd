import { auth, getIdToken } from "@firebaseStuff/index";

export const createElection = async (openingTime: Date, closingTime: Date) => {
  const authToken = await getIdToken();
  if (!authToken) {
    throw new Error("User is not logged in. Cannot create election.");
  }

  const response = await fetch("http://localhost:8000/elections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      openingTime,
      closingTime,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create election.");
  }

  const newElection = await response.json();
  return newElection;
};
