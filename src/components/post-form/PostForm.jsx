import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE, Loading } from '../index'
import appwriteService from '../../appwrite/configuration'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false)


    const submit = async (data) => {
        setLoading(true)
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            console.log('update wala', dbPost);


            if (dbPost) {
                toast.success('Post Updated')
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });


                if (dbPost) {
                    try {
                        if ((dbPost && dbPost instanceof Error && dbPost.code == 400) || dbPost.code == 409) {
                            toast.error('add a unique slug with at most 36 characters not starting with special characters and can only contain A-Z a-z 0-9 period hyphen and underscore')
                            navigate('/add-post')
                            throw new Error(dbPost);

                        }
                        toast.success('Post Created')
                        navigate(`/post/${dbPost.$id}`);
                    } catch (error) {
                        console.log(error);

                    }
                }
            }
        }
        setLoading(false)
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && !post) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return loading ? <Loading message='Please Wait while we creating your post' /> : (
        <form onSubmit={handleSubmit(submit)} className="flex md:flex-row xxsm:flex-col px-8 shadow-lg shadow-[#7b4ee49f] gap-8 xxsm:py-10 md:py-0 ">
            <div className="md:w-2/3 xxsm:w-full md:px-2 mx-auto ">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: 'Title is Required' })}
                />
                {errors.title && <p className="text-red-500 mb-1 -mt-3">{errors.title.message}</p>}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className={`${post ? 'text-gray-500 mb-4' : 'text-black mb-4'}`}
                    {...register("slug", { required: 'Slug is Required' })}
                    onInput={(e) => {
                        if (!post)
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    disabled={!!post}
                />
                {errors.slug && <p className="text-red-500 mb-1 -mt-3">{errors.slug.message}</p>}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} {...register('content', { required: 'Content is Required' })} />
                {errors.content && <p className="text-red-500 top-[171px] left-20 absolute">{errors.content.message}</p>}
            </div>
            <div className="md:w-1/3 xxsm:w-full md:px-2 mx-auto">
                <Input
                    label="*Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post ? 'image is required' : undefined })}
                />
                {errors.image && <p className="text-red-500 mb-1 -mt-3">{errors.image.message}</p>}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}