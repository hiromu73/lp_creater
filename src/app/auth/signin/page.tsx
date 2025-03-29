"use client";
import { signIn } from "next-auth/react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Box, Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const buttonstyle = {
    textTransform: "none",
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "#f8f8f8",
    },
    display: "flex",
    justifyContent: "center",
    padding: "12px 16px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#212121",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Stack spacing={2} sx={{ width: "300px" }}>
          {/* <Button
            variant="contained"
            onClick={() =>
              signIn("apple", {
                callbackUrl: "/", // または "/dashboard" など
              })
            }
            sx={{
              buttonstyle,
            }}
          >
            <FaApple size={20} />
            <span style={{ marginLeft: "12px", textTransform: "none" }}>Sign in with Apple</span>
          </Button> */}
          <Button
            variant="contained"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
            sx={{
              buttonstyle,
            }}
          >
            <FcGoogle size={20} />
            <span style={{ marginLeft: "12px", textTransform: "none" }}>Sign in with Google</span>
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
              })
            }
            sx={{
              buttonstyle,
            }}
          >
            <FaGithub size={20} />
            <span style={{ marginLeft: "12px", textTransform: "none" }}>Sign in with GitHub</span>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
