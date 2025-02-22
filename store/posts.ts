import axios from 'axios';


export const usePostsStore = defineStore('postsStore', {
    state: () => ({
      data: [],
      pagination: {
        
      }
    }),
    actions: {
        loadPage(page: Number){
            axios.get('http://127.0.0.1:8000/api/posts', {
                params: {
                    page, // page: page
                }
            }).then(response => {
                console.log(response.data.data);
                let {data, ...pagination } = response.data;
                this.data = data;
                this.pagination = pagination;
                console.log(this.pagination);
            });
        },
    }
});