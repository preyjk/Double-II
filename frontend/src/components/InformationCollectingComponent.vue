<template>
  <div class="enrollment-form">
    <h1>Enrol as our Patient</h1>
    <p>
      When you and your family enrol at FRW, you’ll get expert care and advice
      that’s focused on you. We’ll develop a long-term relationship and get to
      know your medical needs.
    </p>
    <p class="spaced-paragraph">
      You’ll save money by paying lower fees compared with casual visits. Plus,
      you can get access to an online patient portal to book appointments, order
      repeat scripts and check test results. It’s free to enrol and this form
      only takes a few minutes. You will need appropriate ID plus the relevant
      visa if you are not a New Zealand citizen.
    </p>
    <form @submit.prevent="submitForm">
      <h2>Key Information When Enrolling at FRW</h2>
      <div class="form-group">
        <label for="region">Region*</label>
        <select v-model="form.region" required>
          <option value="" disabled>Select Region</option>
          <option value="Auckland">Auckland</option>
          <!-- Add more regions as needed -->
        </select>
      </div>
      <div class="form-group">
        <label for="practice">Practice*</label>
        <select v-model="form.practice" required>
          <option value="" disabled>Select Centre</option>
          <!-- Add practice centers dynamically based on region selection -->
        </select>
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="form.title" type="text" />
      </div>
      <div class="form-group">
        <label for="surname">Surname(s) (as per passport)*</label>
        <input v-model="form.surname" type="text" required />
      </div>
      <div class="form-group">
        <label for="firstname">First Name(s) (as per passport)*</label>
        <input v-model="form.firstname" type="text" required />
      </div>
      <div class="form-group">
        <label for="middlename">Middle Name(s) (as per passport)</label>
        <input v-model="form.middlename" type="text" />
      </div>
      <div class="form-group">
        <label for="preferredname">Preferred Name</label>
        <input v-model="form.preferredname" type="text" />
      </div>
      <div class="form-group">
        <label for="address">Usual Residential Address*</label>
        <input v-model="form.address" type="text" required />
      </div>
      <div class="form-group">
        <label for="phone">Primary Number (mobile preferred)*</label>
        <input v-model="form.phone" type="text" required />
      </div>
      <div class="form-group">
        <label for="birthDetails">Birth Details</label>
        <select v-model="form.sex" required>
          <option value="" disabled>Assigned Sex at Birth</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Indeterminate">Indeterminate</option>
        </select>
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select v-model="form.gender" required>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Another gender">Another gender</option>
          <option value="Prefer not to answer">Prefer not to answer</option>
          <option value="Don't know">Don't know</option>
        </select>
      </div>
      <div class="form-group">
        <label for="pronouns">Gender Pronouns</label>
        <select v-model="form.pronouns" required>
          <option value="" disabled>Select Pronouns</option>
          <option value="He / him / his / himself">
            He / him / his / himself
          </option>
          <option value="They / them / theirs / themselves">
            They / them / theirs / themselves
          </option>
          <option value="She / her / hers / herself">
            She / her / hers / herself
          </option>
          <option value="Other pronouns">Other pronouns</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth*</label>
        <input v-model="form.dob" type="date" required />
      </div>
      <div class="form-group">
        <label for="countryOfBirth">Country of Birth*</label>
        <input v-model="form.countryOfBirth" type="text" required />
      </div>
      <div class="form-group">
        <label for="placeOfBirth">Place of Birth*</label>
        <input v-model="form.placeOfBirth" type="text" required />
      </div>
      <div class="form-group">
        <label for="nhiNumber">NHI Number (if known)</label>
        <input v-model="form.nhiNumber" type="text" />
      </div>
      <div class="form-group">
        <label for="emergencyContact"
          >Emergency Contact Person / Next of Kin*</label
        >
        <input
          v-model="form.emergencyContact.name"
          type="text"
          placeholder="First Name"
          required
        />
        <input
          v-model="form.emergencyContact.surname"
          type="text"
          placeholder="Last Name"
          required
        />
        <input
          v-model="form.emergencyContact.phone"
          type="text"
          placeholder="Mobile Phone (must be a NZ number)"
          required
        />
        <select v-model="form.emergencyContact.relationship" required>
          <option value="" disabled>Relationship to the Patient</option
          >
          <option value="Parent/Guardian/Caregiver">
            Parent/Guardian/Caregiver
          </option>
          <!-- Add more relationships as needed -->
        </select>
      </div>
      <div class="form-group spaced-form-group">
        <label
          >Is the patient under 16 years or for some reason unable to consent on
          their own behalf?</label
        >
        <input v-model="form.under16" type="radio" value="Yes" required /> Yes
        <input v-model="form.under16" type="radio" value="No" required /> No
      </div>
      <div class="form-group">
        <label>Ethnicity*</label>
        <div v-for="ethnicity in ethnicities" :key="ethnicity">
          <input type="checkbox" :value="ethnicity" v-model="form.ethnicity" />
          {{ ethnicity }}
        </div>
      </div>
      <div class="form-group">
        <label>Smoking/Vaping</label>
        <div v-for="status in smokingStatuses" :key="status">
          <input type="checkbox" :value="status" v-model="form.smoking" />
          {{ status }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Your Email Address*</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div class="form-group">
        <label>Do you want to register for our online portal?*</label>
        <input v-model="form.onlinePortal" type="radio" value="Yes" required />
        Yes
        <input v-model="form.onlinePortal" type="radio" value="No" required />
        No
      </div>
      <div class="form-group">
        <label
          >Do you consent to receive test results/notice of recalls/other info
          via text/email message?*</label
        >
        <input v-model="form.consent" type="radio" value="Yes" required /> Yes
        <input v-model="form.consent" type="radio" value="No" required /> No
      </div>
      <div class="form-group">
        <label>Transfer of Records*</label
        >
        <input
          v-model="form.transferRecords"
          type="radio"
          value="Yes"
          required
        />
        Yes
        <input
          v-model="form.transferRecords"
          type="radio"
          value="No"
          required
        />
        No
      </div>
      <div class="form-group">
        <label>Entitlement*</label>
        <input v-model="form.entitlement" type="radio" value="Yes" required />
        Yes
        <input v-model="form.entitlement" type="radio" value="No" required /> No
      </div>
      <div class="form-group">
        <label>Eligibility*</label
        >
        <select v-model="form.eligibility" required>
          <option value="" disabled>Select Eligibility</option>
          <option value="NZ Citizen">I am a New Zealand citizen</option>
          <option value="Resident Visa">
            I hold a resident visa or permanent resident visa
          </option>
          <!-- Add more eligibility options as needed -->
        </select>
      </div>
      <div class="form-group">
        <label>Proof of Eligibility*</label>
        <input type="file" @change="handleFileUpload" required />
      </div>
      <div class="form-group">
        <label>Enrolment Agreement*</label>
        <input v-model="form.enrolmentAgreement" type="checkbox" required /> I
        accept the above enrolment agreement
      </div>
      <div class="form-group">
        <label>Signatory*</label>
        <select v-model="form.signatory" required>
          <option value="" disabled>Select Signatory</option>
          <option value="Self-signing">Self-signing</option>
          <option value="Parent/Guardian/Caregiver">
            Parent/Guardian/Caregiver
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Electronic Signature*</label>
        <input v-model="form.signature" type="text" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: "",
        practice: "",
        title: "",
        surname: "",
        firstname: "",
        middlename: "",
        preferredname: "",
        address: "",
        phone: "",
        sex: "",
        gender: "",
        pronouns: "",
        dob: "",
        countryOfBirth: "",
        placeOfBirth: "",
        nhiNumber: "",
        emergencyContact: {
          name: "",
          surname: "",
          phone: "",
          relationship: "",
        },
        under16: "",
        ethnicity: [],
        smoking: [],
        email: "",
        onlinePortal: "",
        consent: "",
        transferRecords: "",
        entitlement: "",
        eligibility: "",
        file: null,
        enrolmentAgreement: false,
        signatory: "",
        signature: "",
      },
      ethnicities: [
        "NZ European",
        "Maori",
        "Samoan",
        "Cook Island Maori",
        "Tongan",
        "Niuean",
        "Chinese",
        "Indian",
        "Other",
        "I don't know my ethnicity",
        "I don't want to state my ethnicity",
      ],
      smokingStatuses: [
        "Current smoker",
        "Ex-smoker",
        "Current vaper",
        "Ex-vaper",
        "Never smoked/vaped",
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.file = event.target.files[0];
    },
    submitForm() {
      // Form submission logic
      console.log("Form submitted:", this.form);
    },
  },
};
</script>

<style>
/* General Styles */
.enrollment-form {
  width: 100%;
  margin: auto;
  padding: 30px;
  background: #e1f5fe; /* Light blue background */
  max-width: 800px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for soft depth */
}

.enrollment-form h1,
.enrollment-form h2 {
  text-align: center;
  color: #0277bd; /* Blue that complements the light blue background */
  margin-bottom: 20px;
  line-height: 1.6;
}

.enrollment-form h1 {
  font-size: 32px;
  font-weight: bold;
  margin-top: 0;
}

.enrollment-form h1 + p {
  margin-top: 20px;
}

.spaced-paragraph {
  margin-top: 30px;
  margin-bottom: 30px;
}

.form-group {
  width: 100%;
  margin-bottom: 20px; /* Uniform margin for all form groups */
}

.spaced-form-group {
  margin-top: 30px; /* Additional space for specific form group */
}

/* Form styles */
.enrollment-form form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: auto;
}

.enrollment-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #01579b; /* Deeper blue for text */
  text-align: left;
  letter-spacing: 0.5px;
}

.enrollment-form input[type="text"],
.enrollment-form input[type="date"],
.enrollment-form input[type="email"],
.enrollment-form select {
  width: 100%;
  padding: 12px;
  background-color: #ffffff; /* White background for input fields */
  box-sizing: border-box;
  border: 1px solid #b3e5fc; /* Very light blue border, less prominent */
  border-radius: 4px;
  letter-spacing: 0.5px;
  line-height: 1.5;
}

.enrollment-form input[type="radio"],
.enrollment-form input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

.enrollment-form input[type="text"]:focus,
.enrollment-form input[type="date"]:focus,
.enrollment-form input[type="email"]:focus,
.enrollment-form select:focus {
  box-shadow: 0 0 0 2px #29b6f6; /* Light blue shadow to match theme */
}

.enrollment-form button {
  padding: 12px 20px;
  background-color: #29b6f6; /* Light blue theme color */
  color: white;
  border: none;
  border-radius: 4px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.enrollment-form button:hover {
  background-color: #0288d1; /* Slightly darker blue on hover */
}
</style>


