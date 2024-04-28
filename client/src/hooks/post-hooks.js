import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from "../store";
import { updateURL } from "../utils";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../utils/apiCalls";

export const PostsHook = ({ writerId }) => {
  const { setIsLoading } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [category, setCategory] = useState(searchParams.get("cat") || "");
  const [posts, setPosts] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      // Update the URL based on the current page and category
      const searchParams = new URLSearchParams();
      if (page) searchParams.set("page", page);
      if (category) searchParams.set("cat", category);
      navigate(`?${searchParams.toString()}`, { replace: true });

      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${API_URL}/posts?cat=${category}&page=${page}&writer=${
            writerId || ""
          }`
        );
        setPosts(data?.data || []);
        setNumOfPages(data?.numOfPages);
      } catch (error) {
        toast.error("Something went wrong");
        const err = error?.response?.data || error?.message;
        console.log(err);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchPosts();
  }, [page, category, writerId, navigate]);

  return { posts, page, setPage, numOfPages };
};
export const usePopularPosts=()=>{
  const [popularPosts,setPopularPosts]=useState([]);
  useEffect(()=>{
    const fetchPopularPosts=async()=>{
      try{
        const {data}=await axios.get(`${API_URL}/posts/popular`);
        setPopularPosts(data);
      }catch(error){
        toast.error("Something went wrong");
        const err=error?.response?.data||error?.message;
        console.log(err);
        console.log(error);
      }
    };
    fetchPopularPosts();
  },[]);
  return {popularPosts};
}
