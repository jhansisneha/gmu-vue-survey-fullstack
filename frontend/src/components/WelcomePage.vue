<template>
  <div
    class="welcome-page d-flex align-items-center justify-content-center text-white"
    style="
      min-height: 100vh;
      width: 100%;
      background-image: url('/bg.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <div class="text-center bg-dark bg-opacity-75 p-4 rounded shadow-lg" style="max-width: 600px;">
      <h1 class="mb-4" style="font-size: 2.5rem; color: white;">
        Welcome to George Mason University
      </h1>
      <router-link to="/survey-form" class="btn btn-light btn-lg me-3">Take Survey</router-link>
      <router-link to="/surveys" class="btn btn-outline-light btn-lg">View Surveys</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage'
}
</script>
