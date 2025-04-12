<script setup>
import { useAdminPostsStore } from '~/store/admin-posts';
let posts = useAdminPostsStore();
const route = useRoute();
posts.loadPost(route.params.slug);

// helper to format dates
const formatDate = (date) => new Date(date).toLocaleString();
</script>

<template>
  <div class="container">
    <section v-if="posts.post">
      <div class="card">
        <!-- Post header image -->
        <div class="card-image" v-if="posts.post.display_image && posts.post.display_image.length">
          <figure class="image is-4by3">
            <img :src="posts.post.display_image[0]" alt="Post image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ posts.post.title }}</p>
              <p class="subtitle is-6">
                by {{ posts.post.user?.name }} ({{ posts.post.user?.email }})
              </p>
            </div>
          </div>
          <div class="content">
            {{ posts.post.body }}
            <br>
            <small>ID: {{ posts.post.id }}</small> &bullet;
            <small>Likes: {{ posts.post.likes_count }}</small>
            <br>
            <small>Created at: {{ formatDate(posts.post.created_at) }}</small> &bullet;
            <small>Updated at: {{ formatDate(posts.post.updated_at) }}</small>
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <p>Loading post...</p>
    </section>
  </div>
</template>