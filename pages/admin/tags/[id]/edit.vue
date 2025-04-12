<script setup>
import axios from 'axios';
import { useAdminTagsStore } from '~/store/admin-tags';
let tags = useAdminTagsStore();
const route = useRoute();
tags.loadTag(route.params.id);
let router = useRouter();

async function update(){
    await axios.put('/api/admin/tags/' + route.params.id, tags.editForm);
    await tags.loadAll();
    router.push('/admin/tags');
}
</script>
<template>
      <div class="container">
        <section>
            <div class="card">
                <div class="card-content content" v-if="tags.tag">
                    <h1>Update Tag</h1>
                    
                    <b-field label="Name">
                        <b-input v-model="tags.editForm.name" type="text" maxlength="255"></b-input>
                    </b-field>

                    <b-button type="is-primary" @click="update">Update</b-button>
                </div>
            </div>
        </section>
    </div>
</template>