<template>
    <main>
        <PrintInfo />
        <EducationConcept />
        <LatestCourses />
        <el-alert v-if="route.query.msg === 'post404'" title="文章不存在" type="error" :closable="true" show-icon
            style="max-width: 48rem; margin: 2rem auto;" />
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import PrintInfo from '@/components/PrintInfo.vue';
import EducationConcept from '@/components/EducationConcept.vue';
import LatestCourses from '@/components/LatestCourses.vue';

const route = useRoute();
</script>