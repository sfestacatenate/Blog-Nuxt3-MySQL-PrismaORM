<script lang="ts" setup>
import { useAuthStore } from "~/pinia/auth";
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const token = useCookie('token'); // get token from cookies
console.log(token);
if (token.value) {
    authenticated.value = true;
}

function logOut() {
    logUserOut();
    router.push('/');
}

</script>

<template>
    <nav class="bg-gray-900 text-white py-5">
        <div class="container flex justify-between">
            <NuxtLink to="/" class="logo text-xl font-bold">Custom Blog</NuxtLink>
            <ul class="inline-flex gap-2">
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink v-if="!authenticated" to="/login">Login</NuxtLink>
                    <NuxtLink v-else to="/dashboard">Dashboard</NuxtLink>
                </li>
                <li>
                    <NuxtLink v-if="authenticated" class="cursor-pointer" @click.prevent="logOut">Logout</NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>~/pinia/auth