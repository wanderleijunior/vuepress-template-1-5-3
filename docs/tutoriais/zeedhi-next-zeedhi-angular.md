# Como usar telas do Zeedhi next dentro do Zeedhi Angular

::: tip Dica
Esse tutorial segue a premissa de que o frontend do seu produto foi criado a partir do [Teknisa CLI]( https://docs.zeedhi.com/teknisa/create-product#teknisa-cli )
:::


## No Zeedhi Angular

###  Arquivo json
<br>

- Usar o template de iframe `widget/iframe.html`
- Definir como string vazia a propriedade `sourceUrl` da widget
- Criar evento `containerAfterinit`

```json
{
	"name":  "clientsByOperator",
	"label":  "Clientes Por Operador",
	"showFooter":  true,
	"showHeader":  true,
	"showMenu":  true,
	"showBack":  true,
	"popup":  "component/popup.html",
	"template":  "container/window.html",
	"footer":  "component/footer.html",
	"menuTemplate":  "component/menu.html",
	"events":  [
		{
    		"id":  "19180107471736243305634",
    		"name":  "ContainerAfterinit",
    		"code":  "ClientsByOperatorController.clientByOperatorContainerAfterinit()"
		}
	],
	"widgets":  [
		{
			"id":  "19180107472489502003632",
			"name":  "clientsByOperator",
			"isVisible":  true,
			"label":  "Clientes Por Operador",
			"template":  "widget/iframe.html",
			"sourceUrl":  "",
			"dataSource":  {
				"rest":  false,
				"localStorage":  false,
				"lazyLoad":  true,
				"data":  []
			},
			"events":  [],
			"actions":  [],
			"fields":  [],
			"widgets":  []
		}
	],
	"id":  "9517503591578592376631",
	"parentMenuId":  "9088430362653897906635",
	"parentMenuName":  "clientsByOperators",
	"parentMenuLabel":  "Clientespor Operador"
}
```

###  Controller Javascript
<br>

- No evento do container obeter token e hash do login no localStorage.
- Definir url para setar na propriedade `sourceUrl` da widget.
	- A url aponta para a página do Zeedhi Next que deseja ser mostrada
	- Todos os parâmetros que precisam ser passados para dentro do iFrame (Zeedhi "velho" para Zeedhi Next) devem ser passados como parâmetros da url, como no exemplo abaixo:
	- `"sourceUrl": "http://localhost:8080/gestao-de-demandas?header=0&menu=0&token=227441a2217f..."`

```js
function  ClientsByOperatorController(ScreenService, templateManager, LibUtilities){

	var getWidgetClientsByOperator =  function(){
		return templateManager.container.getWidget('clientsByOperator');
	};

	this.clientByOperatorContainerAfterinit = function () {
        var token = localStorage.getItem('LOGIN_TOKEN');
        var hash = localStorage.getItem('LOGIN_HASH') || '0';
        var user      = localStorage.getItem('LOGIN_USER');
        var languange = localStorage.getItem('LOGIN_LANGUAGE');
        var productId = window.projectId;
        
        var url = "http://localhost:8080/" + route + "?header=0&menu=0" +
                                                     "&token=" + token +
                                                     "&hash=" + hash +
                                                     "&user=" + user +
                                                     "&languange=" + languange +
                                                     "&productId=" + productId +
                                                     "&isZhAngular=1";
                                                     
        // Clear OM session timeout to use only OM Next session timeout.
        clearTimeout(LibUtilities.expiredSessionMethod);
                  
        getWidgetClientsByOperator().sourceUrl = url;
    };
}

Configuration(function(ContextRegister){
	ContextRegister.register('ClientsByOperatorController',  ClientsByOperatorController);
});
```

::: tip Dica
A proŕiedde `sourceUrl` é setada via javascript pelo fato de ter que pegar as informações de login dinamicamente.
:::

###  Arquivo CSS
<br/>

- Definir as propriedades **`height`** e **`width`** em 100% para o `iframe`
```css
iframe  {
	width:  100%;
	height:  100%;
}
```

## Zeedhi Next

### App.vue
<br/>

- Colocar `v-if` no `menu`, `header` e `footer` para que possam ser controlados a partir de parâmetros vindo da aplicação que está chamando:
	```vue
	<component v-if="!isRouteLogin && showMenu" :is="menu.component" v-bind="{ ...menu }"></component>
	<component v-if="!isRouteLogin && showHeader" :is="header.component" v-bind="header"></component>
	```

::: tip Dica
Se estiver usando uma versão da TekLib anterior a versão 2, use o método `isCleanLayout` em vez de `isRouteLogin`.
:::

```vue
<component v-if="!isCleanLayout && showMenu" :is="menu.component" v-bind="{ ...menu }"></component>
<component v-if="!isCleanLayout && showHeader" :is="header.component" v-bind="header"></component>
```
	
- Na tag `<script>`do arquivo `App.vue`:
	- Importar a store `import Store from './store';` 
	- Adicionar métodos **showMenu** e **showHeader**:

```ts
public get showMenu(): boolean {
	return  Store.state.appShowMenu;
}

public get showHeader(): boolean {
	return  Store.state.appShowHeader;
}
```

- Adicionar `if` que engloba todo o código do método `setMenu`;
::: tip Dica
Caso use o serviço TekLibLocalStorage como no exemplo abaixo, é necessário importa-lo.
:::

```ts
private setMenu() {
	if (TekLibLocalStorage.getItem('IS_NEXT')) {
		const menu = Metadata.getInstance<Menu>('main-menu');
		menu.items = JSON.parse(<string>localStorage.getItem('MENU')) || [];
	}
}
```

::: tip Dica
Se estiver usando uma versão da TekLib anterior a versão 2, use o método `LibLocalStorage` em vez de `TekLibLocalStorage`.
:::

```ts
private setMenu() {
	if (LibLocalStorage.getItem('IS_NEXT')) {
		const menu = Metadata.getInstance<Menu>('main-menu');
		menu.items = JSON.parse(<string>localStorage.getItem('MENU')) || [];
	}
}
```

### store.ts
<br/>

- Adicionar as propriedades `appLoginToken, appShowMenu, appShowHeader` ao objeto de state;
- Adicionar os métodos `setAppLoginToken, setAppDisplayOptions` ao objeto de mutation;

```ts
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routerParams: {},
	menu: JSON.parse(<string>localStorage.getItem('MENU')) || [],
	appLoginToken: '',
	appShowMenu: true,
	appShowHeader: true,
  },
  mutations: {
    setRouterParams: (state, value: any) => {
	  state.routerParams = value;
	  localStorage.setItem('routeParams', JSON.stringify(value));
	},
	setMenu: (state, value: any) => {
	  state.menu = value;
	},
	setAppLoginToken: (state, token: string) => {
	  state.appLoginToken = token;
	},
	setAppDisplayOptions: (state, options: any) => {
	  state.appShowMenu = options.menu !== '0';
	  state.appShowHeader = options.header !== '0';
	},
  },
  actions: {},
  getters: {
    routerParams: (state) => state.routerParams,
	getMenu: (state) => state.menu,
  },
});
```


### router.ts
<br/>

- Adicionar o código entre os comentarios `/** open old application */`  ao **Navigation Guards** `router.beforeEach()` de forma que o resultado final seja como no exemplo abaixo:
```ts
router.beforeEach(async (to, from, next) => {
  if (isOpeningNewModule(to, from) && TekLibLocalStorage.getItem('IS_NEXT') {
	try {
		LoadingService.show();
		await callLibStartSessionFromModule(to);
		LoadingService.hide();
	} catch (e) {
		LoadingService.hide();
	}
  }

	/** open old application - init */
  if (window.parent !== window && to.name !== 'token-error' && to.query.isZhAngular === '1') { // if application is called inside a iframe
	if (to.query.token) {
	  // if token was passed
	  localStorage.setItem('LOGIN_TOKEN', to.query.token.toString());
	  localStorage.setItem('LOGIN_USER', to.query.user.toString());
	  localStorage.setItem('LOGIN_LANGUAGE', to.query.languange.toString());
	  localStorage.setItem('PRODUCT_ID', to.query.productId.toString());
	  if (to.query.hash !== '0') {
	    localStorage.setItem('LOGIN_HASH', to.query.hash.toString());
	  }
	  Store.commit('setAppLoginToken', to.query.token);
	  Store.commit('setAppDisplayOptions', { menu: to.query.menu, header: to.query.header });
	}

	if (!Store.state.appLoginToken) {
	  // if there is no token... redirect to another page
	  Store.commit('setAppDisplayOptions', { menu: '0', header: '0' });
	  next('/token-error');
	  return;
	}

	// remove parameters from requested page
	delete to.query.menu;
	delete to.query.header;
	delete to.query.token;

	LibLocalStorage.setItem('IS_NEXT', false);
	LibLocalStorage.setItem('LOGIN_KEEP_CONNECTED', 'Yes');
	LibLocalStorage.removeItem('routeParams');

	next();
  } else {
    LibLocalStorage.setItem('IS_NEXT', true);
  }
  /** open old application - end */

  if (to.path !== Config.env.loginRoutePath && !localStorage.getItem('LOGIN_TOKEN')) {
    next(Config.env.loginRoutePath);
  } else if (to.path === Config.env.loginRoutePath && localStorage.getItem('LOGIN_TOKEN')) {
    next(Config.env.baseUrl);
  } else {
    next();
  }
});
```

##### Links úteis
<br/>

Snippets feito pelo Zéd que demontra o mesmo processo explicado acima:
[http://code.zeedhi.com/snippets/109](http://code.zeedhi.com/snippets/109)

OM - Organizations Management:
[https://gitlab.teknisa.com/teknisa/organizations-management](https://gitlab.teknisa.com/teknisa/organizations-management)

OM-Next - Organizations Management Next:
[https://gitlab.teknisa.com/teknisa/organizations-management-next](https://gitlab.teknisa.com/teknisa/organizations-management-next)