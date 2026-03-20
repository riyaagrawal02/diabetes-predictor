import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
    }
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email;
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;