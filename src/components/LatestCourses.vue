<template>
  <section class="latest-courses">
    <div class="container">
      <div class="courses-title-container">
        <h2 class="courses-title">最新课程 / News</h2>
        <div class="courses-title-line"></div>
      </div>
      <div class="courses-container">
        <div class="featured-course">
          <div class="featured-course-card">
            <div class="concept-image-container" ref="imageContainer">
              <el-carousel :interval="3000" type="" height="20rem" :autoplay="true" indicator-position=""
                trigger="click" @change="handleCarouselChange">
                <el-carousel-item v-for="(image, index) in conceptImages" :key="index">
                  <RouterLink :to="{ path: image.link }" class="concept-image-wrapper">
                    <img :src="image.url" :alt="image.title" class="concept-image">
                  </RouterLink>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="featured-course-content">
              <h3 class="featured-course-title">{{ currentImage.title }}</h3>
              <p class="featured-course-description">{{ currentImage.description }}</p>
              <div class="featured-course-meta">
                <span class="course-date">{{ formatDate(currentImage.date) }}</span>
                <router-link :to="{ path: currentImage.link }" class="course-item-link">查看详情</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="course-list">
          <div v-for="(post, index) in posts.slice(3, 7)" :key="index" class="course-item">
            <div class="course-item-header">
              <h3 class="course-item-title">{{ post.title }}</h3>
              <span class="course-item-date">{{ formatDate(post.date) }}</span>
            </div>
            <p class="course-item-description">
              {{ post.excerpt }}
            </p>
            <div class="course-item-footer">
              <router-link :to="`/p/${post.slug}`" class="course-item-link">查看详情</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const posts = ref([]);
const currentImage = ref({});
const conceptImages = ref([]);

const handleCarouselChange = (index) => {
  currentImage.value = conceptImages.value[index];
};

onMounted(async () => {
  try {
    const modules = import.meta.glob('@/assets/posts/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    });

    const postFiles = Object.keys(modules);
    console.log('Found post files:', postFiles);

    const postsData = postFiles.map(filePath => {
      const text = modules[filePath];
      const slug = filePath.split('/').pop().replace('.md', '');

      try {
        const lines = text.split('\n');
        let frontmatter = '';
        let content = '';
        let inFrontmatter = false;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim() === '---') {
            if (!inFrontmatter) {
              inFrontmatter = true;
              continue;
            } else {
              inFrontmatter = false;
              continue;
            }
          }

          if (inFrontmatter) {
            frontmatter += line + '\n';
          } else if (!inFrontmatter && line.trim() !== '') {
            content = lines.slice(i).join('\n');
            break;
          }
        }

        if (frontmatter) {
          const titleMatch = frontmatter.match(/title:\s*(.*)/);
          const dateMatch = frontmatter.match(/date:\s*(.*)/);
          const imageMatch = frontmatter.match(/image:\s*(.*)/);

          if (titleMatch && dateMatch) {
            return {
              title: titleMatch[1].trim(),
              date: dateMatch[1].trim(),
              excerpt: getExcerpt(content),
              slug: slug,
              image: imageMatch ? imageMatch[1].trim() : null
            };
          }
        }
      } catch (error) {
        console.error('Error parsing file:', filePath, error);
      }
      return null;
    });

    const validPosts = postsData.filter(post => post !== null);
    const sortedPosts = validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    posts.value = sortedPosts;

    // 设置轮播图数据
    const latestPosts = sortedPosts.slice(0, 2);
    conceptImages.value = latestPosts.map(post => ({
      url: post.image || new URL('../assets/static/image/default-post.avif', import.meta.url).href,
      title: post.title,
      description: post.excerpt,
      date: post.date,
      link: `/p/${post.slug}`
    }));

    // 设置初始当前图片
    currentImage.value = conceptImages.value[0];
  } catch (error) {
    console.error('Error loading posts:', error);
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getExcerpt = (content) => {
  try {
    const plainText = content
      .replace(/[#*`_]/g, '')
      .replace(/\n/g, ' ')
      .trim();
    return plainText.slice(0, 100) + (plainText.length > 100 ? '...' : '');
  } catch (error) {
    console.error('Error generating excerpt:', error);
    return '无法生成摘要';
  }
};
</script>

<style scoped>
.latest-courses {
  padding: 4rem 0;
  background-color: var(--gray-50);
}

.courses-title-container {
  text-align: center;
  margin-bottom: 3rem;
}

.courses-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-800);
  display: inline-block;
  position: relative;
}

.courses-title-line {
  width: 5rem;
  height: 0.25rem;
  background-color: var(--secondary);
  margin: 1rem auto 0;
}

.courses-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .courses-container {
    flex-direction: row;
  }
}

.featured-course {
  width: 100%;
}

@media (min-width: 768px) {
  .featured-course {
    width: 60%;
  }
}

.featured-course-card {
  background-color: var(--white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
  height: 90%;
  display: flex;
  flex-direction: column;
}

.concept-image-container {
  width: 100%;
  height: 20rem;
  overflow: hidden;
}

.concept-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.featured-course-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.featured-course-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--gray-800);
  margin-bottom: 1rem;
}

.featured-course-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 1.5rem;
  flex-grow: 1;
  line-height: 1.5;
}

.featured-course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.course-date {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.course-list {
  width: 100%;
}

@media (min-width: 768px) {
  .course-list {
    width: 40%;
  }
}

.course-item {
  background-color: var(--white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s;
}

.course-item:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.course-item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.course-item-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--gray-800);
}

.course-item-date {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.course-item-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin: 0.5rem 0;
}

.course-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-item-link {
  font-size: 0.875rem;
  color: var(--primary);
  text-decoration: none;
}

.course-item-link:hover {
  text-decoration: underline;
}

/* 轮播图样式优化 */
:deep(.el-carousel__item) {
  padding: 0.5rem;
}

:deep(.el-carousel__item--card) {
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(.el-carousel__item--card.is-active) {
  transform: translateX(0) scale(1.1) !important;
}

:deep(.el-carousel__item--card.is-in-stage) {
  cursor: pointer;
}
</style>