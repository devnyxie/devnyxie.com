import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`max-w-screen-md ${className}`}>{children}</div>;
}

export default Container;
