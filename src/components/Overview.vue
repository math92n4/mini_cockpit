<template>
    <div class="container border">
        <div class="top">
            <h2>OVERSIGT</h2>
        </div>

        <div class="charts-grid">
            <div v-for="(chart, index) in charts" :key="index" class="chart-container">
                <canvas :ref="'chartCanvas' + index"></canvas>
            </div>
        </div>
        
    </div>
    
</template>

<script>
import { createChart } from '../stores/util/chart/chartUtil'
import { useCarsStore } from '@/stores/carStore';
import { useStore } from '@/stores/store';

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


</script>

<style>

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

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

</style>