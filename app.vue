<script setup>
    import axios from 'axios';
    import { useUserStore } from '~/store/user';

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    const runtimeConfig = useRuntimeConfig();
    axios.defaults.baseURL = runtimeConfig.public.api.baseUrl;

    await axios.get('/sanctum/csrf-cookie');
    
    let auth = useUserStore();
    auth.getUser();
</script>

<template>
    <NuxtRouteAnnouncer />
    <MainNav></MainNav>
    <NuxtPage></NuxtPage>
</template>
