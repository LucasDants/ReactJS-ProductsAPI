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
} from "@chakra-ui/react";

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

export default function Product({ data }: ProductProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function formatDateUS(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  const publishedAt = formatDateUS(new Date(data.createdAt));
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
          <Stack mt="6" spacing="3">
            <Flex align={"center"} justifyContent={"space-between"}>
              <Heading size="md">{data.title}</Heading>
              <Button onClick={onOpen} size={"xs"} colorScheme="telegram">
                See More
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
      <Modal size={"2xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details of {data.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card>
              <CardBody>
                <Image
                  height={"24rem"}
                  width={"40rem"}
                  objectFit={"cover"}
                  src={`https://products-api-rxd3.onrender.com/uploads/${data.imageURL}`}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
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
                    Supplier Id: {data.supplierId}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
