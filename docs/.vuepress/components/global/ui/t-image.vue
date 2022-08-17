<template>
<div class="box-image">
	<img :style="imgStyle" :src="src">
</div>
</template>

<script>
	export default {
		name: 't-image',
		data: () => ({

		}),
		props: {
			src: {
				type: String,
				required: true
			},
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
	justify-content: center;
	margin: 20px 0 40px;
}

.box-image img {
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
