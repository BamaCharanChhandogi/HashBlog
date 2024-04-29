import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className=''>
      <Link
        to='/'
        className={`text-2xl font-semibold dark:text-white ${
          type && "text-white  text-4xl"
        }`}
      >
        Hash
        <span
          className={`text-3xl text-pink-500 ${type && " text-5xl font-bold"}`}
        >
          Node
        </span>
      </Link>
    </div>
  );
};

export default Logo;