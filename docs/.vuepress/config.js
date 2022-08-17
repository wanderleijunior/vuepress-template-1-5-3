const { description } = require('../../package')
const path = require('path');

module.exports = {
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#title
	 */
	title: 'Titulo da Documentação',
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#description
	 */
	description: description,

	/**
	 * Extra tags to be injected to the page HTML `<head>`
	 *
	 * ref：https://v1.vuepress.vuejs.org/config/#head
	 */
	head: [
		['meta', { name: 'theme-color', content: '#3eaf7c' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
	],

	/**
	 * Theme configuration, here is the default theme configuration for VuePress.
	 *
	 * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
	 */
	themeConfig: {
		repo: '',
		editLinks: false,
		docsDir: '',
		editLinkText: '',
		lastUpdated: false,
		nav: [
			{
				text: 'Guide',
				link: '/guide/',
			},
			{
				text: 'Config',
				link: '/config/'
			},
			{
				text: 'VuePress',
				link: 'https://v1.vuepress.vuejs.org'
			}
		],
		sidebar: {
			'/guide/': [
				{
					title: 'Guide',
					collapsable: false,
					children: [
						'',
						'using-vue',
					]
				}
			],
		}
	},

	/**
	 * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
	 */
	plugins: [
		'@vuepress/plugin-back-to-top',
		'@vuepress/plugin-medium-zoom',
		[
			'vuepress-plugin-container',
			{
				type: 'right',
				defaultTitle: '',
			},
		],
		[
			'vuepress-plugin-container',
			{
				type: 'info',
				before: info => `<div class="theorem"><p class="title">${info}</p>`,
				after: '</div>',
			},
			{
				type: 'tip',
				before: tip => `<div class="tip"><p class="title">${tip}</p>`,
				after: '</div>',
			},
		],
		[
			'vuepress-plugin-container',
			{
				type: 'tip',
				defaultTitle: {
					'/': 'TIP',
					'/zh/': '提示',
				},
			},
			{
				type: 'info',
				defaultTitle: {
					'/': '',
				},
			},
		],

	],
	alias: {
		'styles': path.resolve(__dirname, './styles'),
	},
}
