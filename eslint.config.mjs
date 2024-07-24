import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: 'single', // or 'double'
    },
    rules: {
        'no-fallthrough': 'off',
        'no-console': 'off',
    },
})
