<template>
	<div class="box-image" style="">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'box-image',
		data: () => ({}),
		props: {
			width: {
				type: String,
				default: '100%'
			}
		},
		computed: {
			imgStyle() {
				return {
					width: this.width
				}
			}
		}
	}
</script>

<style lang="css" scoped>
.box-image {
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2%;
}
</style>
