import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-screen-md mx-auto ${className || ""}`}>
      {children}
    </div>
  );
}

export default Container;
