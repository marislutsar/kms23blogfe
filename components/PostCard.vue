<script setup>
defineProps({
    post: Object,
    full: Boolean
});
import {DateTime} from 'luxon';

const isoStringToRelativeTime = isoString => DateTime.fromISO(isoString).toRelative();

</script>

<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">{{ post.title }}</p>
        </header>
        <div class="card-image" v-if="post.images.length === 1">
            <figure class="image is-4by3">
                <img :src="post.images[0].url" alt="Placeholder image" />
            </figure>
        </div>
        <b-carousel :autoplay="false" v-else-if="post.images.length > 1">
            <b-carousel-item v-for="image in post.images">
                <figure class="image is-4by3">
                    <img :src="image.url" alt="Placeholder image" />
                </figure>
            </b-carousel-item>
        </b-carousel>
        <div class="card-content">
            <div class="content">
                <p v-if="full">{{ post.body }}</p>
                <p v-else>{{ post.snippet }}</p>
                <p>{{ post.user.name }}</p>
                <time datetime="{{ post.created_at }}">{{ isoStringToRelativeTime(post.created_at) }}</time>
            </div>
        </div>
        <div class="spacer"></div>
        <footer class="card-footer">
            <NuxtLink :to="'/post/' + post.slug" class="card-footer-item" v-if="!full">Read more</NuxtLink>
        </footer>
    </div>
</template>

<style scoped>
    .card {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
    .spacer {
        flex-grow:1;
    }

</style>