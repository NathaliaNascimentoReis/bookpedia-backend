export const apiKey = (req, res, next) => {
    const key = req.headers['x-api-key'];

    if (!key || key !== process.env.API_KEY) {
        return res.status(401).json({ error: 'API Key inválida ou ausente.' });
    }
console.log('Passou pelo middleware!');
    next();
};
