import { queryClient } from "@/app/providers";
import api from "@/services/api";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Dropzone from "./Dropzone";

interface DataProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  updatedAt: string;
  createdAt: string;
  supplierId: string;
}

type ProductProps = {
  data: DataProps;
};

const pencil = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#fff"
    viewBox="0 0 256 256"
  >
    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
  </svg>
);
const trash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#fff"
    viewBox="0 0 256 256"
  >
    <path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
  </svg>
);
export default function ProductStock({ data }: ProductProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateModaIsOpen, setUpdateModalIsOpen] = useState(false);

  const [title, setTitle] = useState(data.title ?? "");
  const [price, setPrice] = useState<number | string>(data.price ?? "");
  const [description, setDescription] = useState(data.description ?? "");
  const [file, setFile] = useState({ file: {}, url: undefined });
  const [isLoading, setIsLoading] = useState(false);

  const cancelRef = React.useRef(null);
  const toast = useToast();

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

  async function handleDeleteProduct() {
    try {
      await api.delete(`/products/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["myproducts"] });

      onClose();

      toast({
        title: "Product Deleted.",

        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry, Something wrong.",

        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  }

  async function handleUpdateProduct(e: any) {
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
      const { data: response } = await api.put(
        `/products/${data.id}`,
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
      queryClient.invalidateQueries({ queryKey: ["myproducts"] });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      console.log("Update product error:", err);
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
    setUpdateModalIsOpen(false);
  }

  function formatDateUS(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Remember that months in JavaScript start at 0 (January)
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  const publishedAt = formatDateUS(new Date(data.createdAt));
  const updatedAt = formatDateUS(new Date(data.updatedAt));

  return (
    <>
      <Card maxW="xs">
        <CardBody>
          <Image
            height={"20rem"}
            width={"17rem"}
            objectFit={"cover"}
            src={`https://products-api-rxd3.onrender.com/uploads/${data.imageURL}`}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />

          <Flex mt="3" align={"center"} gap={5}>
            <Button
              onClick={() => setUpdateModalIsOpen(true)}
              colorScheme="facebook"
            >
              {pencil}
            </Button>
            <Button onClick={onOpen} colorScheme="red">
              {trash}
            </Button>
          </Flex>

          <Stack mt="3" spacing="3" w={"full"}>
            <Flex align={"center"} justifyContent={"space-between"}>
              <Heading size="md">{data.title}</Heading>
              <Text>
                {data.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
            </Flex>
            <Text color={"black"} className="font-medium">
              {data.description}
            </Text>

            <Text color={"black"} className="font-light">
              Published at: {publishedAt}
            </Text>
            <Text color={"black"} className="font-light">
              Uptaded At: {updatedAt}
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeleteProduct} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        isOpen={updateModaIsOpen}
        onClose={() => setUpdateModalIsOpen(false)}
        size={"5xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Product</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdateProduct}>
            <ModalBody pb={6} gap={4} display={"flex"} flexDirection={"column"}>
              <Flex gap={10}>
                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    value={title}
                    required
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
                      value={price}
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
                  value={description}
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
  );
}
