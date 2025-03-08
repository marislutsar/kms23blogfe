<script setup>
import axios from 'axios';
let router = useRouter();
 let form = ref({
        title: '',
        body: '',
    });
function create(){
    axios.post('/api/admin/posts', form.value).then(response => {
                console.log(response.data);
                router.push('/admin/posts');
    });
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

                    <b-button type="is-primary" @click="create">Create</b-button>
                </div>
            </div>
        </section>
    </div>
</template>