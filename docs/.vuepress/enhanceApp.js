import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default ({
	Vue, // the version of Vue being used in the VuePress app
	options, // the options for the root Vue instance
	router, // the router instance for the app
	siteData // site metadata
}) => {
	Vue.use(BootstrapVue)
	Vue.use(BootstrapVueIcons)

	const requireComponent = require.context(
		'./components/global',
		true,
		/(vue|js)$/
	)

	requireComponent.keys().forEach(fileName => {
		const componentConfig = requireComponent(fileName)
		const componentName = upperFirst(
			camelCase(
				// Gets the file name regardless of folder depth
				fileName
					.split('/')
					.pop()
					.replace(/\.\w+$/, '')
			)
		)

		Vue.component(
			componentName,
			componentConfig.default || componentConfig
		)
	})
}
