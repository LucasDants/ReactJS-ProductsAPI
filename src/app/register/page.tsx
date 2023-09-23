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
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";
import RegisterImage from "@/assets/RegisterImage.jpg";
import { useState } from "react";
import api from "@/services/api";

export default function Rgister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleRegister = async (event: any) => {
    setIsLoading(true);
    event?.preventDefault();
    try {
      const { data: response } = await api.post("/register", {
        name,
        email,
        password,
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
    <Flex flex={1} direction={{ base: "column", md: "row" }}>
      <Flex flex={1} display={{ base: "none", lg: "flex" }}>
        <Image
          placeholder="blur"
          aspectRatio={1}
          objectFit="cover"
          fallbackSrc={RegisterImage.src}
          src={RegisterImage.src}
        />
      </Flex>
      <Flex
        onSubmit={handleRegister}
        as={"form"}
        p={8}
        flex={1}
        align="center"
        justify="center"
      >
        <Stack spacing={4} w="full" maxW="md">
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
