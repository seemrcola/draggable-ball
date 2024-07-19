<script setup lang='ts'>
import { DragBubble } from './drag'

const indicatorSize = 12

const dragBubble = DragBubble('.bubble', {
    indicatorSize,
})
</script>

<template>
    <Teleport to="body">
        <div class="bubble h-16 w-16 shadow-lg absolute rounded-full right-0 top-[80%] border">
            <div
                v-if="dragBubble.shadowDirection.value === 'top'"
                :style="{ width: `${indicatorSize}px`, height: `${indicatorSize}px` }"
                class="
                bubble-top
                bg-orange-400 rounded-[4px]
                absolute -top-[12px] left-1/2 transform -translate-x-1/2"
            />
            <div
                v-if="dragBubble.shadowDirection.value === 'left'"
                :style="{ width: `${indicatorSize}px`, height: `${indicatorSize}px` }"
                class="
                bubble-left
                bg-orange-400 rounded-[4px]
                absolute -left-[12px] top-1/2 transform -translate-y-1/2"
            />
            <div
                v-if="dragBubble.shadowDirection.value === 'right'"
                :style="{ width: `${indicatorSize}px`, height: `${indicatorSize}px` }"
                class="
                bubble-right
                bg-orange-400 rounded-[4px]
                absolute -right-[12px] top-1/2 transform -translate-y-1/2"
            />
            <div
                v-if="dragBubble.shadowDirection.value === 'bottom'"
                :style="{ width: `${indicatorSize}px`, height: `${indicatorSize}px` }"
                class="
                bubble-bottom
                w-[12px] h-[12px] bg-orange-400 rounded-[4px]
                absolute -bottom-[12px] left-1/2 transform -translate-x-1/2"
            />
            <slot />
        </div>
    </Teleport>
</template>
