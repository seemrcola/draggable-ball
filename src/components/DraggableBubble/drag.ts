import { createApp, onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import type { IRect, TDirection, TLineFunc } from './types'
import Border from './Border.vue'
import Shadow from './Shadow.vue'

interface Config {
    indicatorSize: number
}

export function DragBubble(domQuery: string, config: Config) {
    const dom = ref<HTMLDivElement | null>(null)
    const lastCoord = { x: 0, y: 0 }
    let isDragging = false
    let borderTemplate: any
    let shadowTemplate: any
    let borderBox: any
    let shadowBox: any

    let viewWidth = 0
    let viewHeight = 0

    let linesFunc: { l1: TLineFunc, l2: TLineFunc } = { l1: () => 0, l2: () => 0 }

    const bubbleRect = ref<IRect>({ x: 0, y: 0, width: 0, height: 0 })
    const shadowDirection = ref<TDirection>('right')

    function resizeListener() {
        init()
    }

    onMounted(() => {
        const el = document.querySelector(domQuery) as HTMLDivElement
        dom.value = el
        window.addEventListener('resize', resizeListener)
        init()
    })

    onUnmounted(() => {
        const el = dom.value
        if (!el)
            return
        el.removeEventListener('mousedown', startDrag)
        window.removeEventListener('resize', resizeListener)
    })

    function init() {
        const el = dom.value
        if (!el)
            return
        el.addEventListener('mousedown', startDrag)

        viewWidth = window.innerWidth
        viewHeight = window.innerHeight

        linesFunc = getLineFunc()

        adsorb('right')
    }

    function startDrag(event: MouseEvent) {
        const el = dom.value
        if (!el)
            return
        if (isDragging)
            return

        isDragging = true

        const { pageX, pageY } = event

        el.style.cursor = 'grabbing'
        el.style.userSelect = 'none'

        lastCoord.x = pageX
        lastCoord.y = pageY

        const { left, top, width, height } = el.getBoundingClientRect()

        el.style.left = `${left}px`
        el.style.top = `${top}px`

        document.addEventListener('mousemove', drag)
        document.addEventListener('mouseup', endDrag)

        renderBorder()
        const d = getDirection({ x: event.pageX, y: event.pageY })
        bubbleRect.value = { x: left, y: top, width, height }
        shadowDirection.value = d
        renderShadow(shadowDirection, bubbleRect)
    }

    function drag(event: MouseEvent) {
        const el = dom.value
        if (!el)
            return
        if (!isDragging)
            return

        const { pageX, pageY } = event
        const deltaX = pageX - lastCoord.x
        const deltaY = pageY - lastCoord.y

        const left = Number.parseInt(el.style.left)
        const top = Number.parseInt(el.style.top)
        el.style.left = `${left + deltaX}px`
        el.style.top = `${top + deltaY}px`

        lastCoord.x = pageX
        lastCoord.y = pageY

        bubbleRect.value = {
            ...bubbleRect.value,
            x: left + deltaX,
            y: top + deltaY,
        }
        shadowDirection.value = getDirection(event)
    }

    function endDrag(event: MouseEvent) {
        const el = dom.value
        if (!el)
            return

        isDragging = false

        el.style.cursor = 'default'
        el.style.userSelect = 'auto'

        setTimeout(() => {
            document.removeEventListener('mousemove', drag)
            document.removeEventListener('mouseup', endDrag)
            borderTemplate?.unmount()
            shadowTemplate?.unmount()
            borderBox?.remove()
            shadowBox?.remove()
            borderBox = null
            shadowBox = null
        }, 300)

        const d = getDirection({ x: event.pageX, y: event.pageY })
        adsorb(d)
    }

    function renderBorder() {
        borderTemplate = createApp(Border)
        borderBox = document.createElement('div')
        borderTemplate.mount(borderBox)
        document.body.appendChild(borderBox)
    }

    function renderShadow(direction: Ref<TDirection>, rect: Ref<IRect>) {
        shadowTemplate = createApp(Shadow, {
            direction,
            rect,
        })
        shadowBox = document.createElement('div')
        shadowTemplate.mount(shadowBox)
        document.body.appendChild(shadowBox)
    }

    function adsorb(direction: TDirection) {
        const el = dom.value
        if (!el)
            return

        el.style.transition = 'all 0.3s ease-in-out'

        const rect = el.getBoundingClientRect()
        const { width, height, left, top } = rect

        switch (direction) {
            case 'top':
                el.style.top = `${0 + config.indicatorSize}px`
                el.style.left = `${left}px`
                break
            case 'bottom':
                el.style.top = `${viewHeight - height - config.indicatorSize}px`
                el.style.left = `${left}px`
                break
            case 'left':
                el.style.top = `${top}px`
                el.style.left = `${0 + config.indicatorSize}px`
                break
            case 'right':
                el.style.top = `${top}px`
                el.style.left = `${viewWidth - width - config.indicatorSize}px`
                break
            default:
                break
        }
        setTimeout(() => el.style.transition = 'none', 300)
    }

    function getDirection(coord: { x: number, y: number }): TDirection {
        /* 判断落在哪个区域，以对角线为准，划分四个区域 */
        const { l1, l2 } = linesFunc
        const x = coord.x
        const y = coord.y

        const l1Value = l1(x)
        const l2Value = l2(x)

        const coordY = viewHeight - y

        if (coordY >= l1Value && coordY >= l2Value)
            return 'top'
        if (coordY >= l1Value && coordY <= l2Value)
            return 'right'
        if (coordY <= l1Value && coordY <= l2Value)
            return 'bottom'
        if (coordY <= l1Value && coordY >= l2Value)
            return 'left'

        return 'right'
    }

    function getLineFunc(): { l1: TLineFunc, l2: TLineFunc } {
        // 以左下角为原点，向右为x轴正方向，向上为y轴正方向
        const lb = { x: 0, y: 0 }
        const lt = { x: 0, y: viewHeight }
        const rt = { x: viewWidth, y: viewHeight }
        const rb = { x: viewWidth, y: 0 }

        // 左上和右下 构成直线 l1
        const l1 = getFuncByTwoPoints(lt, rb)
        // 右上和左下 构成直线 l2
        const l2 = getFuncByTwoPoints(rt, lb)

        return {
            l1,
            l2,
        }
    }

    function getFuncByTwoPoints(p1: { x: number, y: number }, p2: { x: number, y: number }) {
        const k = (p2.y - p1.y) / (p2.x - p1.x)
        const b = p1.y - k * p1.x
        return (x: number) => k * x + b
    }

    return {
        shadowDirection,
    }
}
