import axios from 'axios';

export const useAdminTagsStore = defineStore('adminTagsStore', {
    state: () => ({
      tag: null,
      editForm: {
        name: null,
      },
      data: [],
      columns: [
        {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true,
            sortable: true
        },
        {
            field: 'name',
            label: 'Name',
            sortable: true
        },
        {
            field: 'created_at',
            label: 'Created',
            centered: true,
            sortable: true
        },
        {
            field: 'updated_at',
            label: 'Updated',
            centered: true,
            sortable: true
        }
      ],
      loading: false
    }),
    actions: {
        loadAll(){
            this.loading = true;
            return axios.get('/api/admin/tags').then(response => {
                this.data = response.data;
                this.loading = false;
            });
        },
        loadTag(id: Number){
            return axios.get('/api/admin/tags/' + id).then(response => {
                this.tag = response.data;
                this.editForm.name = response.data.name;
            });
        }
    }
});