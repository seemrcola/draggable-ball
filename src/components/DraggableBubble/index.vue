<script setup lang='ts'>
import { DragBubble } from './drag'

const emits = defineEmits(['bubbleClick'])

const indicatorSize = 12
const bubbleId = `bubbleId${Math.random().toString(36).substring(2, 9)}`

const dragBubble = DragBubble(`#${bubbleId}`, {
    indicatorSize,
})

function handleClick() {
    // 当非拖动状态时，点击触发 bubbleClick 事件
    if (dragBubble.getClickStatus()) {
        emits('bubbleClick')
    }
}
</script>

<template>
    <Teleport to="body">
        <div
            :id="bubbleId"
            class="h-16 w-16 shadow-lg fixed z-2147483647 right-0 top-[80%] border rounded-full"
            @click="handleClick"
        >
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
