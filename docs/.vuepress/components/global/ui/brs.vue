<template>
    <span>
        <br v-for="i in qtd" :key="i">
    </span>
</template>

<script>
    export default {
        props: {
            qtd: {
                type: [Number, String],
                default: 1
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
