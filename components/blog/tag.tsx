import React from "react";

type Props = {
  name: string;
  path: string;
};

// TODO: Implement tag icons

function Tag({ name, path }: Props) {
  return (
    <div className="rounded group cursor-pointer bg-accent text-accent-foreground/50 transition-colors w-max px-1.5 text-sm">
      # {name}
    </div>
  );
}

export default Tag;
