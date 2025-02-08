<script setup>
import axios from 'axios';
let posts = ref([]);
axios.get('http://127.0.0.1:8000/api/posts').then(response => {
  console.log(response.data.data);
  posts.value = response.data.data;
});
</script>

<template>
  <div class="container">
    <NuxtRouteAnnouncer />
    <section class="section">
      <b-button type="is-primary">Primary</b-button>
      <ul>
        <li v-for="post in posts">{{ post.title }}</li>
      </ul>
    </section>
  </div>
</template>
