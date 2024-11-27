import React from 'react';
import { Box, Image, Heading, Button } from '@chakra-ui/react';

const ProductCardComponent = ({ data, onClick }) => {
  return (
    <Box maxW="370px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={data.src} alt={data.title} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Heading as="h5" size="md">
            {data.title}
          </Heading>
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {data.text}
        </Box>
        <Button mt="1" colorScheme="blue" onClick={() => onClick(data.id)}>
          Подробнее
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCardComponent;