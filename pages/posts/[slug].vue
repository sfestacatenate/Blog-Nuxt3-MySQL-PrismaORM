<script lang="ts" setup>
import { useRoute } from 'vue-router';
const { params } = useRoute();

const { data: fetchedPost, error } = await useFetch<any>(`/api/posts?slug=${params.slug}`);

</script>
<template>
    <PageHeader v-if="fetchedPost.post" :title="fetchedPost.post.title" :imageUrl="fetchedPost.post.imageUrl"
        :date="fetchedPost.post.createdAt"> </PageHeader>
    <section class="py-10">
        <div class="container">
            <div class="flex flex-wrap gap-5">
                <div v-if="fetchedPost.post" class="flex items-center justify-center py-2 px-4">
                    <span>{{ fetchedPost.post.content }}</span>
                </div>
            </div>
        </div>
    </section>
</template>