import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const PALETTE = {
  base: "#FBF6EF",
  soft: "#DCE0D9",
  accent: "#EAD7C3",
  border: "#e6d9c8",
  hover: "#e5d0b5",
  text: "#1b1f24",
  sub: "#4b5563",
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We have received your message. Thank you for reaching out!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <Box
      id="contact"
      minH="100vh"
      bgGradient={`linear(to-br, ${PALETTE.soft}, ${PALETTE.base}, ${PALETTE.accent})`}
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 6 }}
      color={PALETTE.text}
    >
      <Container maxW="container.sm">
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            textAlign="center"
            letterSpacing="wide"
            lineHeight={1.15}
            color={PALETTE.text}
          >
            Get in Touch
          </Heading>

          <Box
            bg={PALETTE.base}
            p={{ base: 6, md: 8 }}
            borderRadius="2xl"
            shadow="xl"
            width="full"
            mx="auto"
            borderWidth="1px"
            borderColor={PALETTE.border}
            transition="box-shadow .25s ease, transform .25s ease, border-color .25s ease"
            _hover={{ shadow: "2xl", borderColor: PALETTE.hover }}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={{ base: 5, md: 6 }} align="stretch">
                <FormControl id="name" isRequired>
                  <FormLabel mb={2}>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    size="lg"
                    bg={PALETTE.soft}
                    borderColor={PALETTE.border}
                    borderRadius="xl"
                    _hover={{ borderColor: PALETTE.hover }}
                    _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel mb={2}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    size="lg"
                    bg={PALETTE.soft}
                    borderColor={PALETTE.border}
                    borderRadius="xl"
                    _hover={{ borderColor: PALETTE.hover }}
                    _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                  />
                </FormControl>

                <FormControl id="message" isRequired>
                  <FormLabel mb={2}>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here"
                    size="lg"
                    minHeight="160px"
                    bg={PALETTE.soft}
                    borderColor={PALETTE.border}
                    borderRadius="xl"
                    resize="vertical"
                    _hover={{ borderColor: PALETTE.hover }}
                    _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  height="52px"
                  borderRadius="xl"
                  width="full"
                  bg={PALETTE.accent}
                  color={PALETTE.text}
                  borderWidth="1px"
                  borderColor={PALETTE.border}
                  transition="transform .2s ease, box-shadow .2s ease, background .2s ease"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg", bg: PALETTE.hover }}
                  _active={{ transform: "translateY(-1px)", boxShadow: "md" }}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactPage;
