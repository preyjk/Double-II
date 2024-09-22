<template>
    <div id="main" class="echart-page">
        <!-- Bar Chart -->
        <div class="echart-container">
            <h3>Bar Chart</h3>
            <v-chart :option="barChartOption" autoresize />
        </div>

        <!-- Line Chart -->
        <div class="echart-container">
            <h3>Line Chart</h3>
            <v-chart :option="lineChartOption" autoresize />
        </div>

        <!-- Pie Chart -->
        <div class="echart-container">
            <h3>Pie Chart</h3>
            <v-chart :option="pieChartOption" autoresize />
        </div>

        <!-- Heatmap -->
        <div class="echart-container">
            <h3>Heatmap</h3>
            <v-chart :option="heatmapChartOption" autoresize />
        </div>
    </div>
</template>

<script setup>
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, HeatmapChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';

// Register the required ECharts components
use([CanvasRenderer, BarChart, LineChart, PieChart, HeatmapChart, GridComponent, TooltipComponent, LegendComponent]);

// Bar chart options
const barChartOption = {
    title: {
        text: 'Bar Chart Example',
    },
    tooltip: {},
    xAxis: {
        data: ['Category A', 'Category B', 'Category C', 'Category D'],
    },
    yAxis: {},
    series: [
        {
            name: 'Values',
            type: 'bar',
            data: [5, 20, 36, 10],
        },
    ],
};

// Line chart options
const lineChartOption = {
    title: {
        text: 'Line Chart Example',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name: 'Sales',
            type: 'line',
            data: [150, 230, 224, 218, 135, 147],
        },
    ],
};

// Pie chart options
const pieChartOption = {
    title: {
        text: 'Pie Chart Example',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: 'Access Source',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
};

// Updated Heatmap chart options for better clarity
const heatmapChartOption = {
    title: {
        text: 'Heatmap Example',
    },
    tooltip: {
        position: 'top',
    },
    grid: {
        height: '70%',  
        top: '15%',     
        left: '15%',    
        right: '15%',   
    },
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        axisLabel: {
            fontSize: 14, 
            rotate: 45,   
        },
    },
    yAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8'],
        axisLabel: {
            fontSize: 20, 
        },
    },
    visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '10%',  
    },
    series: [
        {
            name: 'Punch Card',
            type: 'heatmap',
            data: [
                [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0],
                [1, 0, 1], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0],
                [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0],
                [3, 0, 0], [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0],
                [4, 0, 0], [4, 1, 0], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 0], [4, 6, 0], [4, 7, 0],
            ],
            label: {
                show: true,
                fontSize: 12, // Improved readability of data labels
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
};

</script>


<style scoped>
#main {
    width: 100%;
    max-width: 1600px; 
    height: 100%;     
    margin: 0 auto;    
    padding: 20px;     
    background-color: #f4f4f9;
    display: flex;
    flex-wrap: wrap;   
    gap: 20px;         
}
.echart-page {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    padding: 20px;
    background-color: #f4f4f9;
}

.echart-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    width: 100%;
    max-width: 1600px;
}

.echart-container {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.echart-container:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
}

h3 {
    margin-bottom: 10px;
    font-family: 'Arial', sans-serif;
    color: #333;
    text-align: center;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 1024px) {
    .echart-page {
        grid-template-columns: 1fr;
    }

    .echart-row {
        grid-template-columns: 1fr;
    }

    .echart-container {
        height: 400px;
    }
}

@media (max-width: 768px) {
    .echart-container {
        height: 350px;
    }
}

@media (max-width: 480px) {
    .echart-container {
        height: 300px;
    }

    .echart-page {
        padding: 10px;
    }
}
</style>
