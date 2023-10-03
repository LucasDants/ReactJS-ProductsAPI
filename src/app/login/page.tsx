"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  Img,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";

import api from "@/services/api";
import { useState } from "react";
import Cookie from "js-cookie";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { setUser } = useAuth();

  const handleLogin = async (event: any) => {
    event?.preventDefault();
    setIsLoading(true);

    try {
      const { data: response } = await api.post("/login", {
        email,
        password,
      });

      collectUser(response.account, response.token);
      toast({
        title: `Sucessfuly`,
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      router.push("/");
      setIsLoading(false);
    } catch (error: any) {
      console.log("Error:", error?.response?.data?.message);

      toast({
        title: `Oh sorry, something went wrong`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
      setIsLoading(false);
    } finally {
    }
  };

  const collectUser = (user: any, token: string) => {
    setUser(user);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    Cookie.set("auth_token", token);
  };

  return (
    <Flex
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      direction={{ base: "column", md: "row" }}
      style={{ height: "100vh" }}
    >
      <Flex
        onSubmit={handleLogin}
        as={"form"}
        p={8}
        flex={1}
        align="center"
        justify="center"
      >
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg={"white"}
          padding={"3rem"}
          borderRadius={"1rem"}
        >
          <Heading fontSize="2xl">Login</Heading>

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              required
              onChange={({ target }) => setEmail(target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Link href={"/register"} color="orange">
                Register
              </Link>
            </Stack>
            <Button
              isDisabled={!email || !password ? true : false}
              isLoading={isLoading}
              colorScheme="orange"
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
}
