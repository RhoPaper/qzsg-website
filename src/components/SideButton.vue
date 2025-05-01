<template>
    <div class="hero-side-buttons">
        <a href="#top">
            <button class="side-button pop-in" style="animation-delay: 0.4s;">
                <i class="ri-corner-left-up-line"></i>
            </button>
        </a>

        <a href="/about">
            <button class="side-button pop-in" style="animation-delay: 0.5s;">
                <i class="ri-search-line"></i>
            </button>
        </a>

        <a href="/activities">
            <button class="side-button pop-in" style="animation-delay: 0.6s;">
                <i class="ri-question-line"></i>
            </button>
        </a>

        <a href="/teachers">
            <button class="side-button pop-in" style="animation-delay: 0.7s;">
                <i class="ri-refresh-line"></i>
            </button>
        </a>
    </div>
</template>
<style scoped>
.hero-side-buttons {
    position: fixed;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    z-index: 20;
}

.side-button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--secondary);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    transition: all 0.3s;
}

.side-button:hover {
    background-color: rgba(245, 166, 35, 0.9);
    transform: scale(1.2) rotate(15deg);
}

@keyframes popIn {
    0% {
        transform: scale(0) rotate(-45deg);
        opacity: 0;
    }
    60% {
        transform: scale(1.2) rotate(15deg);
        opacity: 0.8;
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}

.pop-in {
    animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
}
</style>