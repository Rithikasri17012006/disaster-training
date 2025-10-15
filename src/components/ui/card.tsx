import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-100">{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4 border-b border-gray-200">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4">{children}</div>;
}
