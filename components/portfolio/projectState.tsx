import { Archive, Check, Edit2, Hourglass } from "lucide-react";

type Props = {
  state: string;
};

function ProjectState({ state }: Props) {
  interface Props {
    state: string;
  }
  const lwstate = state.toLowerCase();

  const stateMap: Record<
    string,
    { icon: React.ReactNode; color: string; title: string }
  > = {
    published: {
      icon: <Check />,
      color: "success",
      title: "Published",
    },
    draft: {
      icon: <Edit2 />,
      color: "neutral",
      title: "Draft",
    },
    archived: {
      icon: <Archive />,
      color: "warning",
      title: "Archived",
    },
    in_progress: {
      icon: <Hourglass />,
      color: "info",
      title: "In Progress",
    },
  };

  return <></>;
}
