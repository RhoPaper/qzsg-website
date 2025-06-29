<template>
    <main class="page-container">
        <div class="container">
            <article class="post-content markdown-body">
                <nav class="post-breadcrumb">
                    <a href="/" class="breadcrumb-item">首页</a>
                    <span class="breadcrumb-separator">/</span>
                    <a href="/courses" class="breadcrumb-item">课程中心</a>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item current">{{ post.title }}</span>
                </nav>
                <h1 class="post-title">{{ post.title }}</h1>
                <div class="post-meta">
                    <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                </div>
                <div v-if="loading" class="loading-content">
                    <div class="loading-spinner"></div>
                    <p>正在加载文章内容...</p>
                </div>
                <div v-else class="post-body" v-html="post.content"></div>
            </article>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const post = ref({
    title: '',
    date: '',
    content: ''
});
const loading = ref(true);

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

const loadMarkdownDependencies = async () => {
    try {
        const [{ marked }, { default: hljs }] = await Promise.all([
            import('marked'),
            import('highlight.js/lib/core')
        ]);

        const [
            { default: javascript },
            { default: css },
            { default: html },
            { default: json },
            { default: xml },
            { default: bash },
            { default: python }
        ] = await Promise.all([
            import('highlight.js/lib/languages/javascript'),
            import('highlight.js/lib/languages/css'),
            import('highlight.js/lib/languages/xml'),
            import('highlight.js/lib/languages/json'),
            import('highlight.js/lib/languages/xml'),
            import('highlight.js/lib/languages/bash'),
            import('highlight.js/lib/languages/python')
        ]);

        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('js', javascript);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('html', html);
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('json', json);
        hljs.registerLanguage('bash', bash);
        hljs.registerLanguage('shell', bash);
        hljs.registerLanguage('python', python);
        hljs.registerLanguage('py', python);

        await Promise.all([
            import('highlight.js/styles/github.css'),
            import('github-markdown-css/github-markdown.css')
        ]);

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

        return marked;
    } catch (error) {
        console.error('Failed to load markdown dependencies:', error);
        throw error;
    }
};

onMounted(async () => {
    try {
        const marked = await loadMarkdownDependencies();

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
                    document.title = post.value.title;
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
    } finally {
        loading.value = false;
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

/* 面包屑导航样式 */
.post-breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    font-size: 0.875rem;
    color: var(--gray-600);
}

.breadcrumb-item {
    color: var(--gray-600);
    text-decoration: none;
    transition: color 0.2s ease;
}

.breadcrumb-item:hover {
    color: var(--primary);
}

.breadcrumb-item.current {
    color: var(--gray-900);
    font-weight: 500;
}

.breadcrumb-separator {
    margin: 0 0.5rem;
    color: var(--gray-400);
}

/* 加载状态样式 */
.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    color: var(--gray-600);
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--gray-200);
    border-top: 3px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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
    overflow: auto;
    display: block;
}

.markdown-body table th,
.markdown-body table td {
    padding: 6px 13px;
    border: 1px solid var(--gray-200);
}

.markdown-body table th {
    font-weight: 600;
    background-color: var(--gray-50);
}

/* 响应式优化 */
@media (max-width: 768px) {
    .post-title {
        font-size: 1.75rem;
    }

    .post-breadcrumb {
        font-size: 0.75rem;
    }

    .markdown-body {
        padding: 20px;
    }
}
</style>