<script setup>
import axios from 'axios';
let route = useRoute();
let post = ref(null);
axios.get('http://127.0.0.1:8000/api/posts/' + route.params.slug).then(response => {
    console.log(response.data);
    post.value = response.data;
});
</script>

<template>
    <div class="container">
        <section class="section">
            <PostCard :post="post" full v-if="post"></PostCard>
        </section>
    </div>
</template>