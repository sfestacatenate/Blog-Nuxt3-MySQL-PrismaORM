import { Post } from "@prisma/client";
import { createPost } from "../services/posts-service";
import { filePath, generateSlugFromTitle, parseMultipart, saveFile } from "~/utils/server-utils";

export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event);
    const parsedBody = parseMultipart(body);

    if (parsedBody.file) {
        const savedFileName = await saveFile(parsedBody.file);
    }

    let post: Post | null = null;
    if(parsedBody.title) {
        post = await createPost({
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