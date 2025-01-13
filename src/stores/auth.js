import { API_URL } from "./globals"
import { useRouter } from "vue-router";


export async function fetchGet(token, url) {
    const router = useRouter();
    try {
        const res = await fetch(`${API_URL}${url}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        
        if(res.status === 403) {
            router.push("/")
            return false;
        }

        const data = await res.json()
        console.log(data);
        return data;

    } catch (error) {
        console.error(error)

        return false;
    }
}

export async function fetchPost(token, url, body) {

    try {
        const res = await fetch(`${API_URL}${url}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        })

        return res;

    } catch (error) {
        console.error(error)
    }
}

export async function fetchPut(token, url, body) {
    const router = useRouter();
    console.log(body);
    try {
        const res = await fetch(`${API_URL}${url}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        })

        if(res.status === 403) {
            router.push("/")
            return false;
        }

        const data = await res.json()
        console.log(data);
        return data;

    } catch (error) {
        console.error(error)

        return false;
    }
}

export async function postFile(file) {
    const token = localStorage.getItem("token")
    try {
        const formData = new FormData();
        formData.append("file", file)
        const res = await fetch(`${API_URL}/api/mini/ivsr/upload`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        console.log(res)


        if(!res.ok) {
            return false;
        }

        
        return res;

        } catch (error) {
            console.error(error)
            return false;
        }
}

export async function fetchDelete(id) {
    const token = localStorage.getItem("token")
    try {
        
        const res = await fetch(`${API_URL}/api/mini/ivsr/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            
        });

        console.log(res)

        
        return res;

        } catch (error) {
            console.error(error)
            return false;
        }
}

export async function updateCar(car) {
    const token = localStorage.getItem("token")
    try {
        
        const res = await fetch(`${API_URL}/api/mini/ivsr`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(car)
        });

        console.log(res)

        
        return res;

        } catch (error) {
            console.error(error)
            return false;
        }
}



