<script setup lang='ts'>
import DraggableBall from './components/DraggableBubble/index.vue'

function bubbleClick(event: MouseEvent) {
    console.log(event, 'clicked')
    // alert('点击成功')
}

console.log('hello world')
</script>

<template>
    <div class="relative h-full w-full">
        <DraggableBall @bubble-click="bubbleClick" />
    </div>
</template>

<style>
html,body,#app {
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>
