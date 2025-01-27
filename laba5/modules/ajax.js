async function fetchData(url, retries = 3, delay = 2000) {
    try {
    const response = await fetch(url, {
        method: 'POST',
    })
    const data = await response.json();
    return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Повторная попытка...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchData(url, retries - 1, delay);
        } else {
            console.log('Не удалось получить данные после нескольких попыток:', error);
            throw error;
        }
    }
}

export { fetchData };