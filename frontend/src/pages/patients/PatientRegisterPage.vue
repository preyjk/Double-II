<template>
    <div class="page-wrapper">
        <HeaderComponent class="container_header"></HeaderComponent>
        <div class="patient-form">
            <div class="card">
                <h1>Register New Patient</h1>
                <transition name="fade">
                    <div v-if="!showInfomationModal">
                        <form @submit.prevent="submitForm">
                            <div>
                                <label for="name">Name:</label>
                                <input v-model="formData.Name" type="text" id="name" required />
                            </div>

                            <div>
                                <label for="gender">Gender:</label>
                                <select v-model="formData.Gender" id="gender" required>
                                    <option disabled value="">Please select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label for="age">Age:</label>
                                <input v-model="formData.Age" type="number" id="age" required />
                            </div>

                            <div>
                                <label for="phone">Phone:</label>
                                <input v-model="formData.Phone" type="text" id="phone" required />
                            </div>

                            <div>
                                <label for="email">Email:</label>
                                <input v-model="formData.Email" type="email" id="email" required />
                            </div>

                            <div>
                                <label for="address">Address:</label>
                                <input v-model="formData.Address" type="text" id="address" required />
                            </div>

                            <button type="submit">Submit</button>
                        </form>

                        <div>
                            <!-- Add More Detail Link -->
                            <a href="#" @click.prevent="switchToInformationCollectingComponent">Add more Detail</a>
                        </div>

                        <div v-if="message" class="message">
                            <p>{{ message }}</p>
                        </div>
                    </div>
                </transition>

                <!-- Information Collecting Page -->
                <transition name="fade">
                    <InformationCollectingComponent v-if="showInfomationModal" />
                </transition>
            </div>
        </div>
        <FooterComponent class="container_footer"></FooterComponent>
    </div>
</template>

<script>
import { addPatient_user } from "@/api/modules/patients.js";
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import InformationCollectingComponent from "@/components/patients/InformationCollectingComponent.vue";

export default {
    components: {
        HeaderComponent,
        FooterComponent,
        InformationCollectingComponent,
    },
    data() {
        return {
            showInfomationModal: false,  // Controls visibility of InformationCollectingComponent
            formData: {
                Name: "",
                Gender: "",
                Age: "",
                Phone: "",
                Email: "",
                Address: "",
            },
            message: "",
        };
    },
    methods: {
        async submitForm() {
            const token = localStorage.getItem("authToken");
            if (!token) {
                this.message = "Authentication required. Please log in.";
                return;
            }

            try {
                const response = await addPatient_user(this.formData, token);
                this.message = "Patient added successfully!";
                console.log("Response:", response);
                this.$router.push('/profile');
            } catch (error) {
                console.error("Error adding patient:", error);
                this.message = "Failed to add patient. Please try again.";
            }
        },
        switchToInformationCollectingComponent() {
            // Switch the entire form to InformationCollectingComponent
            this.showInfomationModal = true;
        },
    },
};
</script>

<style scoped>
.page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container_header,
.container_footer {
    width: 100%;
    position: relative;
    left: 0;
}

.patient-form {
    flex: 1;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px;
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.patient-form input:focus,
.patient-form select:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    outline: none;
}

.patient-form h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
}

.patient-form label {
    display: block;
    margin-bottom: 5px;
    font-size: 1rem;
    color: #555;
}

.patient-form input,
.patient-form select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.patient-form button {
    width: 100%;
    padding: 12px;
    background-color: #9bbfee;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.patient-form button:hover {
    background-color: #e79d96;
    transform: translateY(-2px);
}

.message {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #333;
    text-align: center;
}

@media (min-width: 768px) {
    .patient-form {
        max-width: 600px;
    }
}

@media (min-width: 1024px) {
    .patient-form {
        max-width: 700px;
    }

    .patient-form h1 {
        font-size: 2.5rem;
    }

    .patient-form label,
    .patient-form input,
    .patient-form select,
    .patient-form button {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .card {
        padding: 20px;
    }

    .patient-form h1 {
        font-size: 1.5rem;
    }

    .patient-form label,
    .patient-form input,
    .patient-form select,
    .patient-form button {
        font-size: 1rem;
    }
}
</style>
