<script setup>
import axios from 'axios';
let router = useRouter();
let form = ref({
    title: '',
    body: '',
    images: [],
    tags: [],
});
let tags = ref(null);
let filteredTags = ref(null);
const res = await axios.get('/api/tags');
tags.value = res.data;
filteredTags.value = res.data;
let selectedTags = ref([]);

function create() {
    form.value.tags = selectedTags.value.map(tag => tag.id);
    axios.post('/api/admin/posts', form.value, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response.data);
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
                            <b-taginput v-model="selectedTags" :data="filteredTags" autocomplete
                                field="name" icon="label"
                                placeholder="Add a tag" @typing="getFilteredTags">
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