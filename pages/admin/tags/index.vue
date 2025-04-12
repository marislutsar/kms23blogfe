<script setup>
import { useAdminTagsStore } from '~/store/admin-tags';
import axios from 'axios';
let tags = useAdminTagsStore();

let route = useRoute();
let router = useRouter();

router.afterEach((to, from) => {
    if(to.path === '/admin/tags' && !tags.data.length){
        tags.loadAll();
    }
});

if(!tags.data.length){
    tags.loadAll();
}

function deleteTag(id) {
    axios.delete('/api/admin/tags/'+ id).then(response => {
        tags.loadAll();
    });
}
</script>
<template>
        <div class="container">
            <section>
                <NuxtLink class="button is-primary" to="/admin/tags/create">New Tag</NuxtLink>
                <b-table striped
                    hoverable
                    :loading="tags.loading"
                    sortable
                    :data="tags.data"
                    >
                    <b-table-column v-for="column in tags.columns" :key="column.field" :field="column.field" :label="column.label" v-slot="props">
                        {{ props.row[column.field] }}
                    </b-table-column>
                    <b-table-column label="Actions" v-slot="props">
                        <div class="field has-addons">
                            <p class="control">
                                <b-button type="is-info" tag="router-link"
                                :to="`/admin/tags/${props.row.id}`">View</b-button>
                            </p>
                            <p class="control">
                                <b-button type="is-warning" tag="router-link"
                                :to="`/admin/tags/${props.row.id}/edit`">Edit</b-button>
                            </p>
                            <p class="control">
                                <b-button type="is-danger" @click="deleteTag(props.row.id)">Delete</b-button>
                            </p>
                        </div>
                    </b-table-column>
                </b-table>
            </section>
        </div>
</template>