import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserIcon = () => {
  return (
    <Link href="/profile">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>PG</AvatarFallback>
      </Avatar>
    </Link>
  );
};
