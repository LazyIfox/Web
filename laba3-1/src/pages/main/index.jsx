import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';
import ProductCardComponent from '../../components/product-card';

const MainPage = () => {
  const navigate = useNavigate();

  const getData = () => {
    return [
        {
            id: 1,
            src: "https://avatars.mds.yandex.net/get-entity_search/4731417/1009890899/orig",
            title: "Бенгальская кошка",
            text: "Межродовой гибрид домашней кошки и бенгальской кошки."
        },
        {
            id: 2,
            src: "https://avatars.mds.yandex.net/get-entity_search/2338017/993308960/orig",
            title: "Мейн-кун",
            text: "Порода кошек, которая произошла от кошек штата Мэн на северо-востоке США."
        },
        {
            id: 3,
            src: "https://avatars.mds.yandex.net/get-entity_search/4789399/923816805/orig",
            title: "Сомали",
            text: "Длинношёрстная кошка, произошедшая от абиссинской кошки."
        },
    ];
  };

  const data = getData();

  const clickCard = (cardId) => {
    navigate(`/product/${cardId}`);
  };


  return (
    <div className="App">
      <SimpleGrid columns={[1, null, 3]} spacing="40px">
        {data.map((item) => (
          <ProductCardComponent key={item.id} 
          data={item} 
          onClick={clickCard}
           />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MainPage;