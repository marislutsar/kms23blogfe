<script setup>
import { useAdminPostsStore } from '~/store/admin-posts';
let posts = useAdminPostsStore();
const route = useRoute();
posts.loadPost(route.params.slug);
</script>

<template>
    <div class="container">
        <section>
            <table class="table is-striped is-hoverable" v-if="posts.post">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{{ posts.post.id }}</td>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <td>{{ posts.post.title }}</td>
                    </tr>
                    <tr>
                        <th>Content</th>
                        <td>{{ posts.post.body }}</td>
                    </tr>
                    <tr>
                        <th>Created at</th>
                        <td>{{ posts.post.created_at }}</td>
                    </tr>
                    <tr>
                        <th>Updated at</th>
                        <td>{{ posts.post.updated_at }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>