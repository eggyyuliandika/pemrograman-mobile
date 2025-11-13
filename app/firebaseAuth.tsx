import { getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
