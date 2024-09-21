<template>
    <div class="echart-page">
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
    </div>
</template>

<script setup>
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';

// Register the required ECharts components
use([CanvasRenderer, BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);

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
</script>

<style scoped>
.echart-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.echart-container {
    width: 100%;
    max-width: 600px;
    height: 400px;
}
</style>