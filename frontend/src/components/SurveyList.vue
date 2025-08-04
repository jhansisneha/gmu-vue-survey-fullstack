<template>
  <div class="container mt-5">
    <div class="card shadow">
      <div class="card-header bg-success text-white">
        <h4 class="mb-0">All Surveys</h4>
      </div>
      <div class="card-body p-3">
        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle text-nowrap" style="min-width: 1200px;">
            <thead class="table-success text-center">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Phone</th>
                <th>Survey Date</th>
                <th>Liked Most</th>
                <th>Source</th>
                <th>Likelihood</th>
                <th style="min-width: 200px;">Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="s in surveys" :key="s.surveyId">
                <td>{{ s.firstName }} {{ s.lastName }}</td>
                <td>{{ s.email }}</td>
                <td style="white-space: normal;">{{ s.streetAddress }}</td>
                <td>{{ s.city }}</td>
                <td>{{ s.state }}</td>
                <td>{{ s.zip }}</td>
                <td>{{ s.telephoneNumber }}</td>
                <td>{{ s.dateOfSurvey }}</td>
                <td style="white-space: normal;">{{ Array.isArray(s.likedMost) ? s.likedMost.join(', ') : s.likedMost }}</td>
                <td>{{ s.sourceOfInterest }}</td>
                <td>{{ s.likelihood }}</td>
                <td style="white-space: normal;">{{ s.comments }}</td>
                <td>
                  <div class="d-flex justify-content-center gap-2">
                    <router-link :to="`/survey-form/${s.surveyId}`" class="btn btn-warning btn-sm">Edit</router-link>
                    <button @click="deleteSurvey(s.surveyId)" class="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="surveys.length === 0" class="text-center text-muted mt-3">
          No survey records found.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "SurveyList",
  data() {
    return {
      surveys: []
    }
  },
  mounted() {
    this.loadSurveys()
  },
  methods: {
    loadSurveys() {
      axios.get('http://localhost:8080/api/surveys').then(res => {
        this.surveys = res.data
      })
    },
    deleteSurvey(id) {
      if (confirm("Are you sure you want to delete this survey?")) {
        axios.delete(`http://localhost:8080/api/surveys/${id}`).then(() => {
          this.loadSurveys()
        })
      }
    }
  }
}
</script>
