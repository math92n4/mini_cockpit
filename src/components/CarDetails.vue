
<template>

  <div class="table-modal border">
    <div class="top">
        <h2>Detaljer</h2>
    </div>

    <div class="details">
    <div class="details-left">
        <h2>Detaljer om bilen</h2>
        <div class="detail-info">
            <h3>
                Production Number:
                <img class="img-svg" src="@/assets/update.svg">
            </h3> 
            <p>{{ car.productionNumber }}</p>
        </div>
        
        <div class="detail-info">
            <h3>
                Model Description:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.modelDescription || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Model Code:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.modelCode || 'Ikke sat'}}</p>
        </div>
        
        <div class="detail-info">
            <h3>
                Brand:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.brand || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Options string:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.optionsString || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Production date:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.actualProductionDate || 'Ikke sat'}}</p>
        </div>
        
    </div>

    <div class="details-right">
        <h2>Kunde</h2>
        <div class="detail-info">

            <h3>
                Customer zip:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.zip || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Customer mail
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.customerMail || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Customer name
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.customerName || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Agreement date
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.purchaseAgreementDate || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Planned handover week:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.plannedHandoverWeek || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Expected delivery week:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.expectedDeliveryWeek || 'Ikke sat'}}</p>
        </div>

    </div>

    <div class="detail-bottom">


        <div class="detail-info">
            <h3>
                Sales person:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.salesPerson || 'Ikke sat'}}</p>
        </div>

        <div class="detail-info">
            <h3>
                Retail counting date:
                <img class="img-svg" src="@/assets/update.svg">
            </h3>
            <p>{{ car.retailCountingDate || 'Ikke sat'}}</p>
            
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
    
<button @click="deleteDetails(car.productionNumber)">Slet</button>
<button>Opdater</button>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { fetchDelete } from '../stores/auth'
import { useRouter } from "vue-router";

defineProps(['car']);
const router = useRouter();

async function deleteDetails(id) {
    console.log(id);
    try {
        const res = await fetchDelete(id);
        if (res.ok) {
            router.push('/cockpit');
        } else {
            console.log(res);
        }
    } catch (error) {
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
  