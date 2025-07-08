import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";

export default function UserImage() {
  const session = useSession();
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={session?.data?.user?.image ?? ""} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <form onSubmit={actions.signOut}>
            <Button type="submit" variant="flat">
              Sign Out
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
