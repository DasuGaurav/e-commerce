import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  useColorMode,
  useDisclosure,
  Stack,
  Collapse,
  InputGroup,
  InputLeftElement,
  Input,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun, LuPlus } from "react-icons/lu";
import ClerkAuthButtons from "./ClerkAuthButtons";


const PALETTE = {
  base: "#FBF6EF",
  soft: "#DCE0D9",
  accent: "#EAD7C3",
  text: "#1b1f24",
  textSoft: "#39424e",
  border: "#e6d9c8",
  hover: "#e5d0b5",
};

const links = [
  { kind: "top", label: "Home" },
  { kind: "hash", hash: "#products", label: "Products" },
  { kind: "hash", hash: "#about", label: "About" },
  { kind: "hash", hash: "#contact", label: "Contact" },
];

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToHash = (hash) => {
    const tryScroll = (attempts = 0) => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        onClose();
      } else if (attempts < 10) requestAnimationFrame(() => tryScroll(attempts + 1));
    };
    tryScroll();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClose();
  };

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToHash(hash), 200);
    } else {
      scrollToHash(hash);
    }
  };

  const handleTopClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToTop(), 200);
    } else {
      scrollToTop();
    }
  };

  const NavItem = ({ l }) => {
    const baseStyle = {
      padding: "8px 12px",
      borderRadius: "12px",
      fontWeight: 600,
      textDecoration: "none",
      transition: "all .2s",
      color: PALETTE.text,
    };
    if (l.kind === "top")
      return (
        <ChakraLink
          href="#"
          onClick={handleTopClick}
          sx={baseStyle}
          _hover={{ bg: PALETTE.soft }}
        >
          {l.label}
        </ChakraLink>
      );
    if (l.kind === "hash")
      return (
        <ChakraLink
          href={l.hash}
          onClick={(e) => handleHashClick(e, l.hash)}
          sx={baseStyle}
          _hover={{ bg: PALETTE.soft }}
        >
          {l.label}
        </ChakraLink>
      );
    return null;
  };

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      bg={PALETTE.base}
      borderBottomWidth="1px"
      borderColor={PALETTE.border}
      backdropFilter="saturate(120%) blur(8px)"
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Flex h={20} align="center" justify="space-between" gap={4}>
          <HStack spacing={3}>
            <IconButton
              aria-label="Menu"
              icon={isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon boxSize={5} />}
              display={{ base: "inline-flex", md: "none" }}
              variant="ghost"
              color={PALETTE.text}
              _hover={{ bg: PALETTE.soft }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Text
              as={Link}
              to="/"
              fontSize={{ base: "22px", md: "28px" }}
              fontWeight="extrabold"
              letterSpacing="0.4px"
              color={PALETTE.text}
              lineHeight={1}
              onClick={onClose}
            >
              Product Store
            </Text>
          </HStack>

          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            {links.map((l) => (
              <NavItem key={l.label} l={l} />
            ))}
          </HStack>

          <HStack spacing={3} minW={{ md: "44%" }} justify="flex-end" w="full">
            <InputGroup maxW={{ base: "0", sm: "260px", md: "320px" }} display={{ base: "none", sm: "flex" }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color={PALETTE.textSoft} />
              </InputLeftElement>
              <Input
                placeholder="Search products"
                variant="filled"
                bg={PALETTE.soft}
                _hover={{ bg: "#D6DBD4" }}
                _focus={{ bg: "#D6DBD4", borderColor: PALETTE.accent }}
                borderColor={PALETTE.border}
                color={PALETTE.text}
                borderRadius="14px"
              />
            </InputGroup>
            <Button
              as={Link}
              to="/create"
              leftIcon={<LuPlus size={18} />}
              bg={PALETTE.accent}
              color={PALETTE.text}
              _hover={{ bg: PALETTE.hover }}
              borderRadius="14px"
              shadow="sm"
              onClick={onClose}
            >
              Add
            </Button>

            <ClerkAuthButtons />


          </HStack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: "none" }}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color={PALETTE.textSoft} />
                </InputLeftElement>
                <Input
                  placeholder="Search products"
                  variant="filled"
                  bg={PALETTE.soft}
                  _hover={{ bg: "#D6DBD4" }}
                  _focus={{ bg: "#D6DBD4", borderColor: PALETTE.accent }}
                  borderColor={PALETTE.border}
                  color={PALETTE.text}
                  borderRadius="12px"
                />
              </InputGroup>
              <Divider borderColor={PALETTE.border} />
              {links.map((l) => (
                <Box key={l.label} onClick={onClose}>
                  <NavItem l={l} />
                </Box>
              ))}
              <Button
                as={Link}
                to="/create"
                leftIcon={<LuPlus size={18} />}
                bg={PALETTE.accent}
                color={PALETTE.text}
                _hover={{ bg: PALETTE.hover }}
                borderRadius="12px"
                w="full"
                onClick={onClose}
              >
                Add Product
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;
