webpackJsonp([3],{QrVH:function(o,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("Xxa5"),i=t.n(n),c=t("exGp"),s=t.n(c),r={data:function(){return{Request:this.$api,util:this.$util.util.prototype}},mounted:function(){},components:{},computed:{},methods:{login:function(){var o=this,e=window.location.protocol+"//"+window.location.host+"/#/login";o.Request.login(e).then(function(e){0==e.code&&(o.$cookies.remove("openId"),o.$cookies.remove("access_token"),window.location.href=e.data)})},getAccessTokenFun:function(o){var e=this;return s()(i.a.mark(function t(){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e,t.next=3,n.Request.getAccessToken(o,n.util.getOS()).then(function(o){console.log(o),0==o.code&&(n.$cookies.set("openId",o.data.openid,7200),n.$cookies.set("access_token",o.data.access_token,7200))});case 3:case"end":return t.stop()}},t,e)}))()}},created:function(){var o=this,e=this.$router.history.current.query.code||this.util.getQueryString("code");if(null==this.$cookies.get("isLogin")&&null==e)this.login();else if(void 0==this.$cookies.get("openId"))this.getAccessTokenFun(e).then(function(e){var t=o.$cookies.get("beforeLoginUrl"),n=window.location.protocol,i=window.location.host;window.location.href=n+"//"+i+"#"+t,o.$cookies.remove("beforeLoginUrl")});else{var t=window.location.protocol,n=window.location.host;window.location.href=t+"//"+n+"#"}}},a={render:function(){var o=this.$createElement;return(this._self._c||o)("div",{staticClass:"container"})},staticRenderFns:[]};var u=t("VU/8")(r,a,!1,function(o){t("rXxZ")},"data-v-21f9ab54",null);e.default=u.exports},rXxZ:function(o,e){}});
//# sourceMappingURL=3.62cf893f294475ad498d.js.map