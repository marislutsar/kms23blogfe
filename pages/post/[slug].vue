<script setup>
import axios from 'axios';
import {DateTime} from 'luxon';
let route = useRoute();
let post = ref(null);
let form = ref({
    body: ''
});
axios.get('http://127.0.0.1:8000/api/posts/' + route.params.slug).then(response => {
    console.log(response.data);
    post.value = response.data;
});

const isoStringToRelativeTime = isoString => DateTime.fromISO(isoString).toRelative();

async function comment(){
    let res = await axios.post(`/api/post/${route.params.slug}/comment`, form.value);
    form.value.body = '';
    post.value.comments.unshift(res.data);
}
</script>

<template>
    <div class="container">
        <section class="section">
            <PostCard :post="post" full v-if="post" @like="post.auth_has_liked=!post.auth_has_liked"></PostCard>
        </section>
        <section class="section">
            <div class="card mb-2">
                <div class="card-content">
                    <b-field label="Comment">
                        <b-input v-model="form.body" type="textarea"></b-input>
                    </b-field>
                    <b-button type="is-primary" @click="comment">Comment</b-button>
                </div>
            </div>

            <div v-for="comment in post?.comments" class="card mb-2">
                <div class="card-content">
                    <p>{{ comment.body }}</p>
                    <p>{{ comment.user.name }}</p>
                    <time datetime="{{ comment.created_at }}">{{ isoStringToRelativeTime(comment.created_at) }}</time>
                </div>
            </div>
        </section>
    </div>
</template>