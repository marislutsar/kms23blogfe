import axios from 'axios';


export const useAdminPostsStore = defineStore('adminPostsStore', {
    state: () => ({
      post: null,
      editForm: {
        title: null,
        body: null,
      },
      data: [],
      pagination: {
        
      },
      columns: [
        {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true,
            sortable: true
        },
        {
            field: 'title',
            label: 'Title',
            sortable: true
        },
        {
            field: 'user.name',
            label: 'Author',
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
        loadPage(page: Number){
            this.loading = true;
            axios.get('/api/admin/posts', {
                params: {
                    page, // page: page
                }
            }).then(response => {
                console.log(response.data.data);
                let {data, ...pagination } = response.data;
                this.data = data;
                this.pagination = pagination;
                console.log(this.pagination);
                this.loading = false;
            });
        },
        loadPost(slug: String){
            axios.get('/api/admin/posts/' + slug).then(response => {
                this.post = response.data;
                this.editForm.title = response.data.title;
                this.editForm.body = response.data.body;
            });
        }
    }
});