<template>
	<div>
		<h1 v-if="type == 'h1'" :id="href">
			<a :href="`#${href}`" class="header-anchor">#</a>
			{{ text }}
		</h1>
		<h2 v-if="type == 'h2'" :id="href">
			<a :href="`#${href}`" class="header-anchor">#</a>
			{{ text }}
		</h2>
		<h3 v-if="type == 'h3'" :id="href">
			<a :href="`#${href}`" class="header-anchor">#</a>
			{{ text }}
		</h3>
		<h4 v-if="type == 'h4'" :id="href">
			<a :href="`#${href}`" class="header-anchor">#</a>
			{{ text }}
		</h4>
	</div>
</template>

<script>
	export default {
		name: 't-title',
		props: {
			type: {
				tipe: String,
				default: 'h1'
			},
			text: {
				tipe: String,
				required: true
			}
		},
		computed: {
			href() {
				console.log(this.text.toLowerCase())
				return this.text.toLowerCase()
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
