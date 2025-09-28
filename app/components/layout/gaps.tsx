import React from "react";

type ContentProps = { children: React.ReactNode };

function Gaps({ children }: ContentProps) {
  return (
    <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">{children}</div>
  );
}

export default Gaps;
