webpackJsonp([1],{"7zck":function(e,t){},NHnr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a,i,s=r("7+uW"),o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-navigation-drawer",{attrs:{persistent:"","mini-variant":e.miniVariant,clipped:e.clipped,"disable-resize-watcher":"",temporary:"",fixed:"",app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[r("v-list",e._l(e.items,function(t,n){return r("v-list-tile",{key:n,attrs:{value:"true",to:t.route}},[r("v-list-tile-action",[r("v-icon",{domProps:{innerHTML:e._s(t.icon)}})],1),e._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[e._v(e._s(t.title))])],1)],1)}))],1),e._v(" "),r("v-toolbar",{attrs:{app:"","clipped-left":e.clipped}},[r("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),e._v(" "),r("v-toolbar-title",[e._v(e._s(e.title))]),e._v(" "),r("v-spacer")],1),e._v(" "),r("v-content",[r("router-view")],1)],1)},staticRenderFns:[]},l=r("VU/8")({name:"App",data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[{icon:"shopping_basket",title:"Pedidos",route:"/"},{icon:"supervisor_account",title:"Administrador",route:"/admin/login"},{icon:"person",title:"Cliente",route:"/client/login"}],miniVariant:!1,title:"Ranguz"}}},o,!1,null,null,null).exports,c=r("/ocq"),u=r("Xxa5"),d=r.n(u),p=r("exGp"),v=r.n(p),f=r("ryRw"),g=r.n(f),m=r("mtWM"),_=r.n(m),b=(n=v()(d.a.mark(function e(){var t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(R());case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}},e,this)})),function(){return n.apply(this,arguments)}),x=(a=v()(d.a.mark(function e(t){var r,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(r=k()).data=t,e.next=4,w(r);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}},e,this)})),function(e){return a.apply(this,arguments)}),h=(i=v()(d.a.mark(function e(t){var r,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(r=F()).data=t,e.next=4,w(r);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}},e,this)})),function(e){return i.apply(this,arguments)}),w=_.a.create({baseURL:"http://localhost:3000/api"}),y=function(e,t){return{method:e,url:t}},R=function(){return y("get","/orders")},k=function(){return y("post","/clients")},F=function(){return y("post","/clients/auth")},L={name:"Main",data:function(){return{orders:[],lastSync:"Dados indisponíveis!"}},methods:{loadOrders:function(){var e=this;return v()(d.a.mark(function t(){var r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},t,e)}))()},formatDate:function(e){var t=function(e){return e<10?"0"+e:""+e},r=e.getFullYear(),n=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"][e.getMonth()];return t(e.getDate())+" de "+n+" de "+r+" às "+t(e.getHours())+":"+t(e.getMinutes())+":"+t(e.getSeconds())}},created:function(){var e=this,t=g.a.fromPromise(this.loadOrders()),r=g.a.periodic(3e4).map(function(){return g.a.fromPromise(e.loadOrders())}).flatten();g.a.merge(t,r).map(function(e){return e.filter(function(e){return!e.done})}).subscribe({next:function(t){var r=t.map(function(e){return e.action="person",e.active=!1,e});e.orders=r.map(function(t){return e.orders.forEach(function(e){t.id===e.id&&(t.active=e.active)}),t}).sort(function(e,t){return new Date(e.date)-new Date(t.date)}),e.lastSync=e.formatDate(new Date(Date.now()))}})}},T={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-layout",{attrs:{column:""}},[r("v-list",[r("v-subheader",{staticClass:"success white--text"},[e._v("Última Sincronização: "+e._s(e.lastSync))]),e._v(" "),e._l(e.orders,function(t){return r("v-list-group",{key:t.id,attrs:{"prepend-icon":t.action,"no-action":""},model:{value:t.active,callback:function(r){e.$set(t,"active",r)},expression:"order.active"}},[r("v-list-tile",{staticClass:"py-3",attrs:{slot:"activator"},slot:"activator"},[r("v-list-tile-content",[r("v-list-tile-title",[e._v("Matrícula: "+e._s(t.client.register))]),e._v(" "),r("v-list-tile-sub-title",[e._v("Pedido: "+e._s(t.id))])],1)],1),e._v(" "),e._l(t.cart,function(t){return r("v-list-tile",{key:t.name},[r("v-list-tile-action",[e._v(e._s(t.quantity)+"x")]),e._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[e._v(e._s(t.name))])],1)],1)})],2)})],2)],1)],1)},staticRenderFns:[]},C=r("VU/8")(L,T,!1,null,null,null).exports,$=r("mvHQ"),P=r.n($),j={nameField:[function(e){return/^[a-zA-Z]{3,}$/.test(e)||"O nome deve conter pelo menos 3 letras"}],cpfField:[function(e){return/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/.test(e)||"CPF Inválido"}],registerField:[function(e){return/^\d{4}$/.test(e)||"A matrícula deve conter 4 dígitos"}],passField:[function(e){return/^\d{4,}$/.test(e)||"A senha deve conter pelo menos 4 dígitos"}]},D={name:"Login",data:function(){return{cpf:"",password:"",passType:!0,isLogging:!1,registerRoute:"/client/register",shoppingRoute:"/client/shopping",validationRules:j}},methods:{attemptToLogin:function(){var e=this;return v()(d.a.mark(function t(){var r;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.$refs.loginForm.validate()&&(e.isLogging=!0,r={cpf:e.cpf,password:e.password},g.a.fromPromise(h(r)).subscribe({next:function(t){e.isLogging=!1,console.log("auth"),t.token&&(localStorage.setItem("credentials",P()(t)),e.$router.push(e.shoppingRoute))},error:function(){e.isLogging=!1,console.log("error")}}));case 1:case"end":return t.stop()}},t,e)}))()}},mounted:function(){localStorage.getItem("credentials")&&this.$router.push(this.shoppingRoute)}},M={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:"","fill-height":""}},[r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-flex",{attrs:{xs12:"",sm9:"",md9:"",lg5:"",xl5:"","text-xs-center":"","text-sm-center":"","text-md-center":"","text-lg-center":"","text-xl-center":""}},[r("v-form",{ref:"loginForm",staticClass:"pa-4 elevation-4 round-corner"},[r("v-text-field",{attrs:{rules:e.validationRules.cpfField,counter:11,disabled:e.isLogging,label:"CPF","prepend-icon":"credit_card",required:""},model:{value:e.cpf,callback:function(t){e.cpf=t},expression:"cpf"}}),e._v(" "),r("v-text-field",{attrs:{"append-icon":e.passType?"visibility":"visibility_off","append-icon-cb":function(){return e.passType=!e.passType},type:e.passType?"password":"text",rules:e.validationRules.passField,disabled:e.isLogging,label:"Senha","prepend-icon":"lock",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),r("v-layout",{staticClass:"mt-4",attrs:{row:""}},[r("v-btn",{attrs:{to:e.registerRoute,disabled:e.isLogging,flat:""}},[e._v("Cadastrar")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"primary",loading:e.isLogging},on:{click:e.attemptToLogin}},[e._v("Login")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var S={name:"Register",data:function(){return{name:"",cpf:"",register:"",password:"",passType:!0,isRegistering:!1,dialog:{status:!1,title:"",message:"",button:"",color:"",route:""},loginRoute:"/client/login",registerRoute:"/client/register",validationRules:j}},methods:{attemptToRegister:function(){var e=this;return v()(d.a.mark(function t(){var r;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.$refs.registerForm.validate()&&(e.isRegistering=!0,r={name:e.name,cpf:e.cpf,register:e.register,password:e.password},g.a.fromPromise(x(r)).map(function(e){return e.cpf===r.cpf}).subscribe({next:function(t){t?(e.dialog.title="Cadastrado com sucesso",e.dialog.message="Dirija-se ao refeitório com sua carterinha estudantil e finalize seu cadastro!",e.dialog.button="Ir ao Login",e.dialog.color="green darken-1",e.dialog.route=e.loginRoute):(e.dialog.title="Problemas no cadastro",e.dialog.message="Tente novamente mais tarde!",e.dialog.button="Fechar",e.dialog.color="red darken-1",e.dialog.route=e.registerRoute),e.isRegistering=!1,e.dialog.status=!0}}));case 1:case"end":return t.stop()}},t,e)}))()}}},q={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:"","fill-height":""}},[r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-flex",{attrs:{xs12:"",sm9:"",md9:"",lg5:"",xl5:"","text-xs-center":"","text-sm-center":"","text-md-center":"","text-lg-center":"","text-xl-center":""}},[r("v-form",{ref:"registerForm",staticClass:"pa-4 elevation-4 round-corner"},[r("v-text-field",{attrs:{rules:e.validationRules.nameField,disabled:e.isRegistering,label:"Nome","prepend-icon":"person",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),r("v-text-field",{attrs:{rules:e.validationRules.cpfField,counter:11,disabled:e.isRegistering,label:"CPF","prepend-icon":"credit_card",required:""},model:{value:e.cpf,callback:function(t){e.cpf=t},expression:"cpf"}}),e._v(" "),r("v-text-field",{attrs:{rules:e.validationRules.registerField,counter:4,disabled:e.isRegistering,label:"Matrícula","prepend-icon":"money",required:""},model:{value:e.register,callback:function(t){e.register=t},expression:"register"}}),e._v(" "),r("v-text-field",{attrs:{"append-icon":e.passType?"visibility":"visibility_off","append-icon-cb":function(){return e.passType=!e.passType},type:e.passType?"password":"text",rules:e.validationRules.passField,disabled:e.isRegistering,label:"Senha","prepend-icon":"lock",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),r("v-layout",{staticClass:"mt-4",attrs:{row:""}},[r("v-btn",{attrs:{to:e.loginRoute,disabled:e.isRegistering,flat:""}},[e._v("Voltar")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"primary",loading:e.isRegistering},on:{click:e.attemptToRegister}},[e._v("Cadastrar")])],1),e._v(" "),r("v-dialog",{attrs:{persistent:"","max-width":"320"},model:{value:e.dialog.status,callback:function(t){e.$set(e.dialog,"status",t)},expression:"dialog.status"}},[r("v-card",[r("v-card-title",{staticClass:"headline"},[e._v(e._s(e.dialog.title))]),e._v(" "),r("v-card-text",[e._v(e._s(e.dialog.message))]),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{to:e.dialog.route,color:e.dialog.color,flat:"flat"},nativeOn:{click:function(t){e.dialog.status=!1}}},[e._v("\n                "+e._s(e.dialog.button)+"\n              ")])],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var z=[{path:"/",name:"Main",component:C},{path:"/client/login",name:"Login",component:r("VU/8")(D,M,!1,function(e){r("XeLj")},"data-v-79e1b9da",null).exports},{path:"/client/register",name:"Register",component:r("VU/8")(S,q,!1,function(e){r("RoHy")},"data-v-065e4666",null).exports}];s.a.use(c.a);var V=new c.a({routes:z}),A=r("3EgV"),H=r.n(A);r("7zck");s.a.use(H.a,{}),s.a.config.productionTip=!1,new s.a({el:"#app",router:V,components:{App:l},template:"<App/>"})},RoHy:function(e,t){},XeLj:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.f6cdfbb293b96b5d4fdc.js.map