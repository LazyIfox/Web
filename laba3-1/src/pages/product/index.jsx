import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Image, Heading, Text } from '@chakra-ui/react';

const ProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
  const getData = (productId) => {
    const products = [
        {
            id: 1,
            src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg",
            title: "Бенгальская кошка",
            text: "Одно из названий дикой бенгальской кошки — «леопардовая кошка», поэтому может возникнуть предположение о её близком родстве с леопардом."
        },
        {
            id: 2,
            src: "https://avatars.mds.yandex.net/get-entity_search/2334190/989334691/orig",
            title: "Мейн-кун",
            text: "Название «мейн-кун» является производным от двух слов. Первое — это название штата Мэн, а второе — производное от англ. слова raccoon."
        },
        {
            id: 3,
            src: "https://i.pinimg.com/736x/3b/8c/b1/3b8cb13505d4de62f80fab607d02982c.jpg",
            title: "Сомали",
            text: "Порода сомалийских кошек получила своё название от имени страны Сомали, которая соседствует на карте с Абиссинией."
        },
      ];
      return products.find(product => product.id === parseInt(productId));
  };

  const data = getData(id);

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    showNotification(`Открыта страница кошки с номером: ${id}`);
  }, [id]);

  const showNotification = (message) => {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.textContent = message;
      notification.style.opacity = 1;
      setTimeout(() => {
        notification.style.opacity = 0;
      }, 3000);
    }
  };

  return (
    <Box maxW="560px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box display="flex">
        <Image src={data.src} alt={data.title} boxSize="250px" objectFit="cover" />
        <Box p="6">
          <Heading as="h5" size="md">
            {data.title}
          </Heading>
          <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {data.text}
          </Text>
          <Button onClick={handleBack} mb={4}>Назад</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;