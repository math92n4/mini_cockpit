<template>
    <div>
        <div class="header">
            <h2>INDSTILLING</h2>
        </div>

    <div v-if="modalOpen" class="modal-overlay">
        <div class="modal" @submit.prevent="submit">
            <form class="login">
                <h2>Ændr kodeord</h2>
                <input type="password" v-model="oldPassword" placeholder="Gammelt kodeord">
                <input type="password" v-model="newPassword" placeholder="Nyt kodeord">
                
                <p v-if="changePassMessage">{{ changePassMessage }}</p>
            
                <button class="button" style="margin-top: 20px;" type="submit">Ændr</button>
                <br>
                <button class="button" @click="closeModal">Gå tilbage</button>
            </form>
        </div>
    </div>
        


  <div class="menu border">
    <div class="option-top">
        <ul>
        <li :class="{ 'active-option' : profile }">
            <a @click="showProfile">Profil</a>
         </li>

        <li :class="{ 'active-option' : !profile }">
            <a @click="showData">Data</a>
        </li>

        </ul>
    </div>
    

        <div v-if="profile" class="option-content">
            <button class="button" @click="openModal">Ændr kodeord</button>
            <button class="button" @:click="logoutClick">Log ud</button>
        </div>
        
        <div v-else class="option-content">
            
            <label for="file">Upload ivsr</label>

            <p v-if="message" class="red">{{ message }} </p>
            <button v-if="readyToUpload" @click="uploadIvsr">Upload</button>

            <input type="file" id="file" @change="checkFile"></input>

            <button class="button" @click="fetchSpData">Hent sharepoint data</button>
            
        </div>

  </div>
</div>

</template>

<script setup>
import { useStore } from '@/stores/store';
import { ref } from 'vue';
import { fetchPut, postFile, fetchPost } from '@/stores/auth'

const modalOpen = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const message = ref('');
const store = useStore();

const changePassMessage = ref('')

const profile = ref('true')

const file = ref(null)
const uploadMessage = ref('')

const readyToUpload = ref(false);

function logoutClick() {
    const store = useStore();
    store.logout();
}

function openModal() {
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
}

function showProfile() {
    profile.value = true;
}

function showData() {
    profile.value = false;
}

function showUploadButton() {
    readyToUpload.value = true;
}

async function submit() {
    const old = oldPassword.value;
    const newP = newPassword.value;
    

    if(old === '' || newP === '') {
        changePassMessage.value = "Udfyld begge"
        return
    }

    const token = localStorage.getItem('token')
    
    const res = await fetchPut(token, '/api/user/update', {
        "oldPassword": old,
        "newPassword": newP
    })
    
    if(res.token && res.email) {
        localStorage.setItem("token", res.token)
        changePassMessage.value = "Kodeord ændret!"
    } else {
        changePassMessage.value = "Noget gik galt"
    }

    return res;
}

function checkFile(event) {
    file.value = event.target.files[0]
    if(file.value.name) {
        const fileName = file.value.name;
        console.log(fileName);
        
        if(!fileName.endsWith('.csv')) {
            message.value = "Forkert format"
            readyToUpload.value = false;
        } else {
            readyToUpload.value = true;
        }
    }
    

}

async function uploadIvsr() {
    if(file.value) {
        const uploadFile = file.value;
        
        try {
            const res = await postFile(uploadFile)
        } catch (error) {
            console.log(error)
        }

    }
}

async function fetchSpData() {
    const token = localStorage.getItem("token")
    const res = await fetchPost(token, '/api/sp/case', {});

}

</script>

<style>

.option-top {
    display: flex;
    align-items: center;
    padding: 10px 20px;    
}

.header {
    padding: 10px 20px;
}

.menu ul {
    display: flex;
    gap: 100px;
    padding: 0;
    list-style-type: none;
}

.menu {
    max-width: 500px;
    margin: 50px auto;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu ul li {
    padding: 10px 20px;
    cursor: pointer;
}

.menu a {
    text-decoration: none;
    color: inherit;
    display: block;
}

.menu ul li.active-option a {
    font-weight: bold;
    color: #003366;
    border-bottom: 3px solid #003366
}

.option-content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 50%;
    margin-bottom: 30px;
}



input[type=file] { display: none; }
label[for=file] {
	display: grid;
	grid-auto-flow: column;
	grid-gap: .5em;
	justify-items: center;
	align-content: center;
	color: #000000;
	border: .2em solid #000000;
	padding: .85em 1.5em;
	border-radius: 2em;
    cursor: pointer;
}




</style>