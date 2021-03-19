import { customAlphabet } from 'nanoid';

// NanoID Configuration
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6);

export const generateId = (): string => {
    return nanoid();
};
