<template>
    <div
        class="
              fade-in-out
              absolute left-0 top-0 w-[100vw] h-[100vh]
              box-border
              border-[8px] border-indigo-600 border-solid
            "
    />
</template>

<style scoped>
.fade-in-out {
    opacity: 0; /* 初始状态为透明 */
    animation: fadeInOut 1s ease-in-out forwards; /* 应用动画 */
}

@keyframes fadeInOut {
    0% {
        opacity: 0; /* 开始时完全透明 */
    }
    50% {
        opacity: 0.7; /* 中间变为完全不透明 */
    }
    100% {
        opacity: 1; /* 结束时再次变为完全透明 */
    }
}
</style>
