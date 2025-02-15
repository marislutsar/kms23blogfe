<script setup>
import axios from 'axios';
let posts = ref([]);
let pagination = ref({});
axios.get('http://127.0.0.1:8000/api/posts').then(response => {
    console.log(response.data.data);
    posts.value = response.data.data;
    pagination.value = response.data;
    delete pagination.value.data;
    console.log(pagination.value);
});

function loadPage(page){
    axios.get('http://127.0.0.1:8000/api/posts', {
        params: {
            page, // page: page
        }
    }).then(response => {
    console.log(response.data.data);
    posts.value = response.data.data;
    pagination.value = response.data;
    delete pagination.value.data;
    console.log(pagination.value);
    });
}
</script>

<template>
    <div class="container">
        <section class="section">
            <b-pagination 
                :range-before="3"
                :range-after="3"
                :total="pagination.total"
                :per-page="pagination.per_page"
                order="is-centered"
                v-model="pagination.current_page"
                @change="loadPage">
            </b-pagination>
            <div class="columns is-multiline">
                <div class="column is-one-quarter" v-for="post in posts">
                    <PostCard :post="post"></PostCard>
                </div>
            </div>
        </section>
    </div>
</template>
