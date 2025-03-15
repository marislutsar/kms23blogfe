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
const access = (path, object) => {
  return path.split('.').reduce((o, i) => o[i], object)
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
                    
                    :range-before="3"
                    :range-after="3"
                    :total="posts.pagination.total"
                    :per-page="posts.pagination.per_page"
                    order="is-centered"
                    :current-page.sync="posts.pagination.current_page"
                    @page-change="changePage"
                    
                    
                    @sort="sort"
                    
                    >
                    <b-table-column v-for="column in posts.columns" :label="column.label" v-slot="props">
                        {{ access(column.field, props.row) }}
                    </b-table-column>
                    <b-table-column label="Actions" v-slot="props">
                        <div class="field has-addons">
                            <p class="control">
                                <b-button type="is-info" tag="router-link"
                                :to="`/admin/posts/${props.row.slug}`">View</b-button>
                            </p>
                            <p class="control">
                                <b-button type="is-warning" tag="router-link"
                                :to="`/admin/posts/${props.row.slug}/edit`">Edit</b-button>
                            </p>
                            <p class="control">
                                <b-button type="is-danger" tag="router-link"
                                :to="`/admin/posts/${props.row.id}/delete`">Delete</b-button>
                            </p>
                        </div>
                    </b-table-column>
                </b-table>
            </section>
        </div>
</template>