import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;

    const minPasswordLength = 6;

    if (user.email?.length < 1 || user.password?.length < 1) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const regexEmail = /\S+@\S+\.\S+/;
    const regexBoolean = regexEmail.test(user.email);
    if (!regexBoolean || user.password.length < minPasswordLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      console.log('entrou1');
      return res.status(401).json({ message: 'Token not found' });
    }
    // split do token retirando Bearer e o espaço
    const tokenSplited = token.split(' ')[1];

    const validToken = JWT.verify(tokenSplited);
    if (validToken === 'Token must be a valid token') {
      console.log('entrou2');
      return res.status(401).json({ message: validToken });
    }

    console.log('entrou3');
    req.body.userToken = validToken;
    next();
  }
}

export default Validations;
