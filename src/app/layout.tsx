import "./globals.css";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-gray-100">
        <div className="m-[2%]">{children}</div>
      </body>
    </html>
  );
}
