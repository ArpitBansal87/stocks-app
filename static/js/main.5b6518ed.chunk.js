(this["webpackJsonpstocks-app"]=this["webpackJsonpstocks-app"]||[]).push([[0],{192:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),o=a.n(c),i=(a(90),a(29)),l=(a(91),a(213)),s=a(40),m=a(69),u=function(e,t){var a,n=JSON.parse(e),r=new Date,c=Object(m.a)(n);try{for(c.s();!(a=c.n()).done;){var o=a.value;if(t.has(o[0])){var i=t.get(o[0]);t.set(o[0],{updatedTimeStamp:r,change:i.price-o[1],price:o[1],history:0!==i.history.length?[].concat(Object(s.a)(i.history),[{price:o[1],time:r}]):[{price:i.price,time:r}],name:o[0]})}else t.set(o[0],{updatedTimeStamp:r,change:0,price:o[1],history:[{price:o[1],time:r}],name:o[0]})}}catch(l){c.e(l)}finally{c.f()}return t},d=a(70),p=function(e){var t={labels:e.data.map((function(e){return(t=e.time).getUTCHours()+":"+t.getUTCMinutes()+":"+t.getUTCSeconds();var t})),datasets:[{label:e.name,fill:!1,backgroundColor:"blue",borderColor:"blue",pointBorderColor:"blue",pointRadius:2,data:e.data.map((function(e){return e.price}))}]};return r.a.createElement("div",null,0!==e.data.length?r.a.createElement(d.Line,{data:t}):r.a.createElement(r.a.Fragment,null))},g=function(e){return r.a.createElement(l.a,{item:!0,xs:12,md:9},r.a.createElement("section",null,r.a.createElement(p,{data:e.chartData,name:e.chartName})))},h=a(215),E=a(218),f=a(216),b=a(217),v=a(220),k=a(76),S=a.n(k),w=Object(h.a)((function(e){return{root:{flexGrow:1,marginBottom:10},paper:{padding:e.spacing(2),margin:"auto",maxWidth:500},decrease:{color:"darkgreen"},increase:{color:"red"}}})),O=function(e){var t=w(),a=function(){return 0===e.data.change?t.noChange:e.data.change>0?t.increase:t.decrease};return r.a.createElement("div",{className:t.root},r.a.createElement(f.a,{className:t.paper},r.a.createElement(l.a,{container:!0,spacing:2},r.a.createElement(l.a,{item:!0,xs:12,sm:!0,container:!0},r.a.createElement(l.a,{item:!0,xs:!0,container:!0,direction:"row",spacing:2,alignItems:"center"},r.a.createElement(l.a,{item:!0,container:!0,direction:"column",xs:!0},r.a.createElement(l.a,{item:!0},r.a.createElement(b.a,{variant:"h5"},e.data.name)),r.a.createElement(l.a,{item:!0},r.a.createElement(b.a,{variant:"caption",className:a()},"Price: $",Number.parseFloat(e.data.price).toFixed(3)))),r.a.createElement(l.a,{item:!0},r.a.createElement(b.a,{variant:"caption"},"Updated On:"),r.a.createElement(b.a,{variant:"body2"},e.data.updatedTimeStamp.getMonth()+1+"/"+e.data.updatedTimeStamp.getDate()+"/"+e.data.updatedTimeStamp.getFullYear()),r.a.createElement(b.a,{variant:"body2"},e.data.updatedTimeStamp.getUTCHours()+":"+e.data.updatedTimeStamp.getUTCMinutes()+":"+e.data.updatedTimeStamp.getUTCSeconds())),r.a.createElement(l.a,{item:!0},r.a.createElement(v.a,{title:"Show chart"},r.a.createElement(E.a,{onClick:function(){e.selectChart(e.data.name)},className:a()},r.a.createElement(S.a,null)))))))))},j=Object(h.a)((function(){return{stocksList:{flexGrow:1,overflowY:"scroll",height:"calc(100vh)",padding:"0 10px"},stocks:{paddingBottom:10}}})),y=function(e){var t=j();return r.a.createElement(l.a,{item:!0,xs:12,md:3},r.a.createElement("section",{className:t.stocksList},Object(s.a)(e.stocksList.values()).map((function(a,n){return r.a.createElement(O,{className:t.stocks,key:"stock-"+n,data:a,selectChart:e.reloadlChart})}))))},C=a(219),T=a(77),x=a.n(T),N=a(78),U=a.n(N),M=function(e){return r.a.createElement("section",null,r.a.createElement(l.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"center"},r.a.createElement(l.a,{item:!0,xs:9,sm:8,lg:3},r.a.createElement("h1",null,"Stocks App")),r.a.createElement(l.a,{item:!0},r.a.createElement(C.a,{color:"primary","aria-label":"play",style:{float:"right"},onClick:e.handlePause},e.isPauseStockUpdate?r.a.createElement(x.a,{fontSize:"large"}):r.a.createElement(U.a,{fontSize:"large"})))))},B=new WebSocket("wss://trades-api.herokuapp.com/stocks");var F=function(){var e=Object(n.useState)(new Map),t=Object(i.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!1),s=Object(i.a)(o,2),m=s[0],d=s[1],p=Object(n.useState)([]),h=Object(i.a)(p,2),E=h[0],f=h[1],b=Object(n.useState)(""),v=Object(i.a)(b,2),k=v[0],S=v[1];return Object(n.useEffect)((function(){return B.onopen=function(){console.log("connection Established")},function(){B.close(),console.log("connection closed")}}),[]),Object(n.useEffect)((function(){B.onmessage=function(e){m||c(new Map(u(e.data,a)))}}),[m,a]),r.a.createElement(r.a.Fragment,null,r.a.createElement(M,{handlePause:function(){d(!m)},isPauseStockUpdate:m}),r.a.createElement(l.a,{container:!0},r.a.createElement(y,{reloadlChart:function(e){f(a.get(e).history),S(a.get(e).name)},stocksList:a}),r.a.createElement(g,{chartName:k,chartData:E})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},85:function(e,t,a){e.exports=a(192)},90:function(e,t,a){},91:function(e,t,a){}},[[85,1,2]]]);
//# sourceMappingURL=main.5b6518ed.chunk.js.map