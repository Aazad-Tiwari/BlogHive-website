import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Loading } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/configuration";
import { toast } from "react-toastify";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isAuthor, setIsAuthor] = useState(false)

    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (post && userData) {

            setIsAuthor(post.userId === userData.$id);
        }
    }, [post, userData]);




    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
            .then((post) => {
                if (post) setPost(post);
                else navigate("/");
            })
            .finally( () => { setLoading(false) } )
        } else {
            setLoading(false)
            navigate("/")
        } 

    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                toast.success('Post Successfully Deleted')
                navigate("/all-posts");
            }
        });
    };

    function formatPostDate(postDate) {
        const date = new Date(postDate);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(date);
    }


    return post && !loading ? (
        <div className="py-8">
            <div className="w-full flex flex-col justify-center mb-4 relative  ">
                <div className="w-4/5 mb-6 text-center mx-auto text-4xl  ">
                    <h1 className="text-4xl leading-[53px] font-bold">{post.title}</h1>
                </div>
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded w-full"
                    loading="lazy"
                />
                <h4 className="ml-24 mt-9 font-semibold border text-blog_black px-5 py-[1px] border-black/50 w-fit"> {formatPostDate(post.$createdAt)} </h4>

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="max-w-[1100px] leading-[150%] w-full mx-auto text-center">
                {parse(post.content)}
            </div>
        </div>
    ) : <Loading/> ;
}