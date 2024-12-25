import ProductCardComponent from '../../components/product-card/productcard.ts';
// import { ajax } from "../../modules/ajax.ts";
import { urls } from "../../modules/urls.ts";
import { groupId } from "../../modules/consts.ts";
import { ProductComponent } from "../../components/product/product.ts";
import axios from 'axios';

interface Item {
    id: number;
    photo_400_orig: string;
    first_name: string;
    last_name: string;
}

interface AjaxResponse {
    response: {
        items: Item[];
    };
}

export class MainPage {
    private parent: HTMLElement;
    private state: 'cards' | 'human';
    private sort: string;
    private items: Item[] = [];
    private selectedItem: Item | null = null;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.state = 'cards';
        this.sort = 'id_asc';
    }

    private get pageRoot(): HTMLElement | null {
        return document.getElementById('main-page');
    }

    private get cardsContainer(): HTMLElement | null {
        return document.getElementById('cards-container');
    }

    private get sortContainer(): HTMLElement | null {
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

    async getData() {
        try {
            const response = await axios.post(urls.getGroupMembers(groupId, this.sort));
            this.items = response.data.response.items;
            this.renderData(this.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderData(items: Item[]) {
        const cardsContainer = this.cardsContainer;
        if (cardsContainer) {
            cardsContainer.innerHTML = '';
            items.forEach((item) => {
                const productCard = new ProductCardComponent(cardsContainer, (sort: string) => {
                    this.sort = sort;
                    this.getData();
                });
                productCard.render(item, this.clickCard.bind(this));
            });
        }
    }

    clickCard(e: Event) {
        const cardId = (e.target as HTMLElement).dataset.id;
        if (cardId) {
            this.selectedItem = this.items.find(item => item.id === parseInt(cardId, 10)) || null;
            this.state = 'human';
            this.render();
        }
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
            const sortContainer = this.sortContainer;

            if (sortContainer) {
                const productCard = new ProductCardComponent(sortContainer, (sort: string) => {
                    this.sort = sort;
                    this.getData();
                });
                productCard.renderSort();
                this.getData();
            }
        } else if (this.state === 'human' && this.selectedItem) {
            const pageRoot = this.pageRoot;
            if (pageRoot) {
                const product = new ProductComponent(pageRoot);
                product.render(this.selectedItem, this.clickBack.bind(this));
            }
        }
    }
}