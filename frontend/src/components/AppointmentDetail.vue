<template>
  <div class="flex flex-col items-center">
    <div class="bg-gray-100 rounded-lg m-5 p-5 max-w-2xl">
      <h1 class="text-2xl font-bold mb-4">Appointment Details</h1>
      <div class="flex mb-2 text-red-500">
        <p class="w-1/3 font-bold text-right">Reference:</p>
        <p class="w-2/3 pl-4">{{ appointment.BookingReference }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Clinic Name:</p>
        <p class="w-2/3 pl-4">{{ appointment.Clinic }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Address:</p>
        <p class="w-2/3 pl-4">{{ appointment.ClinicAddress }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Doctor Name:</p>
        <p class="w-2/3 pl-4">Dr. {{ appointment.DoctorName }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Date:</p>
        <p class="w-2/3 pl-4">{{ appointment.Date }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Timeslot:</p>
        <p class="w-2/3 pl-4">{{ appointment.StartTime }} - {{ appointment.EndTime }}</p>
      </div>

      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">First Name:</p>
        <p class="w-2/3 pl-4">{{ appointment.FirstName }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Last Name:</p>
        <p class="w-2/3 pl-4">{{ appointment.LastName }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Date of Birth:</p>
        <p class="w-2/3 pl-4">{{ appointment.DateOfBirth }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Email:</p>
        <p class="w-2/3 pl-4">{{ appointment.Email }}</p>
      </div>
      <div class="flex mb-2">
        <p class="w-1/3 font-bold text-right">Symptom:</p>
        <p class="w-2/3 pl-4">{{ appointment.Symptom }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['appointment']);
console.debug('Appointment Detail', props.appointment);
</script>
