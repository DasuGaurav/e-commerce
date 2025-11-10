import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const PALETTE = {
  base: "#FBF6EF",
  soft: "#DCE0D9",
  accent: "#EAD7C3",
  border: "#e6d9c8",
  hover: "#e5d0b5",
  text: "#1b1f24",
};

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
      position: "top",
    });
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW="container.sm" py={{ base: 10, md: 14 }}>
      <VStack spacing={{ base: 8, md: 10 }}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          lineHeight={1.1}
          color={PALETTE.text}
          bgGradient={`linear(to-r, ${PALETTE.text}, ${PALETTE.text})`}
          bgClip="text"
        >
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={PALETTE.base}
          p={{ base: 6, md: 8 }}
          rounded="2xl"
          shadow="xl"
          borderWidth="1px"
          borderColor={PALETTE.border}
          transition="box-shadow .25s ease, border-color .25s ease, transform .25s ease"
          _hover={{ shadow: "2xl", borderColor: PALETTE.hover }}
        >
          <VStack spacing={{ base: 5, md: 6 }} align="stretch">
            <FormControl>
              <FormLabel mb={2} color={PALETTE.text}>Product Name</FormLabel>
              <Input
                placeholder="e.g., Wireless Headphones"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                size="lg"
                bg={PALETTE.soft}
                color={PALETTE.text}
                borderColor={PALETTE.border}
                borderRadius="xl"
                _hover={{ borderColor: PALETTE.hover }}
                _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
              />
            </FormControl>

            <FormControl>
              <FormLabel mb={2} color={PALETTE.text}>Price</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                value={newProduct.price === "" ? "" : Number(newProduct.price)}
                onChange={(_, val) => setNewProduct({ ...newProduct, price: val })}
              >
                <NumberInputField
                  placeholder="0.00"
                  size="lg"
                  bg={PALETTE.soft}
                  color={PALETTE.text}
                  borderColor={PALETTE.border}
                  borderRadius="xl"
                  _hover={{ borderColor: PALETTE.hover }}
                  _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel mb={2} color={PALETTE.text}>Image URL</FormLabel>
              <Input
                placeholder="https://example.com/product.jpg"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                size="lg"
                bg={PALETTE.soft}
                color={PALETTE.text}
                borderColor={PALETTE.border}
                borderRadius="xl"
                _hover={{ borderColor: PALETTE.hover }}
                _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
              />
            </FormControl>

            <Button
              onClick={handleAddProduct}
              w="full"
              size="lg"
              height="54px"
              borderRadius="xl"
              shadow="md"
              bg={PALETTE.accent}
              color={PALETTE.text}
              borderWidth="1px"
              borderColor={PALETTE.border}
              transition="transform .2s ease, box-shadow .2s ease, background .2s ease"
              _hover={{ transform: "translateY(-2px)", shadow: "lg", bg: PALETTE.hover }}
              _active={{ transform: "translateY(-1px)" }}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
