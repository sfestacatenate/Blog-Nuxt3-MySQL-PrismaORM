import { type MultiPartData } from 'h3';
import { promises as fsPromises } from 'node:fs';
import { join } from 'node:path';

export const filePath = "/upload/";

export function generateSlugFromTitle(title: string): string {
    return title.toLowerCase().replace(/ /g, "-");
}

const FILE_KEYS = ['name', 'filename', 'type', 'data'];

const isFile = (data: MultiPartData) => {
    return Object.keys(data).filter((key) => FILE_KEYS.indexOf(key) !== -1).length === FILE_KEYS.length;
};

export const parseMultipart = (data?: MultiPartData[]) => {
    const arr = (Array.isArray(data) ? data : []) as MultiPartData[];
    const result = arr.reduce((prev: Record<string, any>, curr) => {
        prev[String(curr.name)] = isFile(curr) ? curr : curr.data.toString('utf8');
        return prev;
    }, {});

    return result;
};

export const saveFile = async (file: MultiPartData) => {
    //const { _mime, ext } = String(file.type).split('/');
    //const fileName = randomUUID() + '.' + ext;
    const fileName = file.filename;

    // Ottieni la directory di lavoro corrente (root del progetto)
    const projectRoot = process.cwd();
    
    // Costruisci il percorso completo del file nella cartella /public/upload
    const filePath = join(projectRoot, 'public', 'upload', fileName);

    await fsPromises.writeFile(filePath, file.data);
    return fileName;
}