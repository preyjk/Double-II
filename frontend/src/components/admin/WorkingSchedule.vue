<template>
    <div class="working-schedule">
        <div class="form-group">
            <label for="clinic-select">Select Clinic:</label>
            <el-select id="clinic-select" v-model="selectedClinic" filterable placeholder="Search Clinic..."
                class="form-select" @change="selectClinic">
                <el-option v-for="clinic in clinics" :key="clinic.id" :label="clinic.workplace"
                    :value="clinic.workplace" />
            </el-select>
        </div>
        <div class="form-group">
            <label for="doctor-select">Select Doctor:</label>
            <el-select id="doctor-select" v-model="selectedDoctor" filterable multiple placeholder="Search Doctor..."
                class="form-select" @change="handleDoctorChange">
                <el-option :key="'select-all'" :label="'Select All'" :value="'select-all'" />
                <el-option :key="'clear-all'" :label="'Clear All'" :value="'clear-all'" />
                <el-option v-for="doctor in doctors" :key="doctor.id" :label="doctor.name" :value="doctor.id" />
            </el-select>
        </div>
        <div class="form-group">
            <label for="date-picker">Select Date:</label>
            <el-date-picker id="date-picker" v-model="selectedDate" type="date" placeholder="Pick a date"
                value-format="YYYY-MM-DD" class="form-select" />
        </div>
        <div class="form-group">
            <label for="start-time-picker">Time Range:</label>
            <el-time-picker id="start-time-picker" is-range arrow-control range-separator="To"
                start-placeholder="Start time" end-placeholder="End time" v-model="timeRange" class="form-select"
                format="HH:mm" value-format="HH:mm" />
        </div>
        <div class="form-group">
            <label for="interval-input">Interval (minutes):</label>
            <el-input id="interval-input" v-model="interval" placeholder="Enter interval" class="form-input" />
        </div>
        <div class="form-group">
            <el-button type="primary" @click="postSchedules" class="submit-btn">Post Schedules</el-button>
        </div>
        <div class="results-section">
            <h1>Result</h1>
            <div v-for="doctor in selectedDoctor" :key="doctor" class="doctor-result">
                <h2>{{ doctors.find(d => d.id === doctor).name }}</h2>
                <div v-for="result in results.filter(result => result.DoctorId === doctor)" :key="result.key" class="result-item">
                    <p>{{ result.Date }} {{ result.StartTime }} - {{ result.EndTime }} <span :class="{'success': result.status === 'Success', 'failed': result.status === 'Failed'}">{{ result.status }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WorkingSchedule",
    data() {
        return {
            selectedClinic: "",
            selectedDoctor: [],
            selectedDate: null,
            timeRange: [],
            interval: 15,
            clinics: [], // Initialize as an empty array
            doctors: [], // Initialize as an empty array
            results: [],
        };
    },
    methods: {
        async fetchClinics() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/public/clinics`);
                const data = await response.json();
                this.clinics = data;
            } catch (error) {
                console.error("Error fetching clinics:", error);
            }
        },
        async fetchDoctors(workplace) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/public/doctors?workplace=${workplace}`);
                const data = await response.json();
                this.doctors = data.map(doctor => ({ id: doctor.Id, name: `${doctor.FirstName} ${doctor.LastName}` }));
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        },
        selectClinic(workplace) {
            this.selectedClinic = workplace;
            this.fetchDoctors(workplace);
        },
        handleDoctorChange(value) {
            if (value.includes('select-all')) {
                this.selectedDoctor = this.doctors.map(doctor => doctor.id);
            } else if (value.includes('clear-all')) {
                this.selectedDoctor = [];
            } else {
                this.selectedDoctor = value;
            }
        },
        async postSchedules() {
            this.results = [];
            if (!this.selectedDate || !this.timeRange.length || !this.selectedDoctor.length) {
                alert("Please fill in all fields.");
                return;
            }

            const [startTime, endTime] = this.timeRange;
            const schedules = [];
            const start = new Date(`${this.selectedDate}T${startTime}:00`);
            const end = new Date(`${this.selectedDate}T${endTime}:00`);
            const intervalMs = this.interval * 60 * 1000;

            for (let time = start; time < end; time = new Date(time.getTime() + intervalMs)) {
                for (const doctorId of this.selectedDoctor) {
                    schedules.push({
                        DoctorId: doctorId,
                        Date: this.selectedDate,
                        StartTime: time.toTimeString().slice(0, 5),
                        EndTime: new Date(time.getTime() + intervalMs).toTimeString().slice(0, 5),
                    });
                }
            }

            const authToken = localStorage.getItem('authToken');

            console.log(schedules);
            for (const schedule of schedules) {
                const key = schedule.DoctorId + schedule.Date + schedule.StartTime;
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/admin/schedules`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`,
                        },
                        body: JSON.stringify(schedule),
                    });
                    if (response.ok) {
                        this.results.push({ ...schedule, status: 'Success', key });
                    } else {
                        console.error("Error posting schedules:", response.statusText);
                        this.results.push({ ...schedule, status: 'Failed', key });
                    }
                } catch (error) {
                    console.error("Error posting schedules:", error);
                    this.results.push({ ...schedule, status: 'Failed', key });
                }
            }

        },
    },
    mounted() {
        this.fetchClinics();
    },
};
</script>

<style scoped>
.working-schedule {
    font-family: Arial, sans-serif;
    background-color: #f0f4f8;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

h2 {
    font-size: 20px;
    color: #007bff;
    margin: 10px 0;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
}

.form-select,
.form-input {
    width: 100%;
}

.submit-btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #0056b3;
}

.results-section {
    margin-top: 30px;
    text-align: left;
}

.result-item {
    background-color: #fff;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.success {
    color: green;
    font-weight: bold;
}

.failed {
    color: red;
    font-weight: bold;
}

.doctor-result h2 {
    margin-top: 20px;
}

.doctor-result {
    margin-bottom: 20px;
}
</style>
