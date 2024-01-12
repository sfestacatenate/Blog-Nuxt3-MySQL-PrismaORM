<script lang="ts" setup>
import { useRoute } from 'vue-router';
const {params} = useRoute();

</script>
<template>
    <PageHeader title="tit" />
    <h1>Sono slug: {{ params.slug }}</h1>
</template>