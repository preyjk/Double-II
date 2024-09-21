<template>
  <div class="flex flex-col items-center">
    <div class="bg-gray-100 rounded-lg m-5 p-5 min-w-xl max-w-2xl">
      <h1 class="text-2xl font-bold mb-4">Appointment Details</h1>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Clinic Name:</p>
        <p class="w-2/3">{{ appointment.clinic.name }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Address:</p>
        <p class="w-2/3">{{ appointment.clinic.address }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Doctor Name:</p>
        <p class="w-2/3">Dr. {{ appointment.doctor.FirstName }} {{ appointment.doctor.LastName }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Date:</p>
        <p class="w-2/3">{{ appointment.date }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Timeslot:</p>
        <p class="w-2/3">{{ appointment.schedule.StartTime }} - {{ appointment.schedule.EndTime }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">First Name:</p>
        <p class="w-2/3">{{ appointment.firstName }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Last Name:</p>
        <p class="w-2/3">{{ appointment.lastName }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Date of Birth:</p>
        <p class="w-2/3">{{ appointment.dob }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Email:</p>
        <p class="w-2/3">{{ appointment.email }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right pr-4">Symptom:</p>
        <p class="w-2/3">{{ appointment.symptom }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentDetails",
  props: {
    appointment: {
      type: Object,
      required: true
    }
  }
}
</script>
