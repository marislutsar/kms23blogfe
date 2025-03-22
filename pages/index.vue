<script setup>
import { usePostsStore } from '~/store/posts';
let posts = usePostsStore();
let route = useRoute();
let router = useRouter();

router.afterEach((to, from) => {
    
    if(to.path === '/' && to.query?.page === undefined){
        posts.loadPage(1);
    }
});

let page = route.query.page ?? 1;
if(posts.pagination?.current_page != page){
    posts.loadPage(page);
}

function changePage(page){
    router.push({query: { page: page } })
    posts.loadPage(page);
}


</script>

<template>
    <div class="container">
        <section class="section">
            <b-pagination 
                :range-before="3"
                :range-after="3"
                :total="posts.pagination.total"
                :per-page="posts.pagination.per_page"
                order="is-centered"
                v-model="posts.pagination.current_page"
                @change="changePage">
            </b-pagination>
            <div class="columns is-multiline">
                <div class="column is-one-quarter" v-for="post in posts.data">
                    <PostCard :post="post" @like="post.auth_has_liked=!post.auth_has_liked"></PostCard>
                </div>
            </div>
        </section>
    </div>
</template>
