import ProductCardComponent from '../../components/product-card/index.js';
import {ProductPage} from '../product/index.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"></div>
            `
        );
    }

    getData() {
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
    }
    getData2() {
        return [
            {
                id: 1,
                src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg",
                title: "Бенгальская кошка",
                text: "Одно из названий дикой бенгальской кошки — «леопардовая кошка», поэтому может возникнуть предположение о её близком родстве с леопардом. На самом деле она не ближе к леопарду, чем обычная домашняя кошка."
            },
            {
                id: 2,
                src: "https://avatars.mds.yandex.net/get-entity_search/2334190/989334691/orig",
                title: "Мейн-кун",
                text: "Название «мейн-кун» является производным от двух слов. Первое — это название штата Мэн, а второе — производное от англ. слова raccoon, которое переводится как «енот». Старейшая американская порода кошек."
            },
            {
                id: 3,
                src: "https://i.pinimg.com/736x/3b/8c/b1/3b8cb13505d4de62f80fab607d02982c.jpg",
                title: "Сомали",
                text: "Порода сомалийских кошек получила своё название от имени страны Сомали, которая соседствует на карте с Абиссинией. В конце 60-х годов хозяйка американского питомника Эвелин Мэгью решила, что такой красотой обязан любоваться весь мир, и основала первое общество любителей сомалийских кошек."
            },
        ];
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.opacity = 1;
        setTimeout(() => {
            notification.style.opacity = 0;
        }, 3000);
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id;
        const data = this.getData2().find(item => item.id === parseInt(cardId));

        const productPage = new ProductPage(this.parent, data);
        productPage.render();

        this.showNotification(`Открыта страница кошки с номером: ${cardId}`);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}