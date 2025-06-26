import { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../Authentication/UserAuthStore';

const BlogPost = () => {

  const { isLoggedIn } = useAuthStore()
  const [comments, setComments] = useState([]);
  const [fullName,setFullName] = useState("")
  const [newComment, setNewComment] = useState('');
  const [blogId, setBlogId] = useState('');
  const { id } = useParams()
  const [post, setPost] = useState(null);

  // Simulate API call
  useEffect(() => {
    // // Replace this with actual API call
    // const [title,setTitle] = useState("")
    // const [body,setBody] = useState("")
    // const [coverImageUrl,setCoverImageUrl] = useState("")

    const currentBlog = async () => {
      try {
        const res = await axios.get(`/api/blog/${id}`)
        console.log("Got the blog", res.data)

        const blog = res.data.blog
        setBlogId(blog._id)
        const mockPost = {
          id: blog._id,
          title: blog.title,
          content: blog.body,
          image: `http://localhost:8000/public/${blog.coverImageUrl}`,
          comments:res.data.comments,
        };

        setPost(mockPost);
        setComments(mockPost.comments);
      } catch (error) {
        console.error("Error finding blog", error)
      }
    }
    currentBlog()

  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Login first to comment");
      setNewComment("")
      return
    }
    if (newComment.trim().length===0) {
      toast.error("Please type something");
      return
    }

    try {

      const res = await axios.post("/api/comment/blog",{
        forWhichBlog:blogId,
         body:newComment
      })

      console.log("Comment Succesful",res)

      setFullName(res.data.comment.createdBy.fullName)      
      

      if (newComment.trim()) {
        setComments([ {
          _id: Date.now(),
          createdBy: {
            fullName:res.data.comment.createdBy.fullName
          },
          body: newComment,
          createdAt: new Date().toLocaleDateString()
        },...comments]);
        console.log("naco")
        setNewComment('');
      }
    } catch (error) {
      console.log("Error in commenting",error);
    }

  };

  if (!post) return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-block text-blue-400 hover:text-purple-400 transition-colors mb-8"
        >
          &larr; Back to Blogs
        </Link>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl shadow-blue-900/20"
        >
          {/* Featured Image */}
          <div className="relative group mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl border border-gray-700/50"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl py-2 md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {post.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none text-gray-300 mb-12"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          ></div>

          {/* Comments Section */}
          <div className="border-t border-gray-700/50 pt-8">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Comments ({comments.length})
            </h3>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 bg-gray-900/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
                <button
                  type="submit"
                  className="py-2 px-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:scale-[1.02] transition-transform"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map(comment => (
                <div
                  key={comment._id}
                  className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                      {comment.createdBy.fullName[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-400">{comment.createdBy.fullName}</h4>
                      <p className="text-xs text-gray-400">{comment.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogPost;