import { useRuntimeConfig } from '#app'
import { useUserStore } from '~/store/user'
import axios from 'axios'

interface Tag {
  id: number;
  name: string;
}

export const useTagsApi = () => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const api = axios.create({
    baseURL: `${config.public.api.baseUrl}/tags`,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  api.interceptors.request.use(
    (config) => {
      if (userStore.user) {
        config.headers.Authorization = `Bearer ${userStore.user.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const fetchTags = async () => {
    const res = await api.get('/')
    return res.data
  }

  const createTag = async (tag: Omit<Tag, 'id'>) => {
    const res = await api.post('/', tag)
    return res.data
  }

  const updateTag = async (id: number, tag: Omit<Tag, 'id'>) => {
    const res = await api.put(`/${id}`, tag)
    return res.data
  }

  const deleteTag = async (id: number) => {
    await api.delete(`/${id}`)
  }

  const fetchTag = async (id: number) => {
    const res = await api.get(`/${id}`)
    return res.data
  }

  return {
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
    fetchTag
  }
}
