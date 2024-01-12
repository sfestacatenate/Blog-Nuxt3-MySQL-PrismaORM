import { getAllPosts, getFirst9PostsByPage, getPostBySlug, getAllPublishedPosts } from "../services/posts-service";

export default defineEventHandler(async(event: any) => {
    const { slug, page, isDashboard } = getQuery(event);

    if(slug) {
        const post = await getPostBySlug(slug as string);
        return {
            post
        }
    } else if(page) {
        const posts = await getFirst9PostsByPage(page as number);
        return {
            posts
        }
    } else if(isDashboard) {
        const posts = await getAllPosts();
        return {
            posts
        }
    }

    const posts = await getAllPublishedPosts();
    return {
        posts
    }
})