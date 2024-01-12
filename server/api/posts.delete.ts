import { deletePost } from "../services/posts-service";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    let post =  null;

    post = await deletePost(body.id);

    return {
         post
     }
})