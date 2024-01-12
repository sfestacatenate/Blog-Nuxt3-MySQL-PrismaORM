<script lang="ts" setup>
import { formatToItalianDate } from "~/utils/client-utils";

defineProps<{
  title?: string;
  imageUrl?: string;
  date?: string;
}>();
</script>
<template>
  <section class="hero">
    <div class="container flex">
      <img :src="imageUrl" class="w-[125px] h-[125px] mr-8" />
      <div class="self-center">
        <p>{{ formatToItalianDate(date as string) }}</p>
        <h1 v-if="title" class="text-4xl font-bold">{{ title }}</h1>
      </div>
      <slot />
    </div>
  </section>
</template>

<style>
.hero {
  @apply py-16 bg-gray-100;
}
</style>