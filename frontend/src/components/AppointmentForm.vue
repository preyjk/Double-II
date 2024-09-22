<template>
  <div class="flex flex-col items-center">
    <div class="bg-gray-100 rounded rounded-lg p-10">
      <h1 class="text-2xl font-bold mb-4">Appointment Details</h1>
      <div class="mb-4">
        <div class="flex mb-2">
          <p class="w-1/3 font-bold">Clinic:</p>
          <p class="w-2/3">{{ formData.clinic.name }}</p>
        </div>
        <div class="flex mb-2">
          <p class="w-1/3 font-bold">Address:</p>
          <p class="w-2/3">{{ formData.clinic.address }}</p>
        </div>
        <div class="flex mb-2">
          <p class="w-1/3 font-bold">Doctor:</p>
          <p class="w-2/3">Dr. {{ formData.doctor.FirstName }} {{ formData.doctor.LastName }}</p>
        </div>
        <div class="flex mb-2">
          <p class="w-1/3 font-bold">Date:</p>
          <p class="w-2/3">{{ formData.date }}</p>
        </div>
        <div class="flex mb-2">
          <p class="w-1/3 font-bold">Timeslot:</p>
          <p class="w-2/3">{{ formData.schedule.StartTime }} - {{ formData.schedule.EndTime }}</p>
        </div>
      </div>
      <div class="mb-4">
        <h2 class="text-lg font-semibold">Patient Information</h2>
        <form>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name</label>
            <input v-model="formData.firstName" type="text" id="firstName"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">Last Name</label>
            <input v-model="formData.lastName" type="text" id="lastName"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="dob">Date of Birth</label>
            <input v-model="formData.dob" type="date" id="dob"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input v-model="formData.email" type="email" id="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="symptom">Symptom</label>
            <textarea v-model="formData.symptom" id="symptom"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required></textarea>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentForm",
  components: {},
  props: ['modelValue'],
  computed: {
    formData: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    }
  },
}

</script>