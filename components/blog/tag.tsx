import React from "react";
import { Badge } from "../shadcn/badge";

type Props = {
  name: string;
  path: string;
};

// TODO: Implement tag icons

function Tag({ name, path }: Props) {
  return (
    <Badge
      variant="default"
      className="rounded-none group cursor-pointer bg-accent text-accent-foreground/50 transition-colors"
    >
      # {name}
    </Badge>
  );
}

export default Tag;
