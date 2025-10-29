import type * as React from "react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

// Server Action to sign out the current user
async function signOutAction() {
  "use server";
  await signOut();
}

export type SignOutButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "asChild" | "children" | "type"
> & {
  label?: string;
  children?: React.ReactNode;
};

/**
 * Reusable SignOutButton component that triggers server-side sign out.
 * Usage:
 *   <SignOutButton />
 *   <SignOutButton variant="outline" size="lg" label="Sign out" />
 */
export function SignOutButton({
  label = "Sign out",
  children,
  ...buttonProps
}: SignOutButtonProps) {
  return (
    <form action={signOutAction}>
      <Button type="submit" {...buttonProps}>
        {children ?? label}
      </Button>
    </form>
  );
}
