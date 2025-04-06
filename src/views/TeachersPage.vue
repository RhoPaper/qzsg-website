<template>
  <main class="page-container">
    <div class="container">
      <h1 class="page-title">师资团队</h1>
      <TeacherTeam />
    </div>
  </main>
</template>

<script setup>
import TeacherTeam from '@/components/TeacherTeam.vue';
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