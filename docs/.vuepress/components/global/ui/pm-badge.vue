<template>
    <span :class="`bg-${type} text-${textColor}`" class="badge">{{ text }}</span>
</template>

<script>
    export default {
        name: 'pm-badge',
        props: {
            text: {
                type: String,
            },
            textColor: {
                type: String,
                default: 'white'
            },
            type: {
                type: String,
                default: 'success'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
