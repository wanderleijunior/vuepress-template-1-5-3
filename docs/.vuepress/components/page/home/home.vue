<template>
	<div>
		<div>
			<div class="row my-5">
				<div class="col-md-5 mx-auto">
					<div class="input-group">
						<input class="form-control border"
							   type="search"
							   placeholder="Filtrar"
							   v-model="inputFilter"
						/>
						<span class="input-group-text"><i class="bi bi-funnel text-dark"></i></span>
					</div>
				</div>
			</div>
		</div>

		<transition-group name="fade">
    		<div class="card mb-4 shadow-sm" v-for="(item, index) in filterTutorials" :key="index">
				<div class="card-header">
					<h5 class="card-title">{{ item.title }}</h5>
				</div>
				<div class="card-body">
					<a :href="item.link" class="btn btn-primary action">Visualizar</a>
				</div>
			</div>
  		</transition-group>
	</div>
</template>

<script>
export default {
	name: "PageHome",
	data: () => ({
		inputFilter: '',
		tutorials: [
			{
				title: "Como usar telas do Zeedhi next dentro do Zeedhi Angular",
				link: "/tutoriais/zeedhi-next-zeedhi-angular",
			},
			{
				title: "Testando",
				link: "/tutoriais/zeedhi-next-zeedhi-angular",
			},
			{
				title: "Cabeça",
				link: "/tutoriais/zeedhi-next-zeedhi-angular",
			},
			{
				title: "Quadrado",
				link: "/tutoriais/zeedhi-next-zeedhi-angular",
			},
			{
				title: "Bola",
				link: "/tutoriais/zeedhi-next-zeedhi-angular",
			},
		],
	}),
	computed: {
		filterTutorials() {
			return this.tutorials.filter((item) => {
				return item.title.toLowerCase().includes(this.inputFilter.toLowerCase());
			})
		}
	}
};
</script>

<style lang="css" scoped>
.action {
	text-decoration: none !important;
}

.form-control:focus {
	box-shadow: 0 0 0 0.05rem rgb(13 110 253 / 25%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
