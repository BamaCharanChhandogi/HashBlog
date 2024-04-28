import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

export const saveUserInfo=(user,signIn)=>{
    localStorage.setItem('userInfo',JSON.stringify({user:user?.user,token:user.token}))
    signIn(user?.user,user.token);
    toast.success(user?.success);

    setTimeout(() => { 
      window.location.reload();
    }, 1500);
}

export const updateURL=({page,navigate,location,cat})=>{
    const params = useSearchParams();

    if(cat){
      params.set("cat",cat);
    }

    if(page && page>1){
      params.set("page",page);
    }

    const newURL=`${location.pathname}?${params.toString()}`;
    navigate(newURL,{replace:true});

    return newURL;
}