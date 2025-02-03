import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { groupId, accessToken, version } from './modules/consts.js';


const app = express();
const port = 8000;
const stocksFile = path.join(process.cwd(), 'db', 'stocks.json');

app.use(express.json());

const saveDataToFile = (data) => {
    fs.writeFileSync(stocksFile, JSON.stringify(data, null, 2), 'utf8');
};

const readDataFromFile = () => {
    if (fs.existsSync(stocksFile)) {
        return JSON.parse(fs.readFileSync(stocksFile, 'utf8'));
    }
    return [];
};


const fetchGroupMembers = async () => {
    try {
        const response = await axios.get('https://api.vk.com/method/groups.getMembers', {
            params: {
                group_id: groupId,
                fields: 'photo_400_orig',
                sort: 'id_asc',
                access_token: accessToken,
                v: version
            }
        });
        return response.data.response.items;
    } catch (error) {
        console.error('Failed to fetch group members:', error);
        throw error;
    }
};

app.get('/api/group-members', async (req, res) => {
    try {
        const data = readDataFromFile();
        if (data.length === 0) {
            const members = await fetchGroupMembers();
            saveDataToFile(members);
            res.json(members);
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read local data' });
    }
});

app.post('/api/group-members', (req, res) => {
    const newMember = req.body;
    newMember.id = parseInt(newMember.id, 10);

    try {
        let members = readDataFromFile();

        if (members.some(member => member.id === newMember.id)) {
            return res.status(400).send('Карточка с таким id уже существует');
        }

        members.push(newMember);
        saveDataToFile(members);
        res.json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add new member' });
    }
});


app.delete('/api/group-members/:id', (req, res) => {
    const { id } = req.params;
    try {
        let data = readDataFromFile();
        data = data.filter(member => member.id !== parseInt(id, 10));
        saveDataToFile(data);
        res.json({ message: `User with id ${id} has been deleted` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});