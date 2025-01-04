
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchGet, fetchPost } from "./util/fetch";
import { defineStore } from "pinia";

    
export const useStore = defineStore('user', () => {
    const user = ref({})
    const isLoggedIn = ref(false)

    const router = useRouter();

    const login = async (credentials) => {

        try {
            const res = await fetchPost(credentials,'/api/mini/user/authenticate')

            if(res.token) {
                user.value = res;
                localStorage.setItem("token", res.token);
                isLoggedIn.value = true;
                router.push("/cockpit")
                
            } else {
                return res;
            }
            
            
        } catch(error) {
            console.error(error);
            throw error
        }   
    }

    const logout = () => {
        user.value = null;
        isLoggedIn.value = false;
        localStorage.removeItem("token")
        router.push('/')
    }
    

    /*
    const fetchUser = async () => {
        if(!token.value) {
            isLoggedIn.value = false;
            return;
        }

        try {
            const res = await fetch('/user/get', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok) {
                const data = await res.json()
                user.value = data;
                isLoggedIn.value = true;

            } else {
                user.value = null;
                isLoggedIn.value = false;
                router.push("/")
            }
            
        } catch (error) {
            console.error(error)
            throw error
        }
    }

        */

    return {
        login,
        logout,
        user,
    }
}
)
