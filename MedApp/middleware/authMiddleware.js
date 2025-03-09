import jwt from 'jsonwebtoken';

// Idealmente, a chave secreta deve vir de variáveis de ambiente
//const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

function verifyToken(req, res, next){
    const token = req.header('Authorization');
    
    // Corrigido: verificar se o token NÃO existe
    if (!token){
        return res.status(401).json({error: 'Access Denied!'});
    }

    try {
        // Corrigido: erro de digitação na chave secreta
        const decoded = jwt.verify(token, 'your-secret-key');
        req.doctorID = decoded.doctorID; // Mantido doctorID para consistência
        next();
    } catch (error) {
        res.status(401).json({error: 'Access Denied!'});
    }
};

export default verifyToken;