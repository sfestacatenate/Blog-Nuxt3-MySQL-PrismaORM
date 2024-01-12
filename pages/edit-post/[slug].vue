<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const { params } = useRoute();
const { data: fetchedPost, error } = await useFetch<any>(`/api/posts?slug=${params.slug}`);

let postTitle = '';
let postContent = '';
let postId = 0;
let published = false;

const fileInputRef = ref<any>(null);
const previewImage = ref<string | null>(null);

if (fetchedPost.value.post && fetchedPost.value.post.imageUrl) {
  previewImage.value = `${fetchedPost.value.post.imageUrl}`;
}

const handleFileChange = () => {
  const fileInput = fileInputRef.value;
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Imposta l'URL dell'anteprima dell'immagine
      previewImage.value = e.target?.result as string;
    };

    // Leggi il file come URL dati
    reader.readAsDataURL(fileInput.files[0]);
  }
};

if (fetchedPost.value.post) {
  postTitle = fetchedPost.value.post.title;
  postContent = fetchedPost.value.post.content;
  postId = fetchedPost.value.post.id;
  published = fetchedPost.value.post.published;
}

const createOrUpdatePost = async () => {
  try {
    const postData = {
      title: postTitle,
      content: postContent,
      id: postId > 0 ? postId : null,
      published
    };

    let apiMethod = 'POST';
    if (params.slug !== "new") {
      apiMethod = 'PUT';
    }

    // Creazione di un oggetto FormData per inviare dati e file contemporaneamente
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('id', postData.id?.toString() ?? '');
    formData.append('published', postData.published.toString());

    // Se un file è stato selezionato, lo aggiungiamo alla FormData
    if (fileInputRef.value.files[0]) {
      formData.append('file', fileInputRef.value.files[0]);
    }

    const response = await fetch('/api/posts', {
      method: apiMethod,
      body: formData,
    });

    if (response.ok) {
      router.push('/dashboard');
    }
  } catch (err) {
    console.error('Errore durante la creazione/modifica del post:', err);
  }
};
</script>

<template>
  <div class="text-center mt-10">
    <h1 class="text-4xl mb-3 font-bold">{{ fetchedPost.post ? 'Edit' : 'Create' }} Post</h1>
    <form class="max-w-sm mx-auto" @submit.prevent="createOrUpdatePost">
      <div class="mb-5">
        <input type="file" ref="fileInputRef" @change="handleFileChange" class="block w-full p-2.5" />
        <!-- Mostra l'anteprima dell'immagine -->
        <img v-if="previewImage" :src="previewImage" alt="Preview" class="mt-2 w-48" />
      </div>
      <div class="mb-5">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white">Post Title</label>
        <input v-model="postTitle"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required />
      </div>
      <div class="mb-5">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white">Post Content</label>
        <textarea v-model="postContent" rows="14"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <div class="mb-5 flex items-start">
        <div class="flex items-center h-5">
          <input type="checkbox" v-model="published"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
        </div>
        <div class="ml-3 text-sm">
          <label class="font-medium text-gray-900 dark:text-white">Published</label>
        </div>
      </div>
      <button type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ fetchedPost.post ? 'Update' : 'Create' }} Post
      </button>
    </form>
  </div>
</template>
