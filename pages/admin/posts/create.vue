<script setup>
import axios from 'axios';
import { useAdminPostsStore } from '~/store/admin-posts';
let router = useRouter();
let postsStore = useAdminPostsStore();
let form = ref({
    title: '',
    body: '',
    images: [],
    tags: [],
});
let tags = ref(null);
let filteredTags = ref(null);
// Use admin endpoint for tags
const res = await axios.get('/api/admin/tags');
tags.value = res.data;
filteredTags.value = res.data;
let selectedTags = ref([]);

// Modified handleEnter to use admin tags endpoint
async function handleEnter(event) {
    const value = event.target.value.trim();
    if(value) {
        const response = await axios.post('/api/admin/tags', { name: value });
        const newTag = response.data;
        selectedTags.value.push(newTag);
        if (!tags.value.find(t => t.id === newTag.id)) {
            tags.value.push(newTag);
        }
        event.target.value = '';
    }
}

function create() {
    let formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('body', form.value.body);
    // Map tags so that if tag has no id, use its name; defaults to empty array if not provided
    form.value.tags = selectedTags.value.length ? selectedTags.value.map(tag => tag.id || tag.name) : [];
    
    // Append each tag as an array field
    form.value.tags.forEach(tag => {
        formData.append('tags[]', tag);
    });
    
    for (let i = 0; i < form.value.images.length; i++) {
        formData.append('images[]', form.value.images[i]);
    }

    axios.post('/api/admin/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response.data);
        postsStore.loadPage(1); // refresh listing view after creating new post
        router.push('/admin/posts');
    });
}
function deleteDropFile(index) {
    form.value.images.splice(index, 1)
}

function getFilteredTags(text){
    filteredTags.value = tags.value.filter(tag => tag.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0)
}
</script>
<template>
    <div class="container">
        <section>
            <div class="card">
                <div class="card-content content">
                    <h1>New Post</h1>

                    <b-field label="Title">
                        <b-input v-model="form.title" type="text" maxlength="255"></b-input>
                    </b-field>

                    <b-field label="Content">
                        <b-input v-model="form.body" type="textarea"></b-input>
                    </b-field>
                    <section>
                        <b-field label="Enter some tags">
                            <!-- Added handleEnter for new tags -->
                            <b-taginput v-model="selectedTags" :data="filteredTags" autocomplete
                                field="name" icon="label"
                                placeholder="Add a tag" @typing="getFilteredTags" @keyup.enter.native="handleEnter">
                            </b-taginput>
                        </b-field>
                    </section>
                    <section>
                        <b-field>
                            <b-upload v-model="form.images" multiple drag-drop>
                                <section class="section">
                                    <div class="content has-text-centered">
                                        <p>
                                            <b-icon icon="upload" size="is-large">
                                            </b-icon>
                                        </p>
                                        <p>Drop your files here or click to upload</p>
                                    </div>
                                </section>
                            </b-upload>
                        </b-field>

                        <div class="tags">
                            <span v-for="(file, index) in form.images" :key="index" class="tag is-primary">
                                {{ file.name }}
                                <button class="delete is-small" type="button" @click="deleteDropFile(index)">
                                </button>
                            </span>
                        </div>
                    </section>
                    <b-button type="is-primary" @click="create">Create</b-button>
                </div>
            </div>
        </section>
    </div>
</template>
