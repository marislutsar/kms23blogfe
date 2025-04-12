<script setup>
    import { useUserStore } from '~/store/user';
    let auth = useUserStore();
    let router = useRouter();
    let form = ref({
        email: 'maris7@tptlive.com',
        password: 'password',
    });
    
    async function login(){
        await auth.login(form.value.email, form.value.password);
        router.push('/');
    }
</script>

<template>
    <div class="container">
        <section>
            <div class="card">
                <div class="card-content content">
                    <h1>Login</h1>
                    
                    <b-field label="Email">
                        <b-input v-model="form.email" type="email" maxlength="255"></b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input v-model="form.password" type="password" maxlength="255"></b-input>
                    </b-field>

                    <b-button type="is-primary" @click="login">Login</b-button>
                </div>
            </div>
        </section>
    </div>
</template>