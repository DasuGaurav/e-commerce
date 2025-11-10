import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Link as ChakraLink,
  Stack,
  HStack,
  IconButton,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const PALETTE = {
  base: "#FBF6EF",
  soft: "#DCE0D9",
  accent: "#EAD7C3",
  border: "#e6d9c8",
  hover: "#e5d0b5",
  text: "#1b1f24",
  sub: "#4b5563",
};

const Footer = () => {
  return (
    <Box
      bg={PALETTE.base}
      color={PALETTE.text}
      py={12}
      borderTopWidth="1px"
      borderColor={PALETTE.border}
    >
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 8, md: 10 }}>
          {/* Brand */}
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight="extrabold" letterSpacing="wide">
              Product Store
            </Text>
            <Text fontSize="md" color={PALETTE.sub}>
              Your one-stop shop for high-quality products at unbeatable prices. Browse and discover amazing deals today!
            </Text>
            <HStack spacing={3}>
              <IconButton
                as={ChakraLink}
                href="https://github.com"
                isExternal
                aria-label="GitHub"
                icon={<FaGithub />}
                bg={PALETTE.soft}
                _hover={{ bg: PALETTE.hover }}
                borderWidth="1px"
                borderColor={PALETTE.border}
                color={PALETTE.text}
                rounded="lg"
              />
              <IconButton
                as={ChakraLink}
                href="https://twitter.com"
                isExternal
                aria-label="Twitter"
                icon={<FaTwitter />}
                bg={PALETTE.soft}
                _hover={{ bg: PALETTE.hover }}
                borderWidth="1px"
                borderColor={PALETTE.border}
                color={PALETTE.text}
                rounded="lg"
              />
              <IconButton
                as={ChakraLink}
                href="https://linkedin.com"
                isExternal
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                bg={PALETTE.soft}
                _hover={{ bg: PALETTE.hover }}
                borderWidth="1px"
                borderColor={PALETTE.border}
                color={PALETTE.text}
                rounded="lg"
              />
            </HStack>
          </Stack>

          {/* Links */}
          <Stack spacing={4}>
            <Text fontWeight="bold" fontSize="lg">Useful Links</Text>
            <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: "underline", color: PALETTE.text }}>
              Home
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/create" _hover={{ textDecoration: "underline", color: PALETTE.text }}>
              Add Product
            </ChakraLink>
            <ChakraLink href="#about" _hover={{ textDecoration: "underline", color: PALETTE.text }}>
              About Us
            </ChakraLink>
            <ChakraLink href="#contact" _hover={{ textDecoration: "underline", color: PALETTE.text }}>
              Contact
            </ChakraLink>
          </Stack>

          {/* Contact */}
          <Stack spacing={2}>
            <Text fontWeight="bold" fontSize="lg">Contact Us</Text>
            <Text fontSize="md" color={PALETTE.sub}>Email: support@productstore.com</Text>
            <Text fontSize="md" color={PALETTE.sub}>Phone: (123) 456-7890</Text>
            <Text fontSize="md" color={PALETTE.sub}>Mon–Fri, 9:00–18:00</Text>
          </Stack>

          {/* Newsletter */}
          <Stack spacing={4}>
            <Text fontWeight="bold" fontSize="lg">Subscribe to our Newsletter</Text>
            <Text fontSize="md" color={PALETTE.sub}>
              Get the latest updates and promotions directly in your inbox.
            </Text>
            <InputGroup size="md">
              <Input
                type="email"
                placeholder="Enter your email"
                bg={PALETTE.soft}
                borderColor={PALETTE.border}
                color={PALETTE.text}
                _hover={{ borderColor: PALETTE.hover }}
                _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                rounded="lg"
              />
              <InputRightElement width="auto" mr={2}>
                <Button
                  bg={PALETTE.accent}
                  color={PALETTE.text}
                  _hover={{ bg: PALETTE.hover }}
                  borderWidth="1px"
                  borderColor={PALETTE.border}
                  rounded="lg"
                >
                  Subscribe
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </SimpleGrid>

        <Divider my={10} borderColor={PALETTE.border} />

        <Box textAlign="center" fontSize="sm" color={PALETTE.sub}>
          <Text>&copy; 2025 Product Store. All rights reserved.</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
