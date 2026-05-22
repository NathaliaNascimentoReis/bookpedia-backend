// Este arquivo é responsável por configurar e exportar a instância do cliente Supabase, que é usada para interagir com o banco de dados Supabase em toda a aplicação.

import { createClient } from '@supabase/supabase-js';

import 'dotenv/config';

const supabase = createClient(
    process.env.SUPABASE_URL,

    process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default supabase;
