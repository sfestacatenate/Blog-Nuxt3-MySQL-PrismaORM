<script lang="ts" setup>
import { getFirstCharactersContent, getFirstCharactersTitle, formatToItalianDate, wordsCount } from "~/utils/client-utils";

const props = defineProps({
    post: Object,
    userType: String
})

const router = useRouter();

function updatePost(slug: string) {
    router.push(`/edit-post/${slug}`);
}

async function deletePost(id: number) {
    const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    }).then((res) => {
        refreshNuxtData();
    });
}
</script>
<template>
    <!-- This is an example component -->
    <div class="max-w-lg mx-auto">
        <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 hover:bg-gray-50">
            <NuxtLink :to="`/posts/${post?.slug}`">
                <img class="rounded-t-lg w-[335px] h-[335px]" :src="`${post?.imageUrl}`" alt="">
                <div class="p-5">
                    <p>{{ formatToItalianDate(post?.createdAt) }}</p>
                    <p>Words: {{ wordsCount(post?.content) }}</p>
                    <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{{ getFirstCharactersTitle(post?.title)
                    }}
                    </h5>
                    <p class="font-normal text-gray-700 mb-3">{{ getFirstCharactersContent(post?.content) }}</p>
                </div>
            </NuxtLink>
            <div v-if="userType === 'admin'" class="pb-4 pl-5">
                <button class="z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    @click="updatePost(post?.slug)">
                    Edit
                </button>
                <button class="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    @click="deletePost(post?.id)">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>