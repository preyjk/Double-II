<template>
    <div class="h-full flex md:flex-row flex-col">
        <div class="md:w-1/3 p-6 bg-gray-100 rounded-lg md:border-r md:overflow-y-auto">
            <div class="mb-4">
                <label for="clinic-select" class="block text-gray-700 font-bold mb-2">Select Clinic:</label>
                <el-select id="clinic-select" v-model="selectedClinic" filterable placeholder="Search Clinic..."
                    class="w-full" @change="selectClinic">
                    <el-option v-for="clinic in clinics" :key="clinic.id" :label="clinic.workplace"
                        :value="clinic.workplace" />
                </el-select>
            </div>
            <div class="mb-4">
                <label for="doctor-select" class="block text-gray-700 font-bold mb-2">Select Doctor:</label>
                <el-select id="doctor-select" v-model="selectedDoctor" filterable multiple
                    placeholder="Search Doctor..." class="w-full" @change="handleDoctorChange">
                    <el-option :key="'select-all'" :label="'Select All'" :value="'select-all'" />
                    <el-option :key="'clear-all'" :label="'Clear All'" :value="'clear-all'" />
                    <el-option v-for="doctor in doctors" :key="doctor.id" :label="doctor.name" :value="doctor.id" />
                </el-select>
            </div>
            <div class="mb-4">
                <label for="date-picker" class="block text-gray-700 font-bold mb-2">Select Date:</label>
                <el-date-picker id="date-picker" v-model="selectedDate" type="date" placeholder="Pick a date"
                    value-format="YYYY-MM-DD" class="w-full" />
            </div>
            <div class="mb-4">
                <label for="start-time-picker" class="block text-gray-700 font-bold mb-2">Time Range:</label>
                <el-time-picker id="start-time-picker" is-range arrow-control range-separator="To"
                    start-placeholder="Start time" end-placeholder="End time" v-model="timeRange" class="w-full"
                    format="HH:mm" value-format="HH:mm" />
            </div>
            <div class="mb-4">
                <label for="interval-input" class="block text-gray-700 font-bold mb-2">Interval (minutes):</label>
                <el-input id="interval-input" v-model="interval" placeholder="Enter interval" class="w-full" />
            </div>
            <div>
                <el-button type="primary" @click="postSchedules"
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Post
                    Schedules</el-button>
            </div>
        </div>
        <div class="md:w-2/3 p-4 md:overflow-y-auto">
            <h1 class="text-2xl font-bold mb-4">Preview</h1>
            <div v-if="schedules.length > 0" v-for="doctor in selectedDoctor" :key="doctor" class="mb-4">
                <h2 class="text-xl font-bold">{{ doctors.find(d => d.id === doctor).name }}</h2>
                <div class="flex flex-wrap">
                    <div v-for="schedule in schedules.filter(schedule => schedule.DoctorId === doctor)"
                        :key="schedule.DoctorId + schedule.Date + schedule.StartTime"
                        class="bg-gray-200 p-2 rounded-lg m-2 w-70">
                        <p class="text-gray-700">{{ schedule.StartTime }} - {{ schedule.EndTime }}
                            <span
                                :class="{ 'text-green-500': schedule.status === 'Success', 'text-red-500': schedule.status === 'Failed' }">{{
                                    schedule.status }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from '@/api/backendApi';

const selectedClinic = ref("");
const selectedDoctor = ref([]);
const selectedDate = ref(null);
const timeRange = ref([]);
const interval = ref(15);
const clinics = ref([]);
const doctors = ref([]);
const results = ref([]);
const schedules = ref([]);

const refreshSchedule = () => {
    if (!selectedDate.value || !timeRange.value.length || !selectedDoctor.value.length || !interval.value) {
        return;
    }
    schedules.value = [];
    const [startTime, endTime] = timeRange.value;
    const start = new Date(`${selectedDate.value}T${startTime}:00`);
    const end = new Date(`${selectedDate.value}T${endTime}:00`);
    const intervalMs = interval.value * 60 * 1000;

    for (let time = start; time < end; time = new Date(time.getTime() + intervalMs)) {
        for (const doctorId of selectedDoctor.value) {
            const doctor = doctors.value.find(d => d.id === doctorId);
            schedules.value.push({
                DoctorId: doctorId,
                DoctorName: doctor.name,
                Clinic: selectedClinic.value,
                ClinicAddress: clinics.value.find(c => c.workplace === selectedClinic.value).address,
                Date: selectedDate.value,
                StartTime: time.toTimeString().slice(0, 5),
                EndTime: new Date(time.getTime() + intervalMs).toTimeString().slice(0, 5),
            });
        }
    }
};

watch([selectedDoctor, selectedDate, timeRange, interval], refreshSchedule);

async function fetchClinics() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/public/clinics`);
        const data = await response.json();
        clinics.value = data;
    } catch (error) {
        console.error("Error fetching clinics:", error);
    }
}

async function fetchDoctors(workplace) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/public/doctors?workplace=${workplace}`);
        const data = await response.json();
        doctors.value = data.map(doctor => ({ id: doctor.Id, name: `${doctor.FirstName} ${doctor.LastName}` }));
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
}

function selectClinic(workplace) {
    selectedClinic.value = workplace;
    selectedDoctor.value = [];
    fetchDoctors(workplace);
}

function handleDoctorChange(value) {
    if (value.includes('select-all')) {
        selectedDoctor.value = doctors.value.map(doctor => doctor.id);
    } else if (value.includes('clear-all')) {
        selectedDoctor.value = [];
    } else {
        selectedDoctor.value = value;
    }
}

async function postSchedules() {
    if (!selectedDate.value || !timeRange.value.length || !selectedDoctor.value.length || !interval.value) {
        alert("Please fill in all fields.");
        return;
    }

    const authToken = localStorage.getItem('token');
    if (!authToken) {
        alert("Please login first.");
        return;
    }

    for (const schedule of schedules.value) {
        try {
            await axios.post('/admin/schedules', schedule, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(authToken)}`,
                },
            });
            schedule.status = 'Success';
        } catch (error) {
            console.error("Error posting schedules:", error);
            schedule.status = 'Failed';
        }
    }
}

fetchClinics();
</script>
