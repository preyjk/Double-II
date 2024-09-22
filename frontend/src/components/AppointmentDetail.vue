<template>
  <div class="flex flex-col items-center">
    <div class="bg-gray-100 rounded-lg m-5 p-5 max-w-2xl">
      <h1 class="text-2xl font-bold mb-4">Appointment Details</h1>
      <div class="flex mb-2 text-red-500">
        <p class="w-1/3 font-bold text-right">Reference:</p>
        <p class="w-2/3 pl-4">{{ appointment.bookingReference }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Clinic Name:</p>
        <p class="w-2/3 pl-4">{{ appointment.clinic.name }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Address:</p>
        <p class="w-2/3 pl-4">{{ appointment.clinic.address }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Doctor Name:</p>
        <p class="w-2/3 pl-4">Dr. {{ appointment.doctor.FirstName }} {{ appointment.doctor.LastName }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Date:</p>
        <p class="w-2/3 pl-4">{{ appointment.date }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Timeslot:</p>
        <p class="w-2/3 pl-4">{{ appointment.schedule.StartTime }} - {{ appointment.schedule.EndTime }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">First Name:</p>
        <p class="w-2/3 pl-4">{{ appointment.firstName }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Last Name:</p>
        <p class="w-2/3 pl-4">{{ appointment.lastName }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Date of Birth:</p>
        <p class="w-2/3 pl-4">{{ appointment.dob }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Email:</p>
        <p class="w-2/3 pl-4">{{ appointment.email }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Symptom:</p>
        <p class="w-2/3 pl-4">{{ appointment.symptom }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['appointment']);
</script>
