import express from 'express';
import { apiKey } from './lib/middlewares/apiKey.js';
import 'dotenv/config';
import autoresRoutes from './routes/autoresRoute.js';
import cenariosRoutes from './routes/cenariosRoute.js';
import curiosidadesRoutes from './routes/curiosidadesRoute.js';
import dicasDeVestibularRoutes from './routes/dicasDeVestibularRoute.js';
import enredosRoutes from './routes/enredosRoute.js';
import livroRoutes from './routes/livroRoute.js';
import membrosRoutes from './routes/membrosRoute.js';
import movimentosLiterariosRoutes from './routes/movimentosLiterariosRoute.js';
import personagensRoutes from './routes/personagensRoute.js';
import projetosRoutes from './routes/projetosRoute.js';
import questoesRoutes from './routes/questoesRoute.js';
import videosRoutes from './routes/videosRoute.js';
import vocabularioRoutes from './routes/vocabularioRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});


// Rotas
app.use('/autores',apiKey, autoresRoutes);
app.use('/cenarios',apiKey, cenariosRoutes);
app.use('/curiosidades',apiKey, curiosidadesRoutes);
app.use('/dicas-de-vestibular', apiKey, dicasDeVestibularRoutes);
app.use('/enredos', apiKey, enredosRoutes);
app.use('/livros', apiKey, livroRoutes);
app.use('/membros', apiKey, membrosRoutes);
app.use('/movimentos-literarios', apiKey, movimentosLiterariosRoutes);
app.use('/personagens', apiKey, personagensRoutes);
app.use('/projetos', apiKey, projetosRoutes);
app.use('/questoes', apiKey, questoesRoutes);
app.use('/videos', apiKey, videosRoutes);
app.use('/vocabulario', apiKey, vocabularioRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
