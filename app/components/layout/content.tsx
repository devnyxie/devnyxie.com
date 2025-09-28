import React from "react";

type ContentProps = { children: React.ReactNode };

function Content({ children }: ContentProps) {
  return (
    <div className="relative w-full flex-grow px-3 md:px-0 py-16 sm:py-20 lg:py-24 flex justify-center">
      {children}
    </div>
  );
}

export default Content;
