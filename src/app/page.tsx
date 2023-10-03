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
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan580] = useMediaQuery("(min-width: 580px)");
  const [isLargerThan1920] = useMediaQuery("(min-width: 1920px)");

  const {
    data: products,
    refetch: productsRefetech,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data: response } = await api.get("/products");

      return response;
    },
    initialData: [],
  });
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
              fill="#ffffff"
              viewBox="0 0 256 256"
            >
              <path d="M236,96a12,12,0,0,0-.44-3.3L221.2,42.51A20.08,20.08,0,0,0,202,28H54A20.08,20.08,0,0,0,34.8,42.51L20.46,92.7A12,12,0,0,0,20,96l0,16a43.94,43.94,0,0,0,16,33.92V208a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V145.92A43.94,43.94,0,0,0,236,112Zm-24,16a20,20,0,0,1-40,0v-4h40ZM44,112v-4H84v4a20,20,0,0,1-40,0Zm64-4h40v4a20,20,0,0,1-40,0ZM57.05,52H199l9.14,32H47.91ZM196,204H60V155.81c1.32.12,2.65.19,4,.19a43.86,43.86,0,0,0,32-13.85,43.89,43.89,0,0,0,64,0A43.86,43.86,0,0,0,192,156c1.35,0,2.68-.07,4-.19Z"></path>
            </svg>
            <Heading color={"whiteAlpha.900"}>Shop</Heading>
          </Flex>
        </Box>
        <Link href={"stock"}>
          <Button>
            <Flex gap={1} align={"center"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#442222"
                viewBox="0 0 256 256"
              >
                <path d="M225.6,62.64l-88-48.17a19.91,19.91,0,0,0-19.2,0l-88,48.17A20,20,0,0,0,20,80.19v95.62a20,20,0,0,0,10.4,17.55l88,48.17a19.89,19.89,0,0,0,19.2,0l88-48.17A20,20,0,0,0,236,175.81V80.19A20,20,0,0,0,225.6,62.64ZM128,36.57,200,76,178.57,87.73l-72-39.42Zm0,78.83L56,76,81.56,62l72,39.41ZM44,96.79l72,39.4v76.67L44,173.44Zm96,116.07V136.19l24-13.13V152a12,12,0,0,0,24,0V109.92l24-13.13v76.65Z"></path>
              </svg>
              <Heading size={"xs"} color="#442222">
                My Stock
              </Heading>
            </Flex>
          </Button>
        </Link>
      </Flex>

      {/* <Heading fontSize={"3xl"} marginLeft={"10"}>
        All Products
      </Heading> */}

      <Flex justifyContent={"center"} padding={2}>
        {products.length > 0 ? (
          <SimpleGrid
            columns={isLargerThan800 ? 3 : isLargerThan580 ? 2 : 1}
            spacing={8}
          >
            {products.map((product: any) => {
              return <Product key={product.id} data={product} />;
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
    </main>
  );
}
