<template>
  <div class="enrollment-form">
    <h1>Enrol as our Patient</h1>
    <p>
      When you and your family enrol at The Doctors, you’ll get expert care and
      advice that’s focused on you. We’ll develop a long-term relationship and
      get to know your medical needs.
    </p>
    <p>
      You’ll save money by paying lower fees compared with casual visits. Plus,
      you can get access to an online patient portal to book appointments, order
      repeat scripts and check test results. It’s free to enrol and this form
      only takes a few minutes. You will need appropriate ID plus the relevant
      visa if you are not a New Zealand citizen.
    </p>
    <form @submit.prevent="submitForm">
      <h2>Key Information When Enrolling at The Doctors</h2>
      <div>
        <label for="region">Region*</label>
        <select v-model="form.region" required>
          <option value="" disabled>Select Region</option>
          <option value="Auckland">Auckland</option>
          <!-- Add more regions as needed -->
        </select>
      </div>
      <div>
        <label for="practice">Practice*</label>
        <select v-model="form.practice" required>
          <option value="" disabled>Select Centre</option>
          <!-- Add practice centers dynamically based on region selection -->
        </select>
      </div>
      <div>
        <label for="title">Title</label>
        <input v-model="form.title" type="text" />
      </div>
      <div>
        <label for="surname">Surname(s) (as per passport)*</label>
        <input v-model="form.surname" type="text" required />
      </div>
      <div>
        <label for="firstname">First Name(s) (as per passport)*</label>
        <input v-model="form.firstname" type="text" required />
      </div>
      <div>
        <label for="middlename">Middle Name(s) (as per passport)</label>
        <input v-model="form.middlename" type="text" />
      </div>
      <div>
        <label for="preferredname">Preferred Name</label>
        <input v-model="form.preferredname" type="text" />
      </div>
      <div>
        <label for="address">Usual Residential Address*</label>
        <input v-model="form.address" type="text" required />
      </div>
      <div>
        <label for="phone">Primary Number (mobile preferred)*</label>
        <input v-model="form.phone" type="text" required />
      </div>
      <div>
        <label for="birthDetails">Birth Details</label>
        <select v-model="form.sex" required>
          <option value="" disabled>Assigned Sex at Birth</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Indeterminate">Indeterminate</option>
        </select>
      </div>
      <div>
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
      <div>
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
      <div>
        <label for="dob">Date of Birth*</label>
        <input v-model="form.dob" type="date" required />
      </div>
      <div>
        <label for="countryOfBirth">Country of Birth*</label>
        <input v-model="form.countryOfBirth" type="text" required />
      </div>
      <div>
        <label for="placeOfBirth">Place of Birth*</label>
        <input v-model="form.placeOfBirth" type="text" required />
      </div>
      <div>
        <label for="nhiNumber">NHI Number (if known)</label>
        <input v-model="form.nhiNumber" type="text" />
      </div>
      <div>
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
          <option value="" disabled>Relationship to the Patient</option>
          <option value="Parent/Guardian/Caregiver">
            Parent/Guardian/Caregiver
          </option>
          <!-- Add more relationships as needed -->
        </select>
        <label
          >Is the patient under 16 years or for some reason unable to consent on
          their own behalf?</label
        >
        <input v-model="form.under16" type="radio" value="Yes" required /> Yes
        <input v-model="form.under16" type="radio" value="No" required /> No
      </div>
      <div>
        <label>Ethnicity*</label>
        <div v-for="ethnicity in ethnicities" :key="ethnicity">
          <input type="checkbox" :value="ethnicity" v-model="form.ethnicity" />
          {{ ethnicity }}
        </div>
      </div>
      <div>
        <label>Smoking/Vaping</label>
        <div v-for="status in smokingStatuses" :key="status">
          <input type="checkbox" :value="status" v-model="form.smoking" />
          {{ status }}
        </div>
      </div>
      <div>
        <label for="email">Your Email Address*</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Do you want to register for our online portal?*</label>
        <input v-model="form.onlinePortal" type="radio" value="Yes" required />
        Yes
        <input v-model="form.onlinePortal" type="radio" value="No" required />
        No
      </div>
      <div>
        <label
          >Do you consent to receive test results/notice of recalls/other info
          via text/email message?*</label
        >
        <input v-model="form.consent" type="radio" value="Yes" required /> Yes
        <input v-model="form.consent" type="radio" value="No" required /> No
      </div>
      <div>
        <label>Transfer of Records*</label>
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
      <div>
        <label>Entitlement*</label>
        <input v-model="form.entitlement" type="radio" value="Yes" required />
        Yes
        <input v-model="form.entitlement" type="radio" value="No" required /> No
      </div>
      <div>
        <label>Eligibility*</label>
        <select v-model="form.eligibility" required>
          <option value="" disabled>Select Eligibility</option>
          <option value="NZ Citizen">I am a New Zealand citizen</option>
          <option value="Resident Visa">
            I hold a resident visa or permanent resident visa
          </option>
          <!-- Add more eligibility options as needed -->
        </select>
      </div>
      <div>
        <label>Proof of Eligibility*</label>
        <input type="file" @change="handleFileUpload" required />
      </div>
      <div>
        <label>Enrolment Agreement*</label>
        <input v-model="form.enrolmentAgreement" type="checkbox" required /> I
        accept the above enrolment agreement
      </div>
      <div>
        <label>Signatory*</label>
        <select v-model="form.signatory" required>
          <option value="" disabled>Select Signatory</option>
          <option value="Self-signing">Self-signing</option>
          <option value="Parent/Guardian/Caregiver">
            Parent/Guardian/Caregiver
          </option>
        </select>
      </div>
      <div>
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
/* Add your styles here */
.enrollment-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.enrollment-form h1,
.enrollment-form h2 {
  text-align: center;
}
.enrollment-form form {
  display: flex;
  flex-direction: column;
}
.enrollment-form form div {
  margin-bottom: 15px;
}
.enrollment-form form label {
  margin-bottom: 5px;
  font-weight: bold;
}
.enrollment-form form input,
.enrollment-form form select,
.enrollment-form form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.enrollment-form form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.enrollment-form form button:hover {
  background-color: #0056b3;
}
</style>
