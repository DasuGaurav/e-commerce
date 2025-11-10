import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const PALETTE = {
  base: "#FBF6EF",   // background
  soft: "#DCE0D9",   // surfaces / inputs
  accent: "#EAD7C3", // buttons / emphasis
  border: "#e6d9c8",
  hover: "#e5d0b5",
  text: "#1b1f24",
  sub: "#4b5563",
};

const Card = ({ img, name, role, blurb }) => (
  <Box
    bg={PALETTE.base}
    color={PALETTE.text}
    borderRadius="2xl"
    boxShadow="xl"
    overflow="hidden"
    transition="transform .25s ease, box-shadow .25s ease, border-color .25s ease"
    _hover={{ transform: "translateY(-8px)", boxShadow: "2xl", borderColor: PALETTE.hover }}
    borderWidth="1px"
    borderColor={PALETTE.border}
    textAlign="center"
    p={{ base: 5, md: 6 }}
  >
    <Image
      src={img}
      alt={name}
      borderRadius="full"
      boxSize={{ base: "100px", md: "120px" }}
      mb={4}
      mx="auto"
      objectFit="cover"
      boxShadow={`0 0 0 4px ${PALETTE.accent}`}
    />
    <Heading as="h3" size="lg" mb={1} lineHeight={1.2}>
      {name}
    </Heading>
    <Text fontSize="md" fontWeight="semibold" mb={3} color={PALETTE.sub}>
      {role}
    </Text>
    <Text fontSize="sm" color={PALETTE.sub} px={{ base: 1, md: 2 }}>
      {blurb}
    </Text>
    <HStack spacing={3} justify="center" mt={5}>
      <Button as="a" href="https://www.linkedin.com" variant="ghost" fontSize="lg" p={0} _hover={{ transform: "translateY(-2px)", bg: PALETTE.soft }} color={PALETTE.text}>
        <FaLinkedin />
      </Button>
      <Button as="a" href="https://twitter.com" variant="ghost" fontSize="lg" p={0} _hover={{ transform: "translateY(-2px)", bg: PALETTE.soft }} color={PALETTE.text}>
        <FaTwitter />
      </Button>
      <Button as="a" href="https://facebook.com" variant="ghost" fontSize="lg" p={0} _hover={{ transform: "translateY(-2px)", bg: PALETTE.soft }} color={PALETTE.text}>
        <FaFacebook />
      </Button>
      <Button as="a" href="https://instagram.com" variant="ghost" fontSize="lg" p={0} _hover={{ transform: "translateY(-2px)", bg: PALETTE.soft }} color={PALETTE.text}>
        <FaInstagram />
      </Button>
    </HStack>
  </Box>
);

const AboutUs = () => {
  return (
    <Box
      id="about"
      bgGradient={`linear(to-r, ${PALETTE.soft}, ${PALETTE.base}, ${PALETTE.accent})`}
      color={PALETTE.text}
      py={{ base: 12, md: 16 }}
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor={PALETTE.border}
    >
      <Container maxW="container.xl" textAlign="center" px={{ base: 4, md: 6 }}>
        <Heading
          as="h1"
          size="2xl"
          mb={{ base: 4, md: 6 }}
          fontWeight="extrabold"
          letterSpacing="widest"
          lineHeight={1.1}
          color={PALETTE.text}
        >
          About Us
        </Heading>

        <Text fontSize={{ base: "md", md: "xl" }} mb={{ base: 10, md: 14 }} opacity={0.9} maxW="3xl" mx="auto" color={PALETTE.sub}>
          We are a passionate team dedicated to providing the best products and services. We believe in innovation,
          quality, and customer satisfaction. Get to know us better!
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8, lg: 10 }} mb={{ base: 12, md: 16 }}>
          <Card
            img="https://randomuser.me/api/portraits/men/1.jpg"
            name="John Doe"
            role="CEO & Founder"
            blurb="John is the visionary behind our company. He strives to build solutions that change the game."
          />
          <Card
            img="https://randomuser.me/api/portraits/women/2.jpg"
            name="Jane Smith"
            role="Lead Designer"
            blurb="Jane is responsible for creating stunning designs and ensuring a seamless user experience."
          />
          <Card
            img="https://randomuser.me/api/portraits/men/3.jpg"
            name="Mark Lee"
            role="CTO"
            blurb="Mark leads our technology team, focusing on building robust and scalable systems."
          />
        </SimpleGrid>

        <VStack spacing={4} mt={{ base: 6, md: 8 }}>
          <Text fontSize={{ base: "md", md: "xl" }} opacity={0.9} maxW="2xl" color={PALETTE.sub}>
            Join our team of innovators and help us build a future that empowers others!
          </Text>
          <Button
            size="lg"
            borderRadius="lg"
            px={{ base: 8, md: 10 }}
            shadow="lg"
            bg={PALETTE.accent}
            color={PALETTE.text}
            borderWidth="1px"
            borderColor={PALETTE.border}
            transition="transform .2s ease, box-shadow .2s ease, background .2s ease"
            _hover={{ transform: "translateY(-3px)", shadow: "xl", bg: PALETTE.hover }}
            _active={{ transform: "translateY(-1px)" }}
          >
            Contact Us
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutUs;
