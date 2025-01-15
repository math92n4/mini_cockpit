<template>

  <div class="table-modal border drop-shadow">
    
    <div class="top">
        <h2>DETALJER</h2>

        <div class="right">

            <div class="inputs">

                <p v-if="updateMessage"> {{ updateMessage }} </p>
                <button @click="deleteDetails(car.productionNumber)">Slet</button>
                <button @click="updateCarClick">Opdater</button>
                <button @click="deselectCar">Gå tilbage</button>

            </div>

        </div>
    </div>

    <div class="details">

    <div class="details-left">
        <h2>Detaljer om bilen</h2>
        <div class="detail-info">
            <h3>
                Production Number:
            </h3> 
            <p> {{ car.productionNumber || 'Ikke sat' }} </p>
        </div>
        
        <div class="detail-info">
            <h3>
                Model Description:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('modelDescription')">
            </h3>
            <p v-if="!inputFields.modelDescription"> {{ car.modelDescription && car.modelDescription !== 'null' ? car.modelDescription : 'Ikke sat' }}</p>
            <input v-else v-model="editedCar.modelDescription"/>
        </div>

        <div class="detail-info">
            <h3>
                Model Code:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('modelCode')">
            </h3>
            <p v-if="!inputFields.modelCode">{{ car.modelCode || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.modelCode"/>
        </div>
        
        <div class="detail-info">
            <h3>
                Brand:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('brand')">
            </h3>
            <p v-if="!inputFields.brand">{{ car.brand && car.brand !== 'NULL' ? car.brand : 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.brand"/>
        </div>

        <div class="detail-info">
            <h3>
                Options string:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('optionsString')">
            </h3>
            <p v-if="!inputFields.optionsString"> {{ car.optionsString || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.optionsString"/>
        </div>

        <div class="detail-info">
            <h3>
                Production date:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('actualProductionDate')">
            </h3>
            <p v-if="!inputFields.actualProductionDate">{{ car.actualProductionDate || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.actualProductionDate" type="date">
        </div>
        
    </div>

    <div class="details-right">
        <h2>Kunde</h2>
        <div class="detail-info">

            <h3>
                Customer zip:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('customerZip')">
            </h3>
            <p v-if="!inputFields.customerZip"> {{ car.zip || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.zip">
        </div>

        <div class="detail-info">
            <h3>
                Customer mail
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('customerMail')">
            </h3>
            <p v-if="!inputFields.customerMail"> {{ car.customerMail || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.customerMail">
        </div>

        <div class="detail-info">
            <h3>
                Customer name
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('customerName')">
            </h3>
            <p v-if="!inputFields.customerName"> {{ car.customerName || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.customerName">
        </div>

        <div class="detail-info">
            <h3>
                Agreement date
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('purchaseAgreementDate')">
            </h3>
            <p v-if="!inputFields.purchaseAgreementDate" >{{ car.purchaseAgreementDate || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.purchaseAgreementDate" type="date">
        </div>

        <div class="detail-info">
            <h3>
                Planned handover week:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('plannedHandoverWeek')">
            </h3>
            <p v-if="!inputFields.plannedHandoverWeek" >{{ car.plannedHandoverWeek || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.plannedHandoverWeek" placeholder="yyyy-mm-ww">
        </div>

        <div class="detail-info">
            <h3>
                Expected delivery week:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('expectedDeliveryWeek')">
            </h3>
            <p v-if="!inputFields.expectedDeliveryWeek" >{{ car.expectedDeliveryWeek || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.expectedDeliveryWeek" placeholder="yyyy-mm-ww">
        </div>

    </div>

    <div class="detail-bottom">


        <div class="detail-info">
            <h3>
                Sales person:
                
            </h3>
            <p> {{ editedCar.salesPerson || 'Ikke sat'}}</p>
            
        </div>

        <div class="detail-info">
            <h3>
                Retail counting date:
                <img class="img-svg" src="@/assets/update.svg" @click="openInput('retailCountingDate')">
            </h3>
            <p v-if="!inputFields.retailCountingDate" >{{ car.retailCountingDate || 'Ikke sat'}}</p>
            <input v-else v-model="editedCar.retailCountingDate" type="date">
        </div>


        <div class="detail-info">
            <h3>Sharepoint:</h3>
            <p>{{ car.sharepointData ? 'Hentet' : 'Ikke hentet'}}</p>
        </div>

        <div class="detail-info">
            <h3>Ivsr:</h3>
            <p>{{ car.ivsrData ? 'Hentet' : 'Ikke hentet'}}</p>
        </div>

        
    </div>
</div>
    

  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import { fetchDelete, updateCar } from '../stores/auth'
import { useRouter } from "vue-router";
import { reactive, ref } from 'vue';

const props = defineProps({
    car: Object,
    deselectCar: Function,
});

const router = useRouter();
const editedCar = reactive({})

const updateMessage = ref('')

onMounted(() => {
    Object.assign(editedCar, props.car)
})

const inputFields = reactive({
    modelDescription: false,
    modelCode: false,
    brand: false,
    optionsString: false,
    actualProductionDate: false,
    customerZip: false,
    customerMail: false,
    customerName: false,
    purchaseAgreementDate: false,
    plannedHandoverWeek: false,
    expectedDeliveryWeek: false,
    salesPerson: false,
    retailCountingDate: false,
})

function openInput(field) {
    if(inputFields[field]) {
        inputFields[field] = false;
    } else {
        inputFields[field] = true;
    }
}

async function deleteDetails(id) {
    console.log(id);
    try {
        const res = await fetchDelete(id);
        if (res.ok) {
            location.reload()
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateCarClick() {
    console.log(editedCar)
    try {
        const res = await updateCar(editedCar)
        if(!res.ok) {
            console.log("DIDNT WORK");
            updateMessage.value = "Opdateringen gik galt"
        } else {
            updateMessage.value = "Opdateret!"
        }
    } catch(error) {
        console.log(error)
    }
}

</script>

<style>

.details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 20px;
    
}

.detail-info {
    margin-bottom: 10px;
}

.detail-info h3 {
    font-weight: bold;
    margin-bottom: 4px;
}

.detail-info h2 {
  margin: 0;
  font-weight: bold;
  text-align: center;
}

.detail-info p {
  margin: 0;
  color: #555;
}

.details-left,
.details-right {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
}

.details-bottom {
    grid-column: 1 / -1;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.img-svg {
    cursor: pointer;
}

</style>
  