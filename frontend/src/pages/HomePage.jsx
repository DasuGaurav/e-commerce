import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const PALETTE = {
  base: "#FBF6EF",
  soft: "#DCE0D9",
  accent: "#EAD7C3",
  border: "#e6d9c8",
  hover: "#e5d0b5",
  text: "#1b1f24",
  sub: "#4b5563",
};

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const productSectionRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleScroll = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container id="products" maxW="container.xl" py={{ base: 10, md: 14 }}>
      <VStack spacing={{ base: 8, md: 10 }}>
        <Heading
          as="h1"
          size={{ base: "lg", md: "xl" }}
          textAlign="center"
          lineHeight={1.15}
          color={PALETTE.text}
          letterSpacing="wider"
          textTransform="uppercase"
        >
          Discover Our Latest Products 🚀
        </Heading>

        <Button
          size="lg"
          px={{ base: 6, md: 8 }}
          h="52px"
          rounded="xl"
          onClick={handleScroll}
          shadow="md"
          bg={PALETTE.accent}
          color={PALETTE.text}
          borderWidth="1px"
          borderColor={PALETTE.border}
          transition="transform .2s ease, box-shadow .2s ease, background .2s ease"
          _hover={{ transform: "translateY(-2px)", shadow: "lg", bg: PALETTE.hover }}
          _active={{ transform: "translateY(-1px)" }}
          mb={{ base: 2, md: 0 }}
        >
          Explore Products
        </Button>

        <Box
          ref={productSectionRef}
          w="full"
          bg={PALETTE.base}
          borderWidth="1px"
          borderColor={PALETTE.border}
          rounded="2xl"
          shadow="xl"
          p={{ base: 5, md: 8 }}
          transition="box-shadow .25s ease, border-color .25s ease"
          _hover={{ shadow: "2xl", borderColor: PALETTE.hover }}
        >
          {products.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={{ base: 5, sm: 6, md: 8 }}
              w="full"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          ) : (
            <VStack spacing={3} py={{ base: 10, md: 14 }}>
              <Text fontSize={{ base: "md", md: "lg" }} color={PALETTE.sub} fontWeight="semibold" textAlign="center">
                No products available yet.
              </Text>
              <Link to="/create">
                <Button
                  rounded="xl"
                  px={{ base: 6, md: 8 }}
                  h="48px"
                  bg={PALETTE.accent}
                  color={PALETTE.text}
                  borderWidth="1px"
                  borderColor={PALETTE.border}
                  _hover={{ bg: PALETTE.hover }}
                >
                  Add a new product
                </Button>
              </Link>
            </VStack>
          )}
        </Box>

        {products.length === 0 && (
          <Text fontSize="md" textAlign="center" fontWeight="semibold" color={PALETTE.sub}>
            No products found 😢{" "}
            <Link to="/create">
              <Text as="span" color={PALETTE.text} textDecoration="underline">
                Add a new product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
