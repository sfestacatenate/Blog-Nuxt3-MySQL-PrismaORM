<script lang="ts" setup>
const { data: fetchedPosts, error } = await useFetch<any>('/api/posts');
</script>
<template>
    <main>
        <section class="hero bg-gray-100 py-10">
            <div class="container flex">
                <img src="https://picsum.photos/120/120" alt="immagine di copertina" class="rounded-full">
                <div class="ml-5">
                    <h1 class="text-4xl mb-3 font-bold">Author</h1>
                    <p>
                        Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem
                        Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo
                        tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.
                    </p>
                </div>
            </div>
        </section>
        <section>
            <div class="container grid grid-cols-3 gap-5 mt-10">
                <BlogCard v-for="post in fetchedPosts.posts" :key="post.id" :post="post" />
            </div>
        </section>
    </main>
</template>
