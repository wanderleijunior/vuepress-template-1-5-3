<template>
	<code>{{ text }}</code>
</template>

<script>
	export default {
		name: 'VText',
		props: {
			text: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
