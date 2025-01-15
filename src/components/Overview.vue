<template>
    <div class="container border drop-shadow">
        <div class="top">
            <h2>OVERSIGT</h2>

            <div class="right">

              <div class="inputs">

                <button @click="openGraphOptions">Vælg grafer</button>

                  
                <button @click="openMetabase">Opret graf</button>
                

              </div>
        </div>

    </div>

        <div v-if="graphOptionsOpen" class="modal-overlay">
          <div class="modal-graph">
            
            <div class="check-graphs">

              <div v-for="graph in graphOptions" :key="graph.id" class="graph-option">
                <input type="checkbox" :id="graph.id" v-model="graph.enabled" :value="graph.id">
                <label :for="graph.id">{{ graph.name }}</label>
              </div>

          
                <button class="button" style="margin-top: 20px;" @click="updateGraphOptions">Gem</button>
                <button class="button" @click="closeGraphOptions">Gå tilbage</button>
              

            </div>
            
          </div>
        </div>

        <div class="charts-grid">
          <div class="iframe-container" v-for="(src, index) in iframeSrcs" :key="index">
            <iframe
              :src="src" frameborder="0">
            </iframe>
          </div>
        </div>
        
    </div>
    
</template>

<script setup>
import { createChart } from '../stores/util/chart/chartUtil'
import { API_URL, METABASE_API_KEY, METABASE_API_URL } from '@/stores/globals';
import { onMounted, ref } from 'vue';

const iframeSrcs = ref([]);
const graphOptionsOpen = ref(false);
const graphOptions = ref([])

async function openGraphOptions() {
  graphOptionsOpen.value = true
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/api/mini/graph`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json();
  graphOptions.value = data;
  console.log(graphOptions.value)
}

async function updateGraphOptions() {
  
  const token = localStorage.getItem('token')
  const updatedGraphOptions = graphOptions.value.map(graph => ({
    id: graph.id,
    enabled: graph.enabled,
    name: graph.name
  }))
  
  const res = await fetch(`${API_URL}/api/mini/graph/enable`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedGraphOptions)
  })

  if(res.ok) {
    closeGraphOptions();
    const updatedData = await fetchMetabaseQuestion();
    iframeSrcs.value = updatedData.map((element) => element.url);
  }
};

function closeGraphOptions() {
  graphOptionsOpen.value = false;
}

onMounted(async () => {
  const data = await fetchMetabaseQuestion();
  
  iframeSrcs.value = data.map((element) => element.url)

})

async function fetchMetabaseQuestion() {

  const graphs = []
  const metabaseRes = await fetch(`${METABASE_API_URL}/api/card?filter=database eq 6`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": METABASE_API_KEY,
    },
    method: "GET"
  })

  if(metabaseRes.ok) {
    const metabaseData = await metabaseRes.json();

    

    metabaseData.forEach(async (element) => {

      if(!element.enable_embedding) {
        
        await fetch(`${METABASE_API_URL}/api/card/${element.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": METABASE_API_KEY,
          },
          body: JSON.stringify({ enable_embedding: true })

        })
      }

      graphs.push({ id: element.id, name: element.name });
    })

    const token = localStorage.getItem('token')

    const res = await fetch(`${API_URL}/api/mini/metabase`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphs),
      method: "POST"
    })
    
    if(res.ok) {
      const data = await res.json();

      return data;
    }
  }
}

function openMetabase() {
  window.open("https://matwn.dk/metabase/question/notebook", "_blank")
}



/*
<div class="charts-grid">
            <div v-for="(chart, index) in charts" :key="index" class="chart-container">
                <canvas :ref="'chartCanvas' + index"></canvas>
            </div>       
        </div>
export default {
  name: "Overview",
  data() {
    return {
      
      charts: [
        {
          type: "bar",
          data: {
            labels: [],
            datasets: [
              {
                label: "Salg pr model",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: [],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          },
        },
        {
          type: "line",
          data: {
            labels: ["Januar", "Februar", "Marts", "April", "Maj",
                    "Juni", "Juli", "August", "Septemper", "Oktober",
                    "November", "December"
            ],
            datasets: [
              {
                label: "Salg 2024",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                data: [],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          },
        },
        
        {
          type: "bar",
          data: {
            labels: ["Red", "Blue, Yellow"],
            datasets: [
              {
                label: "Salg 2024",
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                data: [30,2,1],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          },
        },
        
        
        
      ],
      
    };
  },
  async mounted() {
    this.fetchCarGraphData()
  },
  methods: {
    
    async fetchCarGraphData() {
      const carsStore = useCarsStore();
      await carsStore.fetchGraph();
      this.updateCharts(carsStore.graphData)
      
    },

    updateCharts(graphData) {
      console.log(graphData);
    

      graphData.salesPrModel.forEach(element => {
        const label = element.modelDescription
        const value = element.count
        this.charts[0].data.labels.push(label)
        this.charts[0].data.datasets[0].data.push(value)
      })

      graphData.salesPrMonth.forEach(element => {
        const value = element.count
        this.charts[1].data.datasets[0].data.push(value)
      })

      this.renderCharts()
    },

    renderCharts() {
      this.charts.forEach((chartConfig, index) => {
        const canvas = this.$refs[`chartCanvas${index}`][0];
        createChart(canvas, chartConfig);
      });
    },
    
    

  }
};
*/

</script>

<style>

.modal-graph {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; 
  border-radius: 5px;
  background-color: #ffffff;
  width: 300px;
}


.container {
  max-width: 90%;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 5px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: gray solid; 
}

.charts-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}

.chart-container {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
}


iframe {
  height: 500px; 
  width: 100%; 
}

.check-graphs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 1000px) {
  .charts-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

</style>