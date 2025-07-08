import { Button, NavbarItem } from "@nextui-org/react";
import * as actions from "@/actions";

export default function GuestActions() {
  return (
    <>
      <NavbarItem>
        <form onSubmit={actions.signIn}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form onSubmit={actions.signIn}>
          <Button type="submit" color="primary" variant="flat">
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </>
  );
}
