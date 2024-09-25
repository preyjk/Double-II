<template>
  <div class="flex flex-col items-center">
    <!-- Progress Bar -->
    <div class="relative pt-1 mb-5 w-1/2">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
            Step {{ currentStep }} of {{ steps.length }}
          </span>
        </div>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div :style="{ width: progressPercentage + '%' }"
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="w-full" v-if="currentStepContent">
      <component :is="currentStepContent.component" ref="currentStepComponent" v-model="formData" v-bind="currentStepContent.props" />
    </div>

    <div class="flex w-1/3">
      <div class="flex flex-col md:flex-row justify-between mt-5 w-full">
        <button v-if="currentStep > 1" @click="prevStep"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md md:min-w-32">Back</button>
        <div v-else></div>
        <button v-if="currentStep < steps.length" @click="nextStep"
          class="bg-blue-500 text-white px-4 py-2 rounded-md md:min-w-32">Next</button>
        <button v-if="currentStep === steps.length" @click="handleSubmit"
          class="bg-green-500 text-white px-4 py-2 rounded-md md:min-w-32">Submit</button>
      </div>
    </div>

  </div>
</template>


<script setup>
import { defineModel, ref, computed } from 'vue';
const formData = defineModel();

const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  submitForm: {
    type: Function,
    required: true,
  },
});

const currentStep = ref(1);
const currentStepComponent = ref(null);

const currentStepContent = computed(() => {
  return props.steps[currentStep.value - 1];
});

const progressPercentage = computed(() => {
  return (currentStep.value / props.steps.length) * 100;
});

const nextStep = () => {
  if (currentStepComponent.value?.validate) {
    const isValid = currentStepComponent.value.validate();
    if (isValid && currentStep.value < props.steps.length) {
      currentStep.value++;
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleSubmit = () => {
  props.submitForm();
};
</script>
