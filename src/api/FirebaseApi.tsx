import { createUserWithEmailAndPassword, signOut as firebaseSignOut, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@firebaseStuff/index';

export const createUserInFirebase = async (email: string, password: string, setLoading: CallableFunction, setError: CallableFunction) => {
  try {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setLoading(false);
    setError(null);
    return userCredential;
  } catch (error) {
    setLoading(false);
    setError(error);
  }
};


export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    return undefined;
  }
}


export const signOut = async () => {
  try {
    firebaseSignOut(auth);
  } catch (error) {
    // do nothing and log out anyways
  }
};