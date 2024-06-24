import { v4 as uuidv4 } from 'uuid';
export default async function createUUID(): Promise<string> {
    return uuidv4();
}
