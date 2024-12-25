export class SortFilterComponent {
    constructor(parent, onChange) {
        this.parent = parent;
        this.onChange = onChange;
    }

    getHTML() {
        return (
            `
                <div class="sort-filter">
                    <label for="sort-select">Сортировка:</label>
                    <select id="sort-select">
                        <option value="id_asc">По ID (возрастание)</option>
                        <option value="id_desc">По ID (убывание)</option>
                        <option value="time_asc">По времени вступления (возрастание)</option>
                        <option value="time_desc">По времени вступления (убывание)</option>
                    </select>
                </div>
            `
        );
    }

    addListeners() {
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.onChange(e.target.value);
        });
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners();
    }
}

export default SortFilterComponent;