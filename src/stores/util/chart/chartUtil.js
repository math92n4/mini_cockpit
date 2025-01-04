import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

export function createChart(canvas, config) {
    if(!canvas) {
        console.log('No canvas')
        return null;
    }
    return new Chart(canvas, config);
}

export function destroyChart(chartInstance) {
    if (chartInstance) {
      chartInstance.destroy();
    }
}
