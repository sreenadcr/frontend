import React, { useState, useEffect } from "react";
import { Input, Button, Modal } from "antd";
import { useCreateBlogs, useDeleteBlogs, useUpdateBlogs } from "../blog/Mutations";
import { useGetBlogs } from "../blog/Queries";

const { TextArea } = Input;

const Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const blogCreate = useCreateBlogs();
  const blogDelete = useDeleteBlogs();
  const blogUpdate = useUpdateBlogs();
  const getBlogs = useGetBlogs();

  useEffect(() => {
    if (editId !== null) {
        console.log(editId)
      const selectedBlog = getBlogs.data?.data.find((blog) => blog._id === editId);
      console.log(selectedBlog)
      if (selectedBlog) {
        setEditTitle(selectedBlog.title);
        setEditDescription(selectedBlog.description);
      }
    }
  }, [editId, getBlogs.data?.data]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditTitleChange = (value) => {
    setEditTitle(value);
  };

  const handleEditDescriptionChange = (value) => {
    setEditDescription(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: title,
      description: description,
    };
    blogCreate.mutate(data);
    setTitle("");
    setDescription("");
  };

  const handleEdit = (id) => {
    console.log(id)
    setEditId(id);
  };

  const handleUpdate = () => {
    const data = {
      id: editId,
      title: editTitle,
      description: editDescription,
    };
    blogUpdate.mutate(data);
    setEditId(null);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this blog?",
      okButtonProps: { style: { backgroundColor: '#fadb14', borderColor: '#fadb14' } }, // Customize the style of the OK button
      onOk() {
        blogDelete.mutate(id);
      },
    });
  };
  

  return (
<>
<h1 className="bg-blue-700 text-2xl text-white font-bold uppercase p-4 mb-4">Blog</h1>
<h2 className="text-2xl font-bold mb-4 text-center bg-blue-400 p-4 text-white uppercase">Create Blog</h2>

  <form onSubmit={handleSubmit} className="mb-8 mx-auto max-w-md">
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 mb-2">Title:</label>
      <Input id="title" value={title} onChange={handleTitleChange} className="w-full" />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 mb-2">Description:</label>
      <TextArea id="description" value={description} onChange={handleDescriptionChange} className="w-full" />
    </div>
    <div className="text-center">
      <Button type="dashed" htmlType="submit">Submit</Button>
    </div>
  </form>

  <h2 className="text-2xl font-bold mb-4 text-center bg-blue-400 p-4 text-white uppercase">Blog List</h2>
  <div className="grid container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {getBlogs.data?.data?.map((blog) => (
      <div key={blog._id} className="border bg-blue-100 border-gray-200 rounded p-4">
        <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
        <p className="text-gray-700 mb-4">{blog.description}</p>
        <div className="flex justify-center">
          <Button onClick={() => handleEdit(blog._id)} className="mr-2">Edit</Button>
          <Button onClick={() => handleDelete(blog._id)} danger>Delete</Button>
        </div>
      </div>
    ))}
  </div>

  {/* Edit Modal */}
  <Modal
    title="Edit Blog"
    visible={editId !== null}
    onCancel={() => setEditId(null)}
    onOk={handleUpdate}
    okButtonProps={{ style: { backgroundColor: '#fadb14', borderColor: '#fadb14' } }}
    className="max-w-md"
  >
    <div className="mb-4">
      <label htmlFor="editTitle" className="block text-gray-700 mb-2">Title:</label>
      <Input id="editTitle" value={editTitle} onChange={(e) => handleEditTitleChange(e.target.value)} className="w-full" />
    </div>
    <div className="mb-4">
      <label htmlFor="editDescription" className="block text-gray-700 mb-2">Description:</label>
      <TextArea
        id="editDescription"
        value={editDescription}
        onChange={(e) => handleEditDescriptionChange(e.target.value)}
        className="w-full"
      />
    </div>
  </Modal>
</>

  
  
  );
};

export default Blog;
