import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseStuff/index";
import tdApi from "./tdApi";
import { IUser } from "../types/IUser";
import { IVoter } from "../types/IVoter";
import { IOrganization } from "../types/IOrganization";

async function login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const response = await tdApi.post(
      "/auth/login",
      await auth.currentUser!.getIdToken()
    );
    return response.data as IUser;
  } catch (error) {
    throw error;
  }
}

async function signUp(
  email: string,
  password: string,
  params: { isVoter: boolean; orgName?: string; voterName?: string }
) {
  const { isVoter, orgName, voterName } = params;
  if (isVoter && !voterName) throw new Error("Voter name is required");
  if (!isVoter && !orgName) throw new Error("Organization name is required");
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const response = await tdApi.post("/auth/signup", {
      email,
      is_voter: isVoter,
      ...(orgName && { org_name: orgName }),
      ...(voterName && { voter_name: voterName }),
    });

    return response.data as IUser;
  } catch (error) {
    throw error;
  }
}

async function logout() {
  try {
    auth.signOut();
  } catch (error) {
    console.log(error);
  }
}

async function getProfile(): Promise<IVoter | IOrganization> {
  try {
    const response = await tdApi.get("/auth/profile");
    return { ...response.data, isVoter: response.data.is_voter } as
      | IVoter
      | IOrganization;
  } catch (error) {
    throw error;
  }
}

const authApi = {
  login,
  signUp,
  logout,
  getProfile,
};

export default authApi;
