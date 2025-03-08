<script setup>
import { useAdminPostsStore } from '~/store/admin-posts';
let posts = useAdminPostsStore();

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

function sort(event){
    console.log(event);
}
</script>
<template>
        <div class="container">
            <section>
                <NuxtLink class="button is-primary" to="/admin/posts/create">New Post</NuxtLink>
                <b-table striped
                    hoverable
                    paginated
                    :loading="posts.loading"
                    sortable
                    	
                    backend-pagination
                    :data="posts.data"
                    :columns="posts.columns"
                    :range-before="3"
                    :range-after="3"
                    :total="posts.pagination.total"
                    :per-page="posts.pagination.per_page"
                    order="is-centered"
                    :current-page.sync="posts.pagination.current_page"
                    @page-change="changePage"
                    
                    
                    @sort="sort"
                    
                    ></b-table>
            </section>
        </div>
</template>