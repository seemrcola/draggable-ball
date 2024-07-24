<template>
    <div
        class="
            fade-in-out
            fixed z-2147483646 left-0 top-0 w-[100vw] h-[100vh]
            box-border
            border-[8px] border-indigo-600 border-solid
        "
    />
</template>

<style scoped>
.fade-in-out {
    opacity: 0;
    animation: fadeInOut 1s ease-in-out forwards;
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.7;
    }
    100% {
        opacity: 1;
    }
}
</style>
