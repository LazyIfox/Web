import ProductCardComponent from '../../components/product-card/index.js';
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import { ProductComponent } from "../../components/product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.state = 'cards';
        this.sort = 'id_asc';
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
                </div>
            `
        );
    }

    getData() {
        ajax.post(urls.getGroupMembers(groupId, this.sort), (data) => {
            this.items = data.response.items;
            this.renderData(this.items)
        })
    }

    renderData(items) {
        this.cardsContainer.innerHTML = '';
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.cardsContainer, (sort) => {
                this.sort = sort;
                this.getData();
            });
            productCard.render(item, this.clickCard.bind(this))
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
    
    render() {
        this.parent.innerHTML = '' 
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        if (this.state === 'cards') {
            const productCard = new ProductCardComponent(this.sortContainer, (sort) => {
                this.sort = sort
                this.getData()
            });
            productCard.renderSort();
            this.getData();
        } else if (this.state === 'human') {
            const product = new ProductComponent(this.pageRoot)
            product.render(this.selectedItem, this.clickBack.bind(this))
        }
    }
}