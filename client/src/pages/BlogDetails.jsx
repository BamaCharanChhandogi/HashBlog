import Markdown from "markdown-to-jsx";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { PopularPosts, PopularWriters, PostComments } from "../components";
import useStore from "../store";
import { getSinglePost } from "../utils/apiCalls";
import { usePopularPosts } from "../hooks/post-hooks";
import useSummarize from "../components/useSummary";

const BlogDetails = () => {
  const { setIsLoading } = useStore();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [numWords, setNumWords] = useState(500);
  const [handleClick, setHandleClick] = useState(false);
  const { summarizeText, isLoading, error } = useSummarize(handleClick ? post : '', handleClick ? numWords : '');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const fetchPost = () => {
      setIsLoading(true);
      getSinglePost(id).then((data) => {
        setPost(data?.data || {});
        setIsLoading(false);
      });
    };
    if (id) {
      fetchPost();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [id]);

  const handleSpeak = (text) => {
    if (typeof text === 'string') {
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    } else {
      console.error('The provided text is not a string:', text);
    }
  };

  const handleStop = () => {
    if (isSpeaking && utteranceRef.current) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!post)
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-xl text-slate-500">Loading...</span>
      </div>
    );

  return (
    <div className="w-full px-0 md:px-10 py-8 2xl:px-20">
      <div className="w-full flex flex-col-reverse md:flex-row gap-2 gap-y-5 items-center">
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
            {post?.title}
          </h1>

          <div className="w-full flex items-center ">
            {/* <span className="flex-1 text-rose-600 font-semibold">
              {post?.cat}
            </span> */}

            {/* <span className="flex flex-1 items-baseline text-2xl font-medium text-slate-700 dark:text-gray-400">
              {post?.views?.length}
              <span className="text-base text-rose-600">Views</span>
            </span> */}
          </div>

          <Link to={`/writer/${post?.user?._id}`} className="flex gap-3">
            <img
              src={post?.user?.image}
              alt={post?.user?.name}
              className="object-cover w-12 h-12 rounded-full"
            />
            <div className="">
              <p className="text-slate-800 dark:text-white font-medium">
                {post?.user?.name}
              </p>
              <span className="text-slate-600">
                {new Date(post?.createdAt).toDateString()}
              </span>
            </div>
          </Link>
        </div>
        <img
          src={post?.img}
          alt={post?.title}
          className="w-full md:w-1/2 h-auto md:h-[360px] 2xl:h-[460px] rounded object-contain"
        />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-x-28 mt-10">
        {/* LEFT */}
        <div className="w-full md:w-2/3 flex flex-col text-black dark:text-gray-500 ">
          {post?.desc && (
            <Markdown
              options={{ wrapper: "article" }}
              className="leading-[3rem] text-base 2xl:text-[20px]"
            >
              {post?.desc}
            </Markdown>
          )}

          {/* COMMENTS SECTION */}
          <div className="w-full">{<PostComments postId={id} />}</div>
        </div>

        {/* RIGHT */}
        <div className="md:w-2/4 flex flex-col gap-y-12 border-2 p-2 pb-10 rounded-md h-fit">
          {/* Summarize Article */}
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-3xl text-center m-3 font-bold text-slate-800 dark:text-white">
              Summary
            </h1>
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-2 justify-center">
                <input
                  type="number"
                  placeholder="Enter number of words"
                  value={numWords}
                  onChange={(e) => setNumWords(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setHandleClick(!handleClick)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Summarize
                </button>
              </div>
              {handleClick && (
                <>
                  {isLoading ? (
                    <span className="text-lg text-slate-700 dark:text-gray-400">
                      Loading...
                    </span>
                  ) : error ? (
                    <span className="text-lg text-slate-700 dark:text-gray-400">
                      {error}
                    </span>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleSpeak(summarizeText.props.children)}
                        className="px-2 py-1 bg-blue-500 text-white rounded-md"
                      >
                        🔊 Speak
                      </button>
                      <button
                        onClick={handleStop}
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                      >
                        🔇 Stop
                      </button>
                      <span className="text-lg text-slate-700 dark:text-gray-400">
                        {summarizeText}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
