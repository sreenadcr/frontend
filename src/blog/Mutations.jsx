import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogs, deleteBlogs, editBlogs } from "./Services";
import { toast } from "sonner";
export function useCreateBlogs() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => createBlogs(data),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
          toast.error("Error Creating Table");
        } else {
          toast.success("Table Created successfully");
          await queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
        }
      },
    });
  }
  
  export function useUpdateBlogs() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => editBlogs(data),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
          toast.error("Error Creating Table");
        } else {
          toast.success("Table Created successfully");
          await queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
        }
      },
    });
  }
  export function useDeleteBlogs() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => deleteBlogs(data),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
          toast.error("Error Creating Table");
        } else {
          toast.success("Table Created successfully");
          await queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
        }
      },
    });
  }