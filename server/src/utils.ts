import jwt from "jsonwebtoken";

const getTokenPayload = (token : string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

export const getUserId = (req : any) => {
    if (req){
        const authToken = req.headers.authorization;

        if (!authToken){
            throw new Error("No Token Found")
        }

        return getTokenPayload(authToken);
    } else {
        throw new Error('Not authenticated');
    }
}

export const generateRandomNumber = (length : number) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
