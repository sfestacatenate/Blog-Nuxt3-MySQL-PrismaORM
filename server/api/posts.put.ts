import { filePath, generateSlugFromTitle, parseMultipart, saveFile } from "~/utils/server-utils";
import { updatePost } from "../services/posts-service";
import { Post } from "@prisma/client";

export default defineEventHandler(async(event) => {
    const body = await readMultipartFormData(event);
    const parsedBody = parseMultipart(body);

    if (parsedBody.file) {
        const savedFileName = await saveFile(parsedBody.file);
    }
    let post: Post | null = null;

    if(!parsedBody.file) {
        post = await updatePost(parseInt(parsedBody.id), {
            title: parsedBody.title,
            content: parsedBody.content,
            published: (parsedBody.published.toLowerCase() === 'true'),
            slug: generateSlugFromTitle(parsedBody.title),
        });
    } else {
        post = await updatePost(parseInt(parsedBody.id), {
            title: parsedBody.title,
            content: parsedBody.content,
            published: (parsedBody.published.toLowerCase() === 'true'),
            slug: generateSlugFromTitle(parsedBody.title),
            imageUrl: filePath + parsedBody.file.filename
        });
    }

    return {
         post
     }
})