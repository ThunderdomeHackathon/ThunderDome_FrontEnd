import { getIdToken } from "@firebaseStuff/index";
import { apiBaseUrl } from "./thunderdomeApi";
import { IUser } from "types/IUser";

export async function createUser(email: string, isVoter: boolean) {
  const response = await fetch(`${apiBaseUrl}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getIdToken()}`,
    },
    body: JSON.stringify({ is_voter: isVoter }),
  });
  return await response.json();
}

export async function getUser(): Promise<IUser | null> {
  const response = await fetch(`${apiBaseUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getIdToken()}`,
    },
  });

  if (response.status === 404) {
   throw new Error("User not found");
  }

   return await response.json();
}
