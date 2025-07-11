import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  loading:true,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
  logout: (callback) => {
    set({ isLoggedIn: false})
    if(callback){
        callback()
    }
  },
  checkAuth : async()=>{
    console.log("hi");
    
    try {
      const res = await axios.get("/api/user/check-auth",{
        withCredentials:true
      })
      if (res.status === 200 && res.data.loggedIn) {
        console.log("User is logged in",res)
        set({ isLoggedIn: true, loading: false});
      } else {
        console.log("User is  not logged in")
        set({ isLoggedIn: false, loading: false });
      }
    } catch (error) {
      console.error("Auth-check failed",error)
      set({ isLoggedIn: false, loading: false });
    }
  }
}));

export default useAuthStore;
