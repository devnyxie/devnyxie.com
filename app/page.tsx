import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <Avatar className="w-24 h-24 border-2 border-muted">
        <AvatarImage src="/pfp.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
