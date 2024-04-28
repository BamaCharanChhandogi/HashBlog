import axios from "axios";
export const API_URL = "http://localhost:8080";

export const getGoogleSignUp = async () => {
  try {
    const response = await axios
      .get(`${API_URL}/auth/google`)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

// email signup
export const emailSignUp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error.message;
    console.log(err);
    return err;
  }
};

// email signin
export const emailSignIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    // console.log(response.data);
    return response?.data;
  } catch (error) {
    const err = error.response?.data || error.message;
    console.log(err);
    return err;
  }
};

// get single post
export const getSinglePost = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error.message;
    console.log(err);
    return err;
  }
};
// get writer Profile
export const getWriterProfile = async (id) => {
  try {
    const {data} = await axios.get(`${API_URL}/users/get-user/${id}`);
    console.log(data?.data);
    return data?.data;
  } catch (error) {
    const err = error.response?.data || error?.message;
    console.log(err);
    return err;
  }
};

export const getPostComments = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/comments/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error.message;
    console.log(err);
    return err;
  }
};
export const postComments = async (id,token,data) => {
  try {
    const response = await axios.post(`${API_URL}/posts/comment/${id}`,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error.message;
    console.log(err);
    return err;
  }
};
export const deletePostComments = async (id,token,postId) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/comment/${id}/${postId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error.message;
    console.log(err);
    return err;
  }
};
