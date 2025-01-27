const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/stocks', (req, res) => {
    const filePath = path.join(__dirname, 'db', 'stocks.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.parse(data));
    });
});

app.post('/stocks', (req, res) => {
    const filePath = path.join(__dirname, 'db', 'stocks.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        let stocks = JSON.parse(data);
        const newStock = req.body;

        newStock.id = parseInt(newStock.id, 10);

        if (stocks.some(stock => stock.id === newStock.id)) {
            return res.status(400).send('Карточка с таким id уже существует');
        }

        stocks.push(newStock);
        fs.writeFile(filePath, JSON.stringify(stocks), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Ошибка записи в файл');
            }
            res.json(newStock);
        });
    });
});

app.delete('/stocks/:id', (req, res) => {
    const filePath = path.join(__dirname, 'db', 'stocks.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        let stocks = JSON.parse(data);
        const id = parseInt(req.params.id, 10);
        stocks = stocks.filter(stock => stock.id !== id);
        fs.writeFile(filePath, JSON.stringify(stocks), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Ошибка записи в файл');
            }
            res.json({ message: 'Карточка удалена' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});