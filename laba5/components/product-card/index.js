export class ProductCardComponent {
    constructor(parent, onChangeSort) {
        this.parent = parent;
        this.onChangeSort = onChangeSort;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 200px;">
                <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
            `
        );
    }

    getSortHTML() {
        return (
            `
                <div class="sort" style="width: 320px;">
                    <label for="sort-select">Сортировка:</label>
                    <select id="sort-select">
                        <option value="id_asc">По ID возрастание</option>
                        <option value="id_desc">По ID убывание</option>
                        <option value="time_asc">По времени вступления (возрастание)</option>
                        <option value="time_desc">По времени вступления (убывание)</option>
                    </select>
                </div>
            `
        );
    }

    addListeners(data, listener) {
        if (data) {
            document
                .getElementById(`click-card-${data.id}`)
                .addEventListener("click", listener);
        }
        
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.onChangeSort(e.target.value);
        })
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }

    renderSort() {
        const html = this.getSortHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners();
    }
}

export default ProductCardComponent;