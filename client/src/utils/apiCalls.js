import axios from 'axios'
export const API='http://localhost:8080'

export const getGoogleSignUp=async()=>{
    try{
        const response=await axios.get(`${API}/auth/google`).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    catch(error){
        console.log(error)
    }
}

// email signup
export const emailSignUp = async (data) => {
    try {
      const response = await axios.post(`${API}/auth/register`, data);
      console.log(response.data);
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
      const response = await axios.post(`${API}/auth/login`, data);
      console.log(response.data);
      return response?.data;
    } catch (error) {
      const err = error.response?.data || error.message;
      console.log(err);
      return err;
    }
  };