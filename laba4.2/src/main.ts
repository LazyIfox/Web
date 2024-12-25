import {MainPage} from "./pages/main/main2.ts";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    if (root) {
        const page = new MainPage(root);
        page.render();
    } else {
        console.error('Root element not found');
    }
});