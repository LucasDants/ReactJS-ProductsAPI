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
import { useState } from "react";
import api from "@/services/api";
import LoginImage from "@/assets/loginImage.jpg";

export default function Rgister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleRegister = async (event: any) => {
    event?.preventDefault();

    setIsLoading(true);

    try {
      const { data: response } = await api.post("/register", {
        name,
        email,
        password,
      });

      toast({
        title: `Successfully registered`,
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      router.push("/login");
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      if (error?.response?.data?.message === "Account already exists") {
        toast({
          title: `This account already exists`,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
        return;
      }
      toast({
        title: `Oh sorry, something went wrong`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex flex={1} direction={{ base: "column", md: "row" }} height={"full"}>
      <Flex
        onSubmit={handleRegister}
        as={"form"}
        p={8}
        flex={1}
        align="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg={"white"}
          padding={"3rem"}
          borderRadius={"1rem"}
        >
          <Heading fontSize="2xl">Create an account</Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              required
              onChange={({ target }) => setName(target.value)}
            />
          </FormControl>
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
              <Link href={"/"} color="orange">
                Login
              </Link>
            </Stack>
            <Button
              isDisabled={!email || !password || !name ? true : false}
              isLoading={isLoading}
              colorScheme="orange"
              type="submit"
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
}
