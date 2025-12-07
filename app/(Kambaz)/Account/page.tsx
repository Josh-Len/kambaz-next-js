"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "next/navigation";
export default function AccountPage() {
 const { currentUser, authReady } = useSelector((state: RootState) => state.accountReducer);
 if (!authReady) {
   return null; // Wait for auth to be ready
 }
 if (!currentUser) {
   redirect("/Account/Signin");
 } else {
   redirect("/Account/Profile");
 }
}
