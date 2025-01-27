import { Box, Text, VStack } from "@chakra-ui/react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  };
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      width="300px"
    >
      <VStack spacing={2} align="start">
        <Text fontWeight="bold" fontSize="xl">
          {product.name}
        </Text>
        <Text>{product.description}</Text>
        <Text>Preço: R$ {product.price.toFixed(2)}</Text>
        <Text>Quantidade: {product.quantity}</Text>
      </VStack>
    </Box>
  );
}

export default ProductCard;
