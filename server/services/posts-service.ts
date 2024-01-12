import {Post, PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllPosts() {
    const posts = await prisma.post.findMany();
    return posts;
}

export async function getAllPublishedPosts() {
    const posts = await prisma.post.findMany({
        where: {
            published: true
        }
    });
    return posts;
}

export async function getFirst9PostsByPage(page: number) {
    const posts = await prisma.post.findMany({
        skip: (page - 1) * 9,
        take: 9
    });
    return posts;
}

export async function getPostBySlug(slug: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug: slug
        }
    });
    return post;
}

export async function createPost(postData: any) {
    const post = await prisma.post.create({
        data: postData
    });
    return post;
}

export async function updatePost(id: number, postData: any) {
    const post = await prisma.post.update({
        where: {
            id
        },
        data: postData
    });
    return post;
}

export async function deletePost(id: number) {
    const post = await prisma.post.delete({
        where: {
            id
        }
    });
    return post;
}