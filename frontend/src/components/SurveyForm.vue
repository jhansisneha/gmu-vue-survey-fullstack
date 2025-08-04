<template>
  <div class="container d-flex justify-content-center mt-5">
    <div class="card shadow" style="max-width: 700px; width: 100%;">
      <div class="card-header bg-success text-white">
        <h4 class="mb-0">{{ isEdit ? 'Update Survey' : 'Student Survey Form' }}</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <!-- Name row -->
          <div class="row mb-3">
            <div class="col">
              <input v-model="survey.firstName" class="form-control" placeholder="First Name" required />
            </div>
            <div class="col">
              <input v-model="survey.lastName" class="form-control" placeholder="Last Name" required />
            </div>
          </div>

          <!-- Address info -->
          <input v-model="survey.streetAddress" class="form-control mb-3" placeholder="Street Address" required />

          <div class="row mb-3">
            <div class="col">
              <input v-model="survey.city" class="form-control" placeholder="City" required />
            </div>
            <div class="col">
              <input v-model="survey.state" class="form-control" placeholder="State" required />
            </div>
            <div class="col">
              <input v-model="survey.zip" class="form-control" placeholder="Zip Code" required type="number" />
            </div>
          </div>

          <!-- Contact info -->
          <input v-model="survey.telephoneNumber" class="form-control mb-3" placeholder="Phone Number" required />
          <input v-model="survey.email" class="form-control mb-3" placeholder="Email" required type="email" />

          <!-- Date of Survey -->
          <div class="mb-3">
            <label class="form-label fw-bold">Date of Survey</label>
            <input v-model="survey.dateOfSurvey" class="form-control" type="date" required />
          </div>

          <!-- Likes -->
          <div class="mb-2">
            <label class="form-label fw-bold">What did you like most?</label><br />
            <div class="form-check form-check-inline" v-for="option in likedOptions" :key="option">
              <input class="form-check-input" type="checkbox" :value="option" v-model="survey.likedMost" />
              <label class="form-check-label">{{ option }}</label>
            </div>
            <div v-if="validation.likedMost" class="text-danger small mt-1">Please select at least one option.</div>
          </div>

          <!-- Source -->
          <div class="mb-3">
            <label class="form-label fw-bold">How did you hear about us?</label><br />
            <div class="form-check form-check-inline" v-for="option in interestOptions" :key="option">
              <input class="form-check-input" type="radio" :value="option" v-model="survey.sourceOfInterest" />
              <label class="form-check-label">{{ option }}</label>
            </div>
            <div v-if="validation.sourceOfInterest" class="text-danger small mt-1">Please select a source of interest.</div>
          </div>

          <!-- Dropdown -->
          <div class="mb-3">
            <label class="form-label fw-bold">Likelihood of Recommendation</label><br />
            <select v-model="survey.likelihood" class="form-select w-auto" style="min-width: 200px;">
              <option disabled value="">-- Select --</option>
              <option>Very Likely</option>
              <option>Likely</option>
              <option>Unlikely</option>
            </select>
            <div v-if="validation.likelihood" class="text-danger small mt-1">Please select a likelihood option.</div>
          </div>

          <!-- Comments -->
          <textarea v-model="survey.comments" class="form-control mb-3" placeholder="Additional Comments"></textarea>

          <!-- Buttons -->
          <div class="d-flex justify-content-center mt-4">
            <button type="submit" class="btn btn-success me-3">{{ isEdit ? 'Update' : 'Submit' }}</button>
            <router-link to="/" class="btn btn-secondary">Cancel</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "SurveyForm",
  data() {
    return {
      survey: {
        firstName: '', lastName: '', streetAddress: '', city: '', state: '', zip: '',
        telephoneNumber: '', email: '', dateOfSurvey: '',
        likedMost: [], sourceOfInterest: '', likelihood: '', comments: ''
      },
      likedOptions: ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'],
      interestOptions: ['Friends', 'Television', 'Internet', 'Other'],
      isEdit: false,
      validation: {
        likedMost: false,
        sourceOfInterest: false,
        likelihood: false
      }
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.isEdit = true
      axios.get(`http://localhost:8080/api/surveys`).then(res => {
        const found = res.data.find(s => s.surveyId == id)
        if (found) {
          this.survey = { ...found }
          if (typeof this.survey.likedMost === 'string') {
            this.survey.likedMost = this.survey.likedMost.split(',').map(s => s.trim())
          }
        }
      })
    }
  },
  methods: {
    submitForm() {
      // Reset validation
      this.validation = {
        likedMost: false,
        sourceOfInterest: false,
        likelihood: false
      }

      // Manual checks
      let valid = true
      if (this.survey.likedMost.length === 0) {
        this.validation.likedMost = true
        valid = false
      }
      if (!this.survey.sourceOfInterest) {
        this.validation.sourceOfInterest = true
        valid = false
      }
      if (!this.survey.likelihood) {
        this.validation.likelihood = true
        valid = false
      }

      if (!valid) return

      const method = this.isEdit ? 'put' : 'post'
      const url = this.isEdit
        ? `http://localhost:8080/api/surveys/${this.survey.surveyId}`
        : `http://localhost:8080/api/surveys`
      axios[method](url, this.survey).then(() => {
        this.$router.push('/surveys')
      })
    }
  }
}
</script>
