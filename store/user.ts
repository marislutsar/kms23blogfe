import axios from 'axios';

export const useUserStore = defineStore('userStore', {
    state: () => ({
      user: null,
    }),
    actions: {
        async login(email: string, password: string){
            let res = await axios.post('/api/login', {
                email,
                password,
            });
            this.user = res.data;
        },
        async getUser(){
            try {
                let res = await axios.get('/api/user');
                this.user = res.data;
            } catch(error) {
                
            }
        },
        async logout(){
            await axios.post('/api/logout');
            this.user = null;
        },
        async register(name: string, email: string, password: string, password_confirmation: string){
            let res = await axios.post('/api/register', {
                name,
                email,
                password,
                password_confirmation,
            });
            this.user = res.data;
        }
    }
});