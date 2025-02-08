<script setup>
import axios from 'axios';
let posts = ref([]);
axios.get('http://127.0.0.1:8000/api/posts').then(response => {
  console.log(response.data.data);
  posts.value = response.data.data;
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <ul>
      <li v-for="post in posts">{{ post.title }}</li>
    </ul>
  </div>
</template>
