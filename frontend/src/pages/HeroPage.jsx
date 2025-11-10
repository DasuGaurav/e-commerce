import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { FiArrowRight, FiPlay, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);

const PALETTE = {
  base: "#FBF6EF",   // light paper
  soft: "#DCE0D9",   // soft surface
  accent: "#EAD7C3", // brand accent
  border: "#e6d9c8",
  hover: "#e5d0b5",
  text: "#1b1f24",
  sub: "#4b5563",
};

const features = ["Handpicked quality", "Fast delivery", "Secure checkout", "24/7 support"];
const stats = [
  { k: "2M+", v: "Happy Customers" },
  { k: "120K+", v: "Premium Products" },
  { k: "75+", v: "Countries Served" },
];
const logos = ["Nimbus", "Aquila", "Vertex", "WaveCo", "NovaMart"];

const HeroPage = () => {
  return (
    <Box
      id="home"
      position="relative"
      minH="100vh"
      overflow="hidden"
      bgGradient={`linear(to-br, ${PALETTE.soft}, ${PALETTE.base}, ${PALETTE.accent})`}
      color={PALETTE.text}
      pt={{ base: 20, md: 28 }}
      pb={{ base: 16, md: 24 }}
      borderBottomWidth="1px"
      borderColor={PALETTE.border}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 10, md: 14 }} textAlign="center">
          <MotionBox initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Badge
              px={3}
              py={1.5}
              rounded="full"
              bg={PALETTE.accent}
              color={PALETTE.text}
              borderWidth="1px"
              borderColor={PALETTE.border}
              fontWeight="semibold"
              letterSpacing="wide"
              shadow="sm"
            >
              NEW SEASON • FRESH DROPS
            </Badge>
          </MotionBox>

          <MotionHeading
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            lineHeight={1.05}
          >
            Discover The Best Products 🚀
          </MotionHeading>

          <MotionText
            fontSize={{ base: "md", md: "xl" }}
            maxW="3xl"
            color={PALETTE.sub}
            px={{ base: 4, md: 0 }}
          >
            Curated essentials and luxury picks from world-class brands. Built for speed,
            value, and style — so you get more with every cart.
          </MotionText>

          <MotionStack direction={{ base: "column", sm: "row" }} spacing={4} justify="center">
            <Button
              size="lg"
              px={8}
              h="56px"
              rounded="xl"
              bg={PALETTE.accent}
              color={PALETTE.text}
              borderWidth="1px"
              borderColor={PALETTE.border}
              rightIcon={<Icon as={FiArrowRight} />}
              shadow="lg"
              transition="transform .2s ease, box-shadow .2s ease, background .2s ease"
              _hover={{ transform: "translateY(-3px)", shadow: "xl", bg: PALETTE.hover }}
              _active={{ transform: "translateY(-1px)" }}
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              px={8}
              h="56px"
              rounded="xl"
              variant="outline"
              color={PALETTE.text}
              borderColor={PALETTE.border}
              rightIcon={<Icon as={FiPlay} />}
              _hover={{ bg: PALETTE.soft }}
            >
              Watch Demo
            </Button>
          </MotionStack>

          {/* Info Cards */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} maxW="5xl" w="full">
            <Box
              bg={PALETTE.base}
              borderWidth="1px"
              borderColor={PALETTE.border}
              rounded="2xl"
              p={{ base: 5, md: 6 }}
              shadow="xl"
              transition="box-shadow .2s ease, border-color .2s ease"
              _hover={{ shadow: "2xl", borderColor: PALETTE.hover }}
            >
              <HStack spacing={3} flexWrap="wrap" justify="center">
                {features.map((f) => (
                  <HStack
                    key={f}
                    spacing={2}
                    px={3}
                    py={2}
                    rounded="full"
                    bg={PALETTE.soft}
                    borderWidth="1px"
                    borderColor={PALETTE.border}
                  >
                    <Icon as={FiCheck} />
                    <Text fontWeight="medium">{f}</Text>
                  </HStack>
                ))}
              </HStack>
            </Box>

            <Box
              bg={PALETTE.base}
              borderWidth="1px"
              borderColor={PALETTE.border}
              rounded="2xl"
              p={{ base: 6, md: 8 }}
              shadow="xl"
              textAlign="center"
              transition="box-shadow .2s ease, border-color .2s ease"
              _hover={{ shadow: "2xl", borderColor: PALETTE.hover }}
            >
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={{ base: 6, sm: 4 }}>
                {stats.map((s) => (
                  <VStack key={s.v} spacing={1}>
                    <Heading size="lg">{s.k}</Heading>
                    <Text fontSize="sm" color={PALETTE.sub}>
                      {s.v}
                    </Text>
                  </VStack>
                ))}
              </SimpleGrid>
            </Box>
          </SimpleGrid>

          {/* Brand Logos */}
          <VStack spacing={3} pt={{ base: 8, md: 10 }}>
            <Text fontSize="sm" color={PALETTE.sub}>
              Trusted by leading brands
            </Text>
            <HStack spacing={{ base: 3, md: 6 }} wrap="wrap" justify="center">
              {logos.map((l) => (
                <Box
                  key={l}
                  px={4}
                  py={2}
                  rounded="md"
                  bg={PALETTE.soft}
                  borderWidth="1px"
                  borderColor={PALETTE.border}
                  fontWeight="semibold"
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-2px)", bg: PALETTE.hover, shadow: "md" }}
                >
                  {l}
                </Box>
              ))}
            </HStack>
          </VStack>

          {/* Highlight Card */}
          <Box
            mt={{ base: 10, md: 14 }}
            bg={PALETTE.base}
            borderWidth="1px"
            borderColor={PALETTE.border}
            rounded="2xl"
            shadow="2xl"
            p={{ base: 6, md: 8 }}
            w="full"
            maxW="4xl"
            mx="auto"
            textAlign="left"
            transition="box-shadow .2s ease, border-color .2s ease"
            _hover={{ shadow: "3xl", borderColor: PALETTE.hover }}
          >
            <Text fontSize="sm" color={PALETTE.sub}>
              Today’s Highlight
            </Text>
            <Heading size="md" mt={2} mb={3}>
              Editor’s Pick: Elite Essentials
            </Heading>
            <Text color={PALETTE.sub} fontSize="sm" mb={4}>
              A minimalist collection blending performance and luxury for your everyday lifestyle.
            </Text>
            <Button
              size="sm"
              bg={PALETTE.accent}
              color={PALETTE.text}
              borderWidth="1px"
              borderColor={PALETTE.border}
              rightIcon={<FiArrowRight />}
              _hover={{ bg: PALETTE.hover }}
            >
              Explore
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default HeroPage;
