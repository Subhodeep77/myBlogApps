import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";

const Home = () => {

    const [blogs, setBlogs] = useState([])
    // Example blog data (replace with your actual data from backend)
    // const blogs = [
    //     {
    //         id: 1,
    //         title: "The Future of Web Development",
    //         excerpt: "Explore the latest trends in modern web development...",
    //         img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    //         category: "Technology"
    //     },
    //     {
    //         id: 2,
    //         title: "Mastering Tailwind CSS",
    //         excerpt: "Learn how to build beautiful interfaces with Tailwind...",
    //         img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    //         category: "Design"
    //     },
    //     // Add more blogs as needed
    // ];

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get('/api/')
                setBlogs(res.data)
                console.log("blog fetched successfully", res.data)
            } catch (error) {
                console.log("Error fetching blogs", error)
            }
            console.log("hiiiii")
        }
        fetchBlog();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl md:text-5xl  font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text pb-5 text-transparent mb-14 text-center">
                    Latest Blogs
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <article
                            key={blog._id}
                            className="relative group bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20"
                        >
                            <div className="aspect-square relative">
                                <img
                                    src={`http://localhost:8000/public/${blog.coverImageUrl}`}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-white mb-10">{blog.title}</h2>  
                                 <Link
                                   to={`/blog/${blog._id}`}
                                    className="w-full inline-block py-2.5 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg transition-transform hover:scale-105"
                                >
                                    Read Article
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;