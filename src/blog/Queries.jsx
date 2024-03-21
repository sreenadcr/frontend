import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./Services";

export function useGetBlogs(){
    return useQuery({
        queryKey:['getBlogs'],
        queryFn:()=>getBlogs()
    })
}