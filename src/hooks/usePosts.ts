import { useQuery } from "@tanstack/react-query"
import type { Post } from "../types/post"

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const posts: Post[] = await response.json()

  const startDate = new Date(2023, 0, 1) 
  const endDate = new Date() 

  return posts.map((post) => ({
    ...post,
    date: generateRandomDate(startDate, endDate),
  }))
}

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })
}

