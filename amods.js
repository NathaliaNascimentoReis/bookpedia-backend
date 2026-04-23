/*
 *
 * NUNCA EDITE ESTE ARQUIVO
 *
 *
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { apagar } from './support.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = {
    title: (msg) => console.log(`\n\x1b[36m\x1b[1m┌── ${msg} ──┐\x1b[0m`),
    action: (msg) => console.log(`\x1b[36m→ ${msg}\x1b[0m`),
    success: (msg) => console.log(`\x1b[32m✓ ${msg}\x1b[0m`),
    info: (msg) => console.log(`\x1b[90m• ${msg}\x1b[0m`),
    error: (msg) => console.log(`\x1b[31m✗ ${msg}\x1b[0m`),
    warning: (msg) => console.log(`\x1b[33m⚠ ${msg}\x1b[0m`),
};

function perguntarUsuario(pergunta, valorPadrao = '') {
    return new Promise((resolve) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const msgPadrao = valorPadrao ? ` (padrão: ${valorPadrao})` : '';
        rl.question(`\x1b[36m> ${pergunta}${msgPadrao}: \x1b[0m`, (resposta) => {
            rl.close();
            resolve(resposta.trim() || valorPadrao);
        });
    });
}

function runCommand(command) {
    return new Promise((resolve, reject) => {
        log.action(`Executando: ${command}`);

        const proc = spawn(command, [], {
            cwd: __dirname,
            shell: true,
            stdio: 'inherit',
        });

        proc.on('exit', (code) => {
            if (code === 0) {
                log.success(`Comando finalizado: ${command}`);
                resolve();
            } else {
                log.error(`Comando falhou com código: ${code}`);
                reject(new Error(`Command failed with code ${code}`));
            }
        });

        proc.on('error', (err) => {
            log.error(`Erro ao executar comando: ${err.message}`);
            reject(err);
        });
    });
}

async function coletarInformacoes() {
    console.log('');
    console.log('\x1b[33m\x1b[1m╔══════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[33m\x1b[1m║   CONFIRME ANTES DE CONTINUAR:               ║\x1b[0m');
    console.log('\x1b[33m\x1b[1m║                                              ║\x1b[0m');
    console.log('\x1b[33m\x1b[1m║   → prisma/schema.prisma                     ║\x1b[0m');
    console.log('\x1b[33m\x1b[1m║   → prisma/seed.js                           ║\x1b[0m');
    console.log('\x1b[33m\x1b[1m╚══════════════════════════════════════════════╝\x1b[0m');
    console.log('');

    const ajustouSchema = await perguntarUsuario('Você ajustou o prisma/schema.prisma? (s/n)', 'n');
    const ajustouSeed = await perguntarUsuario('Você ajustou o prisma/seed.js? (s/n)', 'n');

    if (ajustouSchema.toLowerCase() !== 's' || ajustouSeed.toLowerCase() !== 's') {
        console.log('');
        console.log('\x1b[33m\x1b[1m╔══════════════════════════════════════════════╗\x1b[0m');
        console.log('\x1b[33m\x1b[1m║   Lembre-se de ajustar antes de rodar:       ║\x1b[0m');
        console.log('\x1b[33m\x1b[1m║     → prisma/schema.prisma                   ║\x1b[0m');
        console.log('\x1b[33m\x1b[1m║     → prisma/seed.js                         ║\x1b[0m');
        console.log('\x1b[33m\x1b[1m║                                              ║\x1b[0m');
        console.log('\x1b[33m\x1b[1m║     Depois execute novamente:                ║\x1b[0m');
        console.log('\x1b[33m\x1b[1m║                                              ║\x1b[0m');
        console.log('\x1b[33m\x1b[1m║                       node amods.js          ║\x1b[0m');
        console.log('\x1b[33m\x1b[1m╚══════════════════════════════════════════════╝\x1b[0m');
        console.log('');
        process.exit(0);
    }

    console.log('');
    console.log('\x1b[33m\x1b[1m╔══════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[33m\x1b[1m║         INFORMAÇÕES DO PROJETO               ║\x1b[0m');
    console.log('\x1b[33m\x1b[1m╚══════════════════════════════════════════════╝\x1b[0m');
    console.log('');
    const authorNome = await perguntarUsuario('Nome do DEV (author do projeto)', '');
    const descricaoProjeto = await perguntarUsuario('Descrição do projeto/atividade', '');

    console.log('');
    console.log('\x1b[33m\x1b[1m╔══════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[33m\x1b[1m║      CONFIGURAÇÃO DO BANCO DE DADOS          ║\x1b[0m');
    console.log('\x1b[33m\x1b[1m╚══════════════════════════════════════════════╝\x1b[0m');
    console.log('');
    const nomeUsuario = await perguntarUsuario('Usuário do PostgreSQL', 'postgres');
    const senha = await perguntarUsuario('Senha do PostgreSQL', 'amods');
    const porta = await perguntarUsuario('Porta do PostgreSQL', '7777');
    const nomeBanco = await perguntarUsuario(
        'Nome do banco (adicione _db no final)',
        'meu_projeto_db',
    );

    console.log('');

    return {
        ajustouSchema,
        ajustouSeed,
        authorNome,
        descricaoProjeto,
        nomeUsuario,
        senha,
        porta,
        nomeBanco,
    };
}

async function atualizarPackageJson(authorNome, descricaoProjeto) {
    log.title('Atualizando package.json');
    const packagePath = path.join(__dirname, 'package.json');

    try {
        let packageContent = { dependencies: {}, devDependencies: {} };

        if (fs.existsSync(packagePath)) {
            packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        }

        const nomeDaPasta = path.basename(__dirname);

        const packageJsonAtualizado = {
            name: nomeDaPasta,
            version: '1.0.0',
            description: descricaoProjeto,
            main: 'server.js',
            type: 'module',
            private: true,
            scripts: {
                dev: 'cls && nodemon src/server.js',
            },
            keywords: ['SENAI', 'NodeJS', 'Express', 'API', 'Prisma', 'PostgreSQL'],
            author: authorNome,
            license: 'MIT',
            dependencies: packageContent.dependencies || {},
            devDependencies: packageContent.devDependencies || {},
        };

        fs.writeFileSync(
            packagePath,
            JSON.stringify(packageJsonAtualizado, null, 2) + '\n',
            'utf8',
        );
        log.success('package.json atualizado com sucesso');
    } catch (erro) {
        log.error(`Erro ao atualizar package.json: ${erro.message}`);
    }
}

async function atualizarEnv(config) {
    log.title('Atualizando arquivo .env');
    const envPath = path.join(__dirname, '.env');
    const envContent = `# Servidor\nPORT=3000\n\n# Banco de dados local\nDATABASE_URL="postgresql://${config.nomeUsuario}:${config.senha}@localhost:${config.porta}/${config.nomeBanco}"`;
    fs.writeFileSync(envPath, envContent, 'utf8');
    log.success('.env atualizado com sucesso');
}

async function configurarBancoDados() {
    log.title('Configurando banco de dados');
    log.info('Criando banco e tabelas...');
    await runCommand('npx prisma migrate dev --name init');

    log.info('Gerando cliente Prisma...');
    await runCommand('npx prisma generate');

    log.info('\n\nPopulando banco de dados...');
    await runCommand('node prisma/seed.js');
}

async function deletarSegundo() {
    log.title('Deletando arquivos/pastas da segunda etapa');

    if (!Array.isArray(apagar.segundo)) {
        log.info('Nenhum item configurado em apagar.segundo');
        return;
    }

    for (const item of apagar.segundo) {
        const caminho = path.join(__dirname, item);
        try {
            if (fs.existsSync(caminho)) {
                const stats = fs.statSync(caminho);
                if (stats.isDirectory()) {
                    fs.rmSync(caminho, { recursive: true, force: true });
                    log.success(`Pasta removida: ${item}`);
                } else {
                    fs.unlinkSync(caminho);
                    log.success(`Arquivo removido: ${item}`);
                }
            } else {
                log.info(`Não encontrado: ${item}`);
            }
        } catch (erro) {
            log.error(`Erro ao deletar ${item}: ${erro.message}`);
        }
    }
}

async function main() {
    try {
        const config = await coletarInformacoes();
        await atualizarPackageJson(config.authorNome, config.descricaoProjeto);
        await atualizarEnv(config);
        await configurarBancoDados();
        await deletarSegundo();

        console.log('');
        console.log('\x1b[32m\x1b[1m╔══════════════════════════════════════════════╗\x1b[0m');
        console.log('\x1b[32m\x1b[1m║      PARABÉNS - ETAPA 2 CONCLUÍDA!           ║\x1b[0m');
        console.log('\x1b[32m\x1b[1m║                                              ║\x1b[0m');
        console.log('\x1b[32m\x1b[1m║   Comandos úteis:                            ║\x1b[0m');
        console.log('\x1b[32m\x1b[1m║                   → npx prisma studio        ║\x1b[0m');
        console.log('\x1b[32m\x1b[1m║                   → npm run dev              ║\x1b[0m');
        console.log('\x1b[32m\x1b[1m╚══════════════════════════════════════════════╝\x1b[0m');
        console.log('');
    } catch (erro) {
        log.error(`Erro no processo: ${erro.message}`);
        process.exit(1);
    }
}

main();
