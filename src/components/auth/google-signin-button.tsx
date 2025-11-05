import { AuthError } from "@auth/core/errors";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@/components/icons/google-logo";

interface GoogleSigninButtonProps {
  callbackUrl?: string;
  className?: string;
  children?: React.ReactNode;
}

export function GoogleSigninButton({
  callbackUrl,
  className,
  children = "Google로 로그인",
}: GoogleSigninButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        try {
          await signIn("google", {
            redirectTo: callbackUrl ?? "/",
          });
        } catch (error) {
          // Signin can fail for a number of reasons, such as the user
          // not existing, or the user not having the correct role.
          // In some cases, you may want to redirect to a custom error
          if (error instanceof AuthError) {
            throw new Error(
              `Authentication failed: ${(error as AuthError).type}`
            );
          }

          // Otherwise if a redirects happens Next.js can handle it
          // so you can just re-thrown the error and let Next.js handle it.
          throw error;
        }
      }}
    >
      <Button
        type="submit"
        variant="outline"
        size="lg"
        className={`flex w-full items-center justify-center gap-3 ${
          className || ""
        }`}
      >
        <GoogleLogo />
        {children}
      </Button>
    </form>
  );
}
