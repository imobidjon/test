export interface Post {
  userId: number
  id: number
  title: string
  body: string
  date: Date
}

export interface PostsResponse {
  data: Post[]
  isLoading: boolean
  isError: boolean
}
