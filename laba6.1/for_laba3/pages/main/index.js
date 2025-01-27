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
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                        <h5>Добавить новую карточку</h5>
                        <form id="add-card-form">
                            <div class="mb-3">
                                <label for="id" class="form-label">ID</label>
                                <input type="number" class="form-control" id="id" name="id" required>
                            </div>
                            <div class="mb-3">
                                <label for="src" class="form-label">Изображение (URL)</label>
                                <input type="text" class="form-control" id="src" name="src" required>
                            </div>
                            <div class="mb-3">
                                <label for="title" class="form-label">Название</label>
                                <input type="text" class="form-control" id="title" name="title" required>
                            </div>
                            <div class="mb-3">
                                <label for="text" class="form-label">Описание</label>
                                <textarea class="form-control" id="text" name="text" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Добавить</button>
                        </form>
                    </div>
                </div>
                </div>
                `
        );
    }

    async fetchStocks() {
        const response = await fetch('http://localhost:8000/postgres');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        return data;
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.opacity = 1;
        setTimeout(() => {
            notification.style.opacity = 0;
        }, 3000);
    }

    async clickCard(e) {
        const cardId = e.target.dataset.id;
        const dat = await this.fetchStocks();
        const data = dat.find(item => item.id === parseInt(cardId)); 

        const productPage = new ProductPage(this.parent, data);
        productPage.render();

        this.showNotification(`Открыта страница кошки с номером: ${cardId}`);
    } 

    async addCard(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.id = parseInt(data.id, 10);

        try {
            const response = await fetch('http://localhost:8000/postgres', {
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
            this.showNotification(error.message);
        }
    }

    async deleteCard(e) {
        const cardId = e.target.dataset.id;
        try {
            const response = await fetch(`http://localhost:8000/postgres/${cardId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Ошибка удаления данных');
            this.render();
        } catch (error) {
            console.error(error);
        }
    }

    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = await this.fetchStocks(); 
        data.forEach((item) => {
                const productCard = new ProductCardComponent(this.pageRoot);
                productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
        });
        const form = document.getElementById('add-card-form');
        form.addEventListener('submit', this.addCard.bind(this));
    }
}