import jwt from 'jsonwebtoken';

const jwtAuthMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        //verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user informaton to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Invalid token" });
    }
};

const generateToken = (userdata) => {
    //Generate a new JWT token using user data
    return jwt.sign(userdata, process.env.JWT_SECRET);

    //if we wwant to add Expiery to the token, we can add 3rd parameter "expiresIn" in seconds
    // return jwt.sign(userdata, process.env.JWT_SECRET, {expiresIn : 3000});
}


export { jwtAuthMiddleWare, generateToken };