import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../Authentication/UserAuthStore';

const ImprovedBlogEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert focus:outline-none min-h-[300px] p-4 text-gray-200',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      {/* Custom Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-700 bg-gray-900">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-700' : ''
            }`}
        >
          <span className="text-gray-200 font-bold">B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-700' : ''
            }`}
        >
          <span className="text-gray-200 italic">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('underline') ? 'bg-gray-700' : ''
            }`}
        >
          <span className="text-gray-200 underline">U</span>
        </button>
        <select
          value={editor.getAttributes('heading').level || 'paragraph'}
          onChange={(e) => {
            const level = e.target.value;
            if (level === 'paragraph') {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: Number(level) }).run();
            }
          }}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-1"
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bulletList') ? 'bg-gray-700' : ''
            }`}
        >
          <span className="text-gray-200">• List</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('orderedList') ? 'bg-gray-700' : ''
            }`}
        >
          <span className="text-gray-200">1. List</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('blockquote') ? 'bg-gray-700' : ''
            }`}
        >
          <span className="text-gray-200">❝</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('codeBlock') ? 'bg-gray-700' : ''
            }`}
        >
          <span className="text-gray-200">{'</>'}</span>
        </button>
      </div>

      <EditorContent editor={editor} className="bg-gray-800" />

      {/* Global Styles for the editor */}
      <style>{`
        .tiptap {
          padding: 1rem;
        }
        .tiptap:focus {
          outline: none;
        }
        .tiptap h1 {
          font-size: 2em;
          line-height: 1.2;
          margin: 1rem 0;
        }
        .tiptap h2 {
          font-size: 1.5em;
          line-height: 1.3;
          margin: 0.8rem 0;
        }
        .tiptap h3 {
          font-size: 1.17em;
          margin: 0.6rem 0;
        }
        .tiptap ul, .tiptap ol {
          padding: 0 1rem;
          margin: 0.5rem 0;
        }
        .tiptap blockquote {
          padding-left: 1rem;
          border-left: 3px solid #4b5563;
          margin: 1rem 0;
          color: #9ca3af;
        }
        .tiptap code {
          background-color: #374151;
          padding: 0.2em 0.4em;
          border-radius: 0.3em;
        }
        .tiptap pre {
          background: #1f2937;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};

const BlogCreationPage = () => {
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {

    if(!isLoggedIn){
      toast.error("Please log in to publish a blog")
      return 
    }

    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setCoverImage(file)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isLoggedIn){
      toast.error("Please log in to publish a blog")
      return 
    }

    if (title.trim().length === 0) {
      toast.error("Please provide title of the blog")
      return
    }
    if (content.trim().length === 0) {
      toast.error("Please provide content of the blog")
      return
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", content);
    formData.append("coverImage", coverImage);

    try {
      const responce = await axios.post('/api/blog', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      console.log("Blog Created", responce.data)
      toast.success("Blog Created")
      setTitle("")
      setContent("")
      setCoverImage(null)
      setPreviewImage(null)
      navigate("/")
    } catch (error) {
      console.log("Error Creating Blog", error);
      toast.error("Blog creation error, try again later")
      setTitle("")
      setContent("")
      setCoverImage(null)
      setPreviewImage(null)
        
    }


    console.log({ title, content, previewImage });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8 text-center">
          Create New Blog Post
        </h1>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Featured Image
          </label>
          <div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-700 rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-gray-800/40">
            {previewImage ? (
              <div className="relative w-full h-full">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="text-blue-400">Click to upload image</span>
                <span className="text-sm text-gray-500 mt-2">(Max 5MB)</span>
              </label>
            )}
          </div>
        </div>

        {/* Blog Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Blog Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
            placeholder="Enter blog title..."
            required
          />
        </div>

        {/* Blog Content */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Blog Content
          </label>
          <ImprovedBlogEditor onChange={(html) => setContent(html)} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 font-medium"
          disabled={!title || !content || !previewImage}
        >
          Publish Blog
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BlogCreationPage;
