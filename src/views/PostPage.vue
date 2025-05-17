<template>
    <main class="page-container">
        <div class="container">
            <article class="post-content markdown-body">
                <h1 class="post-title">{{ post.title }}</h1>
                <div class="post-meta">
                    <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                </div>
                <div class="post-body" v-html="post.content"></div>
            </article>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';

// 配置 marked 使用 highlight.js
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
                console.error('Highlight error:', err);
            }
        }
        return hljs.highlightAuto(code).value;
    },
    langPrefix: 'hljs language-'
});

const route = useRoute();
const router = useRouter();
const post = ref({
    title: '',
    date: '',
    content: ''
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

onMounted(async () => {
    try {
        // 使用新的配置方式
        const postModules = import.meta.glob('@/assets/posts/*.md', {
            eager: true,
            query: '?raw',
            import: 'default'
        });

        const path = `/src/assets/posts/${route.params.slug}.md`;
        console.log('Loading post:', path);

        if (postModules[path]) {
            const text = postModules[path];
            console.log('Raw text:', text);

            // 解析 frontmatter
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

            console.log('Parsed frontmatter:', frontmatter);

            if (frontmatter) {
                const titleMatch = frontmatter.match(/title:\s*(.*)/);
                const dateMatch = frontmatter.match(/date:\s*(.*)/);

                console.log('Title match:', titleMatch);
                console.log('Date match:', dateMatch);

                if (titleMatch && dateMatch) {
                    post.value.title = titleMatch[1].trim();
                    post.value.date = dateMatch[1].trim();
                    post.value.content = marked(content);
                    console.log('Post loaded:', post.value);
                }
            }
        } else {
            console.error('Post not found:', route.params.slug);
            router.push({ path: '/', query: { msg: 'post404' } });
        }
    } catch (error) {
        console.error('Error loading post:', error);
        router.push({ path: '/', query: { msg: 'post404' } });
    }
});
</script>

<style>
/* 全局样式 */
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}

/* 自定义样式 */
.page-container {
    padding: 4rem 0;
}

.post-content {
    max-width: 48rem;
    margin: 0 auto;
    padding: 0 1rem;
}

.post-title {
    font-size: 2.25rem;
    font-weight: bold;
    color: var(--gray-900);
    margin-bottom: 1rem;
}

.post-meta {
    color: var(--gray-600);
    margin-bottom: 2rem;
}

/* 代码块样式优化 */
.markdown-body pre {
    background-color: #f6f8fa;
    border-radius: 6px;
    padding: 16px;
    overflow: auto;
}

.markdown-body code {
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 85%;
    padding: 0.2em 0.4em;
    border-radius: 6px;
    background-color: rgba(175, 184, 193, 0.2);
}

.markdown-body pre code {
    padding: 0;
    background-color: transparent;
}

/* 表格样式优化 */
.markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
    margin: 16px 0;
    width: 100%;
}

.markdown-body table th,
.markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #d0d7de;
}

.markdown-body table tr {
    background-color: #ffffff;
    border-top: 1px solid #d0d7de;
}

.markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa;
}
</style>