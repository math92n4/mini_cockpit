import API_URL from '../globals.js'

export async function fetchGet(path) {
    const response = await fetch(`${API_URL}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log(data)
    return data;
}

export async function fetchPost(body, path) {
    const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if(response.ok) {
        const data = await response.json();
        console.log(data)
        return data
    } else {
        return response;
    }
    
}