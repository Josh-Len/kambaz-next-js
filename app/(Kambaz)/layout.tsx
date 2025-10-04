// app/Kambaz/layout.tsx
import "./styles.css"
import React from "react";
import KambazNavigation from "./Navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset ps-4
            p-3 flex-fill" >{children}</div>
      </div>
    </div>
  );
}
