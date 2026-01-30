import jwt from 'jsonwebtoken';


export const createToken = (
    payload:Record<string, unknown>,
    secret:string,
    expiresIn:string
) => {
    return jwt.sign(payload, secret, {expiresIn:expiresIn as any,});
};


export const verifyToken = (token:string, secret:string) => {
    return jwt.verify(token, secret);
};

export const generateToken = (id:string) => {
    return createToken(
        {id},
        (process.env.JWT_SECRET as string ),
        (process.env.JWT_EXPIRE as string)
    );
};

export const generateRefreshToken = (id:string) => {
    return createToken(
        {id},
        (process.env.JWT_REFRESH_SECRET as string),
        (process.env.JWT_REFRESH_EXPIRE as string)

    );
};