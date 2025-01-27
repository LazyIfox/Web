const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { Client } = require('pg');
const app = express();


const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'postgres'
});

// Подключение к базе данных
client.connect(err => {
    if (err) {
        console.error('Ошибка подключения к БД', err.stack);
    } else {
        console.log('Подключено к БД');
    }
});

const PORT = 8000;
app.use(cors());
app.use(express.json());

app.get('/postgres', (req, res) => {
    client.query('SELECT * FROM cat', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err.stack);
            return res.status(500).send('Ошибка выполнения запроса');
        }
        res.status(200).json(result.rows);
    });
});

app.post('/postgres', (req, res) => {
    const newUser = req.body;
    client.query(
        'INSERT INTO cat (id, src, title, text) VALUES ($1, $2, $3, $4) RETURNING id',
        [newUser.id, newUser.src, newUser.title, newUser.text],
        (error, results) => {
            if (error) {
                console.error('Ошибка вставки пользователя:', error.stack);
                return res.status(500).send({ error: 'Ошибка добавления пользователя' });
            }
            res.status(201).send({ id: results.rows[0].id, ...newUser });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});