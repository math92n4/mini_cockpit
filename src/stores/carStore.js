import { defineStore } from 'pinia';
import { ref } from 'vue';
import API_URL from './globals';
import { useStore } from './store';
import { fetchGet, fetchPost } from './auth';

export const useCarsStore = defineStore('cars', () => {
    const cars = ref([]);
    const graphData = ref([])
  
    async function fetchCars() {
      const token = localStorage.getItem("token")
      const response = await fetchGet(token, `/api/ivsr`);
      const data = response
      cars.value = data;
    }

    async function fetchGraph() {
      const token = localStorage.getItem("token")
      const response = await fetchGet(token,'/api/ivsr/graph');
      const data = response
      graphData.value = data;
    }

    async function postCar(productionNumber) {
        const token = localStorage.getItem("token")
        const res = await fetchPost(token, '/api/ivsr/add', {
            "productionNumber": productionNumber,
        })
        const data = res;
        return data;
    }
  
    return { cars, graphData, fetchGraph, fetchCars, postCar };
  });