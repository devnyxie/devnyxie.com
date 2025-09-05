import React from "react";

type ContentProps = { children: React.ReactNode };

function Content({ children }: ContentProps) {
  return (
    <div className="relative flex-grow w-full max-w-[768px] py-16 sm:py-20 lg:py-24">
      {children}
    </div>
  );
}

export default Content;
