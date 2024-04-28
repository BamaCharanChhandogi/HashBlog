import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  useStore  from "../store";
import { updateURL } from "../utils";
import axios from "axios";
import { toast } from "sonner";

export const usePosts=({writerId})=>{
    const {setIsLoading} = useStore();
    const location =useLocation();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [page,setPage] =useState(searchParams.get("page") || 1);

    const [category,setCategory] = useState(searchParams.get("cat") ||"");

    const [posts,setPosts] = useState([]);
    const [numOfPages,setNumOfPages] = useState(1);

    useEffect(()=>{
        const fetchPosts=async()=>{
            updateURL({page,navigate,cat:category});
            setIsLoading(true);

            try{
                const {data} = await axios.get(
                    `${API_URL}/posts?cat=${category}&page=${page}&writer=${writerId || ""}`
                );
                setPosts(data?.data || []);
                setNumOfPages(data?.numOfPages)
            }
            catch(error){
                toast.error("Something went wrong");
                const err=error?.response?.data || error?.message;
                console.log(err);
                console.log(error);
            }
            finally{
                setIsLoading(false);
            }
        }
        window.scrollTo({top:0,left:0,behavior:"smooth"});
        fetchPosts();
    },[page,category,writerId]);

    return {posts,page,setPage,numOfPages};
}