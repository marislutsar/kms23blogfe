<script setup>
import { useUserStore } from '~/store/user';
const auth = useUserStore();
</script>
<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" to="/">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" to="/">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Admin">
                <b-navbar-item tag="router-link" to="/admin/posts">
                    Posts
                </b-navbar-item>
                <b-navbar-item tag="router-link" to="/admin/tags">
                    Tags
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-navbar-item tag="div" v-if="!auth.user">
                <div class="buttons">
                    <NuxtLink class="button is-primary" to="/register">
                        <strong>Sign up</strong>
                    </NuxtLink>
                    <NuxtLink class="button is-light" to="/login">
                        Log in
                    </NuxtLink>
                </div>
            </b-navbar-item>
            <b-navbar-dropdown :label="auth.user.name" v-else>
                <b-navbar-item @click="auth.logout">
                    Logout
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>