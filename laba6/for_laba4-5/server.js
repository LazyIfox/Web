import express from 'express';
import axios from 'axios';
import { groupId, accessToken, version } from './modules/consts.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/group-members', async (req, res) => {
    const { sort } = req.query;
    try {
        const response = await axios.get('https://api.vk.com/method/groups.getMembers', {
        params: {
            group_id: groupId,
            fields: 'photo_400_orig',
            sort: sort || 'id_asc',
            access_token: accessToken,
            v: version
        }
    });
    res.json(response.data.response.items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch group members' });
    }
});

app.delete('/api/group-members/:id', (req, res) => {
        const { id } = req.params;
        res.json({ message: 'User with id ${id} has been deleted' });
    });

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});