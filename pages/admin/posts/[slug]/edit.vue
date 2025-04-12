<script setup>
import axios from 'axios';
import { useAdminPostsStore } from '~/store/admin-posts';
let posts = useAdminPostsStore();
const route = useRoute();
posts.loadPost(route.params.slug);
let router = useRouter();
let postsStore = useAdminPostsStore();

function update(){
    axios.put('/api/admin/posts/'+ route.params.slug, posts.editForm).then(response => {
        console.log(response.data);
        postsStore.loadPage(1); // refresh listing view after updating post
        router.push('/admin/posts');
    });
}
</script>
<template>
      <div class="container">
        <section>
            <div class="card">
                <div class="card-content content" v-if="posts.post">
                    <h1>Update Post</h1>
                    
                    <b-field label="Title">
                        <b-input v-model="posts.editForm.title" type="text" maxlength="255"></b-input>
                    </b-field>

                    <b-field label="Content">
                        <b-input v-model="posts.editForm.body" type="textarea"></b-input>
                    </b-field>

                    <b-button type="is-primary" @click="update">Update</b-button>
                </div>
            </div>
        </section>
    </div>
</template>