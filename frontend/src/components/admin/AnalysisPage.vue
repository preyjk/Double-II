<template>
  <div class="echart">
    <div class="row">
      <div id="appointmentVolumeChart" class="echart-container"></div>
      <div id="successRateChart" class="echart-container"></div>
    </div>
    <div class="row">
      <div id="doctorWorkloadChart" class="echart-container"></div>
      <div id="patientTimePreferenceChart" class="echart-container"></div> <!-- 热力图 -->
    </div>
    <div id="chart-container"></div> <!-- Server-rendered SVG chart -->
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, onBeforeUnmount } from 'vue';

// Chart references
const appointmentVolumeChart = ref(null);
const successRateChart = ref(null);
const doctorWorkloadChart = ref(null);
const patientTimePreferenceChart = ref(null); // 热力图引用

const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const appointmentDataDept1 = [120, 200, 150, 80, 70, 110, 130]; // Example data for Dept 1
const appointmentDataDept2 = [90, 140, 100, 60, 50, 90, 100];   // Example data for Dept 2

// Success rate data
const successRateData = [
  { value: 70, name: 'Successful Appointments' },
  { value: 20, name: 'Canceled Appointments' },
  { value: 10, name: 'No-Show Appointments' }
];

// Doctor workload data
const doctorNames = ['Dr. Smith', 'Dr. Jones', 'Dr. Lee', 'Dr. Taylor'];
const appointmentsPerDoctor = [120, 150, 110, 90];  // Example appointments per doctor
const actualConsultationsPerDoctor = [100, 130, 90, 85]; // Example actual consultations

// Patient time preference data (热力图数据)
const timeSlots = ['Morning', 'Afternoon', 'Evening'];
const timePreferenceData = [
  [0, 0, 50], [0, 1, 80], [0, 2, 60],  // Monday
  [1, 0, 30], [1, 1, 90], [1, 2, 40],  // Tuesday
  [2, 0, 45], [2, 1, 60], [2, 2, 70],  // Wednesday
  [3, 0, 50], [3, 1, 70], [3, 2, 90],  // Thursday
  [4, 0, 60], [4, 1, 50], [4, 2, 80],  // Friday
  [5, 0, 30], [5, 1, 40], [5, 2, 30],  // Saturday
  [6, 0, 20], [6, 1, 30], [6, 2, 40]   // Sunday
];

// Initialize Appointment Volume Chart
function initAppointmentVolumeChart() {
  const chartDom = document.getElementById('appointmentVolumeChart');
  if (!chartDom) {
    console.error('Appointment Volume Chart DOM element not found!');
    return;
  }
  appointmentVolumeChart.value = echarts.init(chartDom);
  appointmentVolumeChart.value.setOption({
    title: {
      text: 'Daily Appointment Volume Chart',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Department 1',
        type: 'line',
        data: appointmentDataDept1,
      },
      {
        name: 'Department 2',
        type: 'line',
        data: appointmentDataDept2,
      },
    ],
  });
}

// Initialize Success Rate Chart
function initSuccessRateChart() {
  const chartDom = document.getElementById('successRateChart');
  if (!chartDom) {
    console.error('Success Rate Chart DOM element not found!');
    return;
  }
  successRateChart.value = echarts.init(chartDom);
  successRateChart.value.setOption({
    title: {
      text: 'Appointment Success Rate Chart',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: 'Appointment Status',
        type: 'pie',
        radius: '50%',
        data: successRateData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
}

// Initialize Doctor Workload Chart
function initDoctorWorkloadChart() {
  const chartDom = document.getElementById('doctorWorkloadChart');
  if (!chartDom) {
    console.error('Doctor Workload Chart DOM element not found!');
    return;
  }
  doctorWorkloadChart.value = echarts.init(chartDom);
  doctorWorkloadChart.value.setOption({
    title: {
      text: 'Doctor Workload Chart',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: doctorNames,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Appointments',
        type: 'bar',
        data: appointmentsPerDoctor,
      },
      {
        name: 'Actual Consultations',
        type: 'bar',
        data: actualConsultationsPerDoctor,
      },
    ],
  });
}

// Initialize Patient Time Preference Heatmap
function initPatientTimePreferenceChart() {
  const chartDom = document.getElementById('patientTimePreferenceChart');
  if (!chartDom) {
    console.error('Patient Time Preference Chart DOM element not found!');
    return;
  }
  patientTimePreferenceChart.value = echarts.init(chartDom);
  patientTimePreferenceChart.value.setOption({
    title: {
      text: 'Patient Time Preference Heatmap',
    },
    tooltip: {
      position: 'top',
    },
    grid: {
      height: '50%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: timeSlots,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    series: [
      {
        name: 'Appointments',
        type: 'heatmap',
        data: timePreferenceData,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
}

// Resize charts on window resize
function resizeCharts() {
  if (appointmentVolumeChart.value) appointmentVolumeChart.value.resize();
  if (successRateChart.value) successRateChart.value.resize();
  if (doctorWorkloadChart.value) doctorWorkloadChart.value.resize();
  if (patientTimePreferenceChart.value) patientTimePreferenceChart.value.resize();
}

onMounted(() => {
  initAppointmentVolumeChart();
  initSuccessRateChart();
  initDoctorWorkloadChart();
  initPatientTimePreferenceChart(); // Initialize Heatmap

  window.addEventListener('resize', resizeCharts);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts);
});
</script>

<style scoped>
.echart {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.echart-container {
  width: 48%; 
  height: 400px;
}

#chart-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin-top: 30px;
}
</style>
