import ProductCardComponent from '../../components/product-card/index.js';
import { fetchData } from "../../modules/ajax.js";
import { ProductComponent } from "../../components/product/index.js";

export class MainPage {
    constructor(parent) {
    this.parent = parent;
    this.state = 'cards';
    this.sort = 'id_asc';
    this.deletedCards = [];
}

get pageRoot() {
    return document.getElementById('main-page');
}

get cardsContainer() {
    return document.getElementById('cards-container');
}

get sortContainer() {
    return document.getElementById('sort-container');
}

getHTML() {
    return (
        `
            <div id="main-page" class="d-flex flex-wrap">
                <div id="cards-container" class="d-flex flex-wrap gap-2"></div>
                <div id="sort-container" class="d-inline-block p-2 mb-3"></div>
                ${this.state === 'cards' ? `
                <form id="add-card-form">
                    <button type="submit" class="btn btn-primary" style="margin-top: 25px;">
                        Добавить карточку
                    </button>
                </form>
                ` : ''}
            </div>
        `
    );
}

async fetchData2() {
    const url = `http://localhost:8000/api/group-members?sort=${this.sort}`;
    try {
        const data = await fetchData(url);
        this.items = data;
        this.renderData(this.items);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

renderData(items) {
    this.cardsContainer.innerHTML = '';
    items.forEach((item) => {
        const productCard = new ProductCardComponent(this.cardsContainer, (sort) => {
            this.sort = sort;
            this.fetchData2();
        });
        productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this))
    })
}

clickCard(e) {
    const cardId = e.target.dataset.id;
    this.selectedItem = this.items.find(item => item.id === parseInt(cardId, 10));
    this.state = 'human';
    this.render(); 
}

clickBack() {
    this.state = 'cards'; 
    this.render();
}

async deleteCard(e) {
    const cardId = e.target.dataset.id;
        const url = `http://localhost:8000/api/group-members/${cardId}`;
        try {
            await fetchData(url, { method: 'DELETE' });
            const deletedCard = this.items.find(item => item.id === parseInt(cardId, 10));
            this.deletedCards.push(deletedCard); 
            this.items = this.items.filter(item => item.id !== parseInt(cardId, 10));
            this.renderData(this.items);
        } catch (error) {
            console.error('Не удалось удалить пользователя:', error);
        }
}

async addCard(e) {
    e.preventDefault();
    if (this.deletedCards.length > 0) {
        const lastDeletedCard = this.deletedCards.pop();
        this.items.push(lastDeletedCard);
        this.renderData(this.items);
    }
    else {
        console.log('Все карточки уже добавлены');
    }
}

render() {
    this.parent.innerHTML = '' 
    const html = this.getHTML()
    this.parent.insertAdjacentHTML('beforeend', html)

    if (this.state === 'cards') {
        const productCard = new ProductCardComponent(this.sortContainer, (sort) => {
            this.sort = sort
            this.fetchData2()
        });
        productCard.renderSort();
        this.fetchData2();

        document.getElementById('add-card-form').addEventListener('submit', this.addCard.bind(this));
    } else if (this.state === 'human') {
        const product = new ProductComponent(this.pageRoot)
        product.render(this.selectedItem, this.clickBack.bind(this))
    }
}
}