import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Tooltip,
  Badge,
  AspectRatio,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState, useMemo } from "react";
import { useProductStore } from "../store/product";

const PALETTE = {
  base: "#FBF6EF",   // paper
  soft: "#DCE0D9",   // inputs / chips
  accent: "#EAD7C3", // buttons / badge
  border: "#e6d9c8",
  hover: "#e5d0b5",
  text: "#1b1f24",
  sub: "#4b5563",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const cancelRef = useRef();

  const priceIsInvalid = useMemo(() => {
    const n = Number(updatedProduct?.price);
    return Number.isNaN(n) || n < 0;
  }, [updatedProduct?.price]);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const { success, message } = await deleteProduct(product._id);
    setIsDeleteLoading(false);
    onConfirmClose();
    toast({
      title: success ? "Deleted" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 2500,
      isClosable: true,
      position: "top",
    });
  };

  const handleUpdate = async () => {
    if (!updatedProduct?.name?.trim() || priceIsInvalid) {
      toast({
        title: "Please fix the form",
        description: "Name is required and price must be a non-negative number.",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setIsSaving(true);
    const { success } = await updateProduct(product._id, {
      ...updatedProduct,
      price: Number(updatedProduct.price),
    });
    setIsSaving(false);
    if (success) {
      toast({ title: "Product updated", status: "success", duration: 2000, isClosable: true, position: "top" });
      onEditClose();
    } else {
      toast({ title: "Update failed", status: "error", duration: 2500, isClosable: true, position: "top" });
    }
  };

  return (
    <Box
      bg={PALETTE.base}
      color={PALETTE.text}
      rounded="2xl"
      overflow="hidden"
      transition="transform .25s ease, box-shadow .25s ease, border-color .25s ease"
      borderWidth="1px"
      borderColor={PALETTE.border}
      shadow="md"
      _hover={{ transform: "translateY(-8px)", shadow: "xl", borderColor: PALETTE.hover }}
    >
      <AspectRatio w="full" ratio={16 / 10}>
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/800x500?text=No+Image"
        />
      </AspectRatio>

      <Stack p={6} spacing={4}>
        <HStack justify="space-between" align="start">
          <Heading as="h3" size="md" noOfLines={2} lineHeight={1.2}>
            {product.name}
          </Heading>
          <Badge
            bg={PALETTE.accent}
            color={PALETTE.text}
            borderRadius="lg"
            px={3}
            py={1}
            fontSize="0.9rem"
            borderWidth="1px"
            borderColor={PALETTE.border}
          >
            {currency.format(Number(product.price || 0))}
          </Badge>
        </HStack>

        {product?.description ? (
          <Text fontSize="sm" color={PALETTE.sub} noOfLines={2}>
            {product.description}
          </Text>
        ) : null}

        <Divider borderColor={PALETTE.border} />

        <HStack spacing={3} justify="flex-end">
          <Tooltip label="Edit product">
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              onClick={() => {
                setUpdatedProduct(product);
                onEditOpen();
              }}
              bg={PALETTE.accent}
              color={PALETTE.text}
              _hover={{ bg: PALETTE.hover }}
              _active={{ bg: PALETTE.accent }}
              size="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={PALETTE.border}
            />
          </Tooltip>
          <Tooltip label="Delete product">
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              onClick={onConfirmOpen}
              variant="outline"
              size="sm"
              borderRadius="lg"
              borderColor={PALETTE.border}
              _hover={{ bg: "#ffe8e8" }}
              color={PALETTE.text}
            />
          </Tooltip>
        </HStack>
      </Stack>

      <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent bg={PALETTE.base} color={PALETTE.text} shadow="xl" rounded="2xl" borderWidth="1px" borderColor={PALETTE.border}>
          <ModalHeader pb={2}>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={0} pb={4}>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={updatedProduct?.name || ""}
                  onChange={(e) => setUpdatedProduct((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Product name"
                  borderRadius="lg"
                  bg={PALETTE.soft}
                  borderColor={PALETTE.border}
                  _hover={{ borderColor: PALETTE.hover }}
                  _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                />
              </FormControl>

              <FormControl isInvalid={priceIsInvalid} isRequired>
                <FormLabel>Price</FormLabel>
                <NumberInput
                  min={0}
                  precision={2}
                  value={updatedProduct?.price ?? 0}
                  onChange={(_, val) => setUpdatedProduct((p) => ({ ...p, price: val }))}
                >
                  <NumberInputField
                    placeholder="0.00"
                    borderRadius="lg"
                    bg={PALETTE.soft}
                    borderColor={PALETTE.border}
                    _hover={{ borderColor: PALETTE.hover }}
                    _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>Enter a valid non-negative price.</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={updatedProduct?.image || ""}
                  onChange={(e) => setUpdatedProduct((p) => ({ ...p, image: e.target.value }))}
                  placeholder="https://..."
                  borderRadius="lg"
                  bg={PALETTE.soft}
                  borderColor={PALETTE.border}
                  _hover={{ borderColor: PALETTE.hover }}
                  _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={updatedProduct?.description || ""}
                  onChange={(e) => setUpdatedProduct((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Short description"
                  borderRadius="lg"
                  bg={PALETTE.soft}
                  borderColor={PALETTE.border}
                  _hover={{ borderColor: PALETTE.hover }}
                  _focus={{ borderColor: PALETTE.accent, boxShadow: `0 0 0 1px ${PALETTE.accent}` }}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={onEditClose} borderRadius="lg">
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              isLoading={isSaving}
              borderRadius="lg"
              bg={PALETTE.accent}
              color={PALETTE.text}
              _hover={{ bg: PALETTE.hover }}
              borderWidth="1px"
              borderColor={PALETTE.border}
            >
              Save changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isConfirmOpen} leastDestructiveRef={cancelRef} onClose={onConfirmClose} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent rounded="2xl" bg={PALETTE.base} color={PALETTE.text} shadow="xl" borderWidth="1px" borderColor={PALETTE.border}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete product
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete “{product.name}”? This action cannot be undone.
          </AlertDialogBody>

          <AlertDialogFooter gap={3}>
            <Button ref={cancelRef} onClick={onConfirmClose} variant="ghost" borderRadius="lg">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={0} isLoading={isDeleteLoading} borderRadius="lg">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default ProductCard;
