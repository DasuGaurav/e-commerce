import { Button } from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const PALETTE = {
  accent: "#EAD7C3",
  hover: "#e5d0b5",
  text: "#1b1f24",
};

export default function ClerkAuthButtons() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            borderRadius="14px"
            variant="outline"
            borderColor={PALETTE.accent}
            color={PALETTE.text}
            _hover={{ bg: PALETTE.hover, color: PALETTE.text }}
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "40px",
                height: "40px",
                border: `2px solid ${PALETTE.accent}`,
                borderRadius: "50%",
              },
            },
          }}
        />
      </SignedIn>
    </>
  );
}
