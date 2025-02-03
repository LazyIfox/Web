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
                    <div class="mb-3">
                        <label for="id" class="form-label">ID</label>
                        <input type="number" class="form-control" id="id" name="id" required>
                    </div>
                    <div class="mb-3">
                        <label for="photo_400_orig" class="form-label">Изображение (URL)</label>
                        <input type="text" class="form-control" id="photo_400_orig" name="photo_400_orig" required>
                    </div>
                    <div class="mb-3">
                        <label for="first_name" class="form-label">Имя</label>
                        <input type="text" class="form-control" id="first_name" name="first_name" required>
                    </div>
                    <div class="mb-3">
                        <label for="last_name" class="form-label">Фамилия</label>
                        <input type="text" class="form-control" id="last_name" name="last_name" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Добавить</button>
                </form>
                ` : ''}
            </div>
        `
    );
}

async fetchData2() {
    const url = `http://localhost:8000/api/group-members`;
    try {
        const data = await fetchData(url);
        this.items = this.sortItems(data);
        this.renderData(this.items);
    } catch (error) {
        console.error('Ошибка:', error);
    }
    
}

sortItems(items) {
    if (this.sort === 'id_asc') {
        return items.sort((a, b) => a.id - b.id);
    } else if (this.sort === 'id_desc') {
        return items.sort((a, b) => b.id - a.id);
    }
    return items;
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
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.id = parseInt(data.id, 10);

    try {
        const response = await fetch('http://localhost:8000/api/group-members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        this.render();
    } catch (error) {
        console.error(error);
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