import express from 'express';
import 'dotenv/config';
import guaraniRoutes from './routes/guaraniRoute.js';
import alternativasRoutes from './routes/alternativasRoute.js';
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
app.use('/obras', guaraniRoutes);
app.use('/alternativas', alternativasRoutes);
app.use('/autores', autoresRoutes);
app.use('/cenarios', cenariosRoutes);
app.use('/curiosidades', curiosidadesRoutes);
app.use('/dicas-de-vestibular', dicasDeVestibularRoutes);
app.use('/enredos', enredosRoutes);
app.use('/livros', livroRoutes);
app.use('/membros', membrosRoutes);
app.use('/movimentos-literarios', movimentosLiterariosRoutes);
app.use('/personagens', personagensRoutes);
app.use('/projetos', projetosRoutes);
app.use('/questoes', questoesRoutes);
app.use('/videos', videosRoutes);
app.use('/vocabulario', vocabularioRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
