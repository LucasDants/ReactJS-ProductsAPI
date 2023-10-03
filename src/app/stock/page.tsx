"use client";
import Banner from "@/assets/banner.jpg";
import Product from "@/components/Product";
import {
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  SimpleGrid,
  Stack,
  useMediaQuery,
  Text,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import ProductStock from "@/components/ProductStock";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Dropzone from "@/components/Dropzone";
import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "../providers";

export default function Home() {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan580] = useMediaQuery("(min-width: 580px)");
  const [isLargerThan1920] = useMediaQuery("(min-width: 1920px)");

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({ file: {}, url: undefined });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuth();
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  async function handleCreateNewProduct(e: any) {
    e.preventDefault();
    if (!file.url) {
      return toast({
        title: `Product require a image`,
        status: "warning",
        isClosable: true,
        position: "top-right",
      });
    }
    setIsLoading(true);

    try {
      const { data: response } = await api.post(
        "/products",
        { title, description, price, image: file!.file },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast({
        title: `Sucess`,
        status: "success",
        isClosable: true,
      });

      onCloseModal();
      productsRefetech();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      console.log("Create product error:", err);
      toast({
        title: `Something went wrong`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function onCloseModal() {
    onClose();
    setFile({ file: {}, url: undefined });
    setPrice("");
    setDescription("");
    setTitle("");
  }

  const {
    data: products,
    refetch: productsRefetech,
    isFetching,
  } = useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      const { data: response } = await api.get(`/products?filter=accountId`);

      return response;
    },
    initialData: [],
  });

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // @ts-ignore
      setFile({
        file: e.target.files[0],
        // @ts-ignore
        url: URL.createObjectURL(e.target.files[0]),
      });
      e.target.value = "";
    }
  };
  return (
    <main>
      <Flex
        as="header"
        padding={10}
        paddingInline={isLargerThan800 ? 20 : 5}
        className="bg-orange-300  border-b-4 border-orange-400"
        justifyContent={isLargerThan1920 ? "space-evenly" : "space-between"}
      >
        <Box>
          <Flex gap={5} align={"center"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M225.6,62.64l-88-48.17a19.91,19.91,0,0,0-19.2,0l-88,48.17A20,20,0,0,0,20,80.19v95.62a20,20,0,0,0,10.4,17.55l88,48.17a19.89,19.89,0,0,0,19.2,0l88-48.17A20,20,0,0,0,236,175.81V80.19A20,20,0,0,0,225.6,62.64ZM128,36.57,200,76,178.57,87.73l-72-39.42Zm0,78.83L56,76,81.56,62l72,39.41ZM44,96.79l72,39.4v76.67L44,173.44Zm96,116.07V136.19l24-13.13V152a12,12,0,0,0,24,0V109.92l24-13.13v76.65Z"></path>
            </svg>
            <Heading color={"whiteAlpha.900"}>Stock</Heading>
          </Flex>
        </Box>
        <Link href={"/"}>
          <Button>
            <Flex gap={1} align={"center"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#442222"
                viewBox="0 0 256 256"
              >
                <path d="M236,96a12,12,0,0,0-.44-3.3L221.2,42.51A20.08,20.08,0,0,0,202,28H54A20.08,20.08,0,0,0,34.8,42.51L20.46,92.7A12,12,0,0,0,20,96l0,16a43.94,43.94,0,0,0,16,33.92V208a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V145.92A43.94,43.94,0,0,0,236,112Zm-24,16a20,20,0,0,1-40,0v-4h40ZM44,112v-4H84v4a20,20,0,0,1-40,0Zm64-4h40v4a20,20,0,0,1-40,0ZM57.05,52H199l9.14,32H47.91ZM196,204H60V155.81c1.32.12,2.65.19,4,.19a43.86,43.86,0,0,0,32-13.85,43.89,43.89,0,0,0,64,0A43.86,43.86,0,0,0,192,156c1.35,0,2.68-.07,4-.19Z"></path>
              </svg>

              <Heading size={"xs"} color="#442222">
                Shop
              </Heading>
            </Flex>
          </Button>
        </Link>
      </Flex>

      <Flex
        p={4}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={isLargerThan580 ? "row" : "column-reverse"}
      >
        <Heading
          color={"MenuText"}
          fontSize={"2xl"}
          marginLeft={isLargerThan580 ? "10" : 0}
        >
          My Products:
        </Heading>
        <Button onClick={onOpen} gap={2} colorScheme="teal">
          New Product <AddIcon />
        </Button>
      </Flex>
      <Flex justifyContent={"center"} padding={2}>
        {products.length > 0 ? (
          <SimpleGrid
            columns={isLargerThan800 ? 3 : isLargerThan580 ? 2 : 1}
            spacing={8}
          >
            {products.map((product: any) => {
              return <ProductStock key={product.id} data={product} />;
            })}
          </SimpleGrid>
        ) : (
          <Stack marginTop={50}>
            {isFetching ? (
              <Spinner color="orange" size="xl" />
            ) : (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <svg
                  className="text-gray-300"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 640 512"
                  height="64"
                  width="64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.89,123.62,5.51,142.2c-14.2,21.3,1,49.8,26.59,49.8h74.26ZM576,413.42V224H512V364L384,265V224H330.92l-41.4-32H608c25.5,0,40.7-28.5,26.59-49.8l-85.29-128A32.18,32.18,0,0,0,522.6,0H117.42A31.87,31.87,0,0,0,90.81,14.2l-10.66,16L45.46,3.38A16,16,0,0,0,23,6.19L3.37,31.46A16,16,0,0,0,6.18,53.91L594.53,508.63A16,16,0,0,0,617,505.81l19.64-25.26a16,16,0,0,0-2.81-22.45ZM320,384H128V224H64V480a32,32,0,0,0,32,32H352a32,32,0,0,0,32-32V406.59l-64-49.47Z"></path>
                </svg>
                <Text className="text-gray-300">No Products here</Text>
              </Box>
            )}
          </Stack>
        )}
      </Flex>

      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size={"5xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a Product</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleCreateNewProduct}>
              <ModalBody
                pb={6}
                gap={4}
                display={"flex"}
                flexDirection={"column"}
              >
                <Flex gap={10}>
                  <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      required
                      ref={initialRef}
                      placeholder="Type a name..."
                      onChange={({ target }) => setTitle(target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.500"
                        fontSize="1.2em"
                        // eslint-disable-next-line react/no-children-prop
                        children={"$"}
                      />
                      <Input
                        required
                        placeholder="Type a price... "
                        type="number"
                        onChange={({ target }) => setPrice(target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>
                <FormControl>
                  <FormLabel>Product Description</FormLabel>
                  <Input
                    required
                    placeholder="Type a description... "
                    onChange={({ target }) => setDescription(target.value)}
                  />
                </FormControl>

                <Dropzone
                  file={file?.url}
                  onChangeHandler={onChangeImageHandler}
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="orange"
                  mr={3}
                >
                  Save
                </Button>
                <Button onClick={onCloseModal}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    </main>
  );
}
