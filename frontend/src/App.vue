<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #006633; padding: 0.5rem 1rem;">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Left side: GMU Logo -->
      <router-link to="/" class="d-flex align-items-center text-decoration-none">
        <img src="/gmu-logo.png" alt="GMU Logo" style="height: 32px; width: auto;" />
      </router-link>

      <!-- Right side: Title -->
      <span class="text-white fs-5 fw-semibold">GMU Student Survey</span>
    </div>
  </nav>

  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>
