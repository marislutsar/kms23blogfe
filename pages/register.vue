<script setup>

    import { useUserStore } from '~/store/user';
    let auth = useUserStore();
    let router = useRouter();
    let form = ref({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    
    function register() {
        let {name, email, password, password_confirmation} = form.value;
        auth.register(name, email, password, password_confirmation);
        router.push('/');
    }
</script>

<template>
    <div class="container">
        <section>
            <div class="card">
                <div class="card-content content">
                    <h1>Register</h1>
                    <b-field label="Name">
                        <b-input v-model="form.name"></b-input>
                    </b-field>

                    <b-field label="Email">
                        <b-input v-model="form.email" type="email" maxlength="255"></b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input v-model="form.password" type="password" maxlength="255"></b-input>
                    </b-field>

                    <b-field label="Confirm Password">
                        <b-input v-model="form.password_confirmation" type="password"></b-input>
                    </b-field>
                    <b-button type="is-primary" @click="register">Register</b-button>
                </div>
            </div>
        </section>
    </div>
</template>