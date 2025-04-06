<template>
  <main class="page-container">
    <div class="container">
      <h1 class="page-title">机构介绍</h1>
      <SchoolProfile />
    </div>
  </main>
</template>

<script setup>
import SchoolProfile from '@/components/SchoolProfile.vue';
</script>

<style scoped>
.page-container {
  padding: 4rem 0;
}

.page-title {
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}
</style>