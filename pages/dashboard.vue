<script lang="ts" setup>

const { data: fetchedPosts, error } = await useFetch<any>('/api/posts?isDashboard=true');

const router = useRouter();

function createPost() {
    router.push(`/edit-post/new`);
}
</script>
<template>
    <div>
        <div class="flex justify-center text-center mt-10">
            <h1 class="text-4xl mb-3 font-bold">Admin Dashboard</h1>
            <button class="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                @click="createPost">Create
                Post</button>
        </div>
        <div class="container grid grid-cols-3 gap-5 mt-10">
            <BlogCard v-for="post in fetchedPosts.posts" :key="post.id" :post="post" :userType="'admin'" />
        </div>
    </div>
</template>