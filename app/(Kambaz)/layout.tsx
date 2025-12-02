"use client"
import "./styles.css";
import React from "react";
import KambazNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";
import Session from "./Account/session";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
       <Provider store={store}>
        <Session>
      <div id="wd-kambaz">
        <div className="d-flex">
          <div><KambazNavigation /></div>
          <div className="wd-main-content-offset ps-4 p-3 flex-fill">
            {children}
          </div>
        </div>
      </div>
      </Session>
</Provider>
  );
}
