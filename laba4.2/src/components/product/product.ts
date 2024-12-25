interface Item {
    id: number;
    photo_400_orig: string;
    first_name: string;
    last_name: string;
}

export class ProductComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    addListeners(listener: (e: Event) => void): void {
        const backButton = document.getElementById("back-button");
        if (backButton) {
            backButton.addEventListener("click", listener);
        }
    }

    getHTML(data: Item): string {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.photo_400_orig}" class="img-fluid" alt="картинка">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                            <button id="back-button" class="btn btn-primary" type="button">Назад</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    render(data: Item, listener: (e: Event) => void): void {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener)
    }
}