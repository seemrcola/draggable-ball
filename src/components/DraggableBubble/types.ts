type TLineFunc = (x: number) => number
type TDirection = 'top' | 'bottom' | 'left' | 'right'

interface IRect {
    x: number
    y: number
    width: number
    height: number
}

export {
    TLineFunc,
    TDirection,
    IRect,
}
