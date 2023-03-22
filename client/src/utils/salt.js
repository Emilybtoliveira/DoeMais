import bcrypt from 'bcryptjs';


export const salt = bcrypt.genSaltSync(8);
