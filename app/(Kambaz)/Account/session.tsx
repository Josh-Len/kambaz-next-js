/* eslint-disable @typescript-eslint/no-explicit-any */
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser, setAuthReady } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      console.error(err);
      dispatch(setCurrentUser(null));
    } finally {
      dispatch(setAuthReady(true));
      setPending(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
  return null;
}
