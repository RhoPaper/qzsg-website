<template>
    <img :src="currentSrc" :alt="alt" :class="imgClass" :style="imgStyle" @load="onLoad" @error="onError" loading="lazy"
        decoding="async" />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
    },
    imgClass: {
        type: String,
        default: ''
    },
    imgStyle: {
        type: Object,
        default: () => ({})
    },
    threshold: {
        type: Number,
        default: 0.1
    }
})

const emit = defineEmits(['load', 'error'])

const isLoaded = ref(false)
const isError = ref(false)
const isInView = ref(false)

const currentSrc = computed(() => {
    if (isInView.value && !isError.value) {
        return props.src
    }
    return props.placeholder
})

const onLoad = () => {
    isLoaded.value = true
    emit('load')
}

const onError = () => {
    isError.value = true
    emit('error')
}

// 使用 Intersection Observer 实现懒加载
onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isInView.value = true
                    observer.unobserve(entry.target)
                }
            })
        },
        {
            threshold: props.threshold,
            rootMargin: '50px'
        }
    )

    // 观察当前组件
    const imgElement = document.querySelector(`img[src="${props.placeholder}"]`)
    if (imgElement) {
        observer.observe(imgElement)
    }

    // 清理函数
    return () => {
        observer.disconnect()
    }
})

// 监听 src 变化
watch(() => props.src, (newSrc) => {
    if (newSrc && isInView.value) {
        isError.value = false
        isLoaded.value = false
    }
})
</script>

<style scoped>
img {
    transition: opacity 0.3s ease-in-out;
}

img[src*="data:image/svg+xml"] {
    opacity: 0.7;
}

img:not([src*="data:image/svg+xml"]) {
    opacity: 1;
}
</style>