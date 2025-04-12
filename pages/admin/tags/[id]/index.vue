<script setup>
import { useAdminTagsStore } from '~/store/admin-tags';
let tags = useAdminTagsStore();
const route = useRoute();
tags.loadTag(route.params.id);
</script>

<template>
    <div class="container">
        <section>
            <table class="table is-striped is-hoverable" v-if="tags.tag">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{{ tags.tag.id }}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{{ tags.tag.name }}</td>
                    </tr>
                    <tr>
                        <th>Created at</th>
                        <td>{{ tags.tag.created_at }}</td>
                    </tr>
                    <tr>
                        <th>Updated at</th>
                        <td>{{ tags.tag.updated_at }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>