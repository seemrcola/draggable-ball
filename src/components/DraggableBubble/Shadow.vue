<script setup lang='ts'>
import type { Ref } from 'vue'
import { watch } from 'vue'
import type { IRect, TDirection } from './types'

const props = defineProps<{
    direction: Ref<TDirection>
    rect: Ref<IRect>
}>()

watch(
    () => props,
    () => {
        const { direction, rect } = props
        const { x, y, width, height } = rect.value
        const { value: d } = direction

        const shadow = document.querySelector(`[name="shadow-${d}"]`) as HTMLElement
        if (!shadow)
            return
        /* 这里的16是阴影的宽度/高度的一半 */
        if (d === 'left' || d === 'right') {
            shadow.style.top = `${y + height / 2 - 16}px`
        }
        if (d === 'top' || d === 'bottom') {
            shadow.style.left = `${x + width / 2 - 16}px`
        }
    },
    { deep: true },
)
</script>

<template>
    <div
        v-if="props.direction.value === 'left'" name="shadow-left"
        class="absolute z-[2147483647] w-[8px] h-[32px] top-0 left-0 bg-orange-400 rounded-[2px]"
    />
    <div
        v-if="props.direction.value === 'right'" name="shadow-right"
        class="absolute z-[2147483647] w-[8px] h-[32px] top-0 right-0 bg-orange-400 rounded-[2px]"
    />
    <div
        v-if="props.direction.value === 'top'" name="shadow-top"
        class="absolute z-[2147483647] w-[32px] h-[8px] top-0 left-0 bg-orange-400 rounded-[2px]"
    />
    <div
        v-if="props.direction.value === 'bottom'" name="shadow-bottom"
        class="absolute z-[2147483647] w-[32px] h-[8px] bottom-0 left-0 bg-orange-400 rounded-[2px]"
    />
</template>
