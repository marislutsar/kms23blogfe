<script setup>
import axios from 'axios';
let router = useRouter();
let form = ref({
    name: '',
});

function create() {
    axios.post('/api/admin/tags', form.value).then(response => {
        router.push('/admin/tags');
    });
}
</script>
<template>
    <div class="container">
        <section>
            <div class="card">
                <div class="card-content content">
                    <h1>New Tag</h1>
                    
                    <b-field label="Name">
                        <b-input v-model="form.name" type="text" maxlength="255"></b-input>
                    </b-field>

                    <b-button type="is-primary" @click="create">Create</b-button>
                </div>
            </div>
        </section>
    </div>
</template>