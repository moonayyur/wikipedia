'use strict';function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function _arrayWithHoles(a){if(Array.isArray(a))return a}define(["modules/default/defaultview","src/util/api","src/util/color"],function(Default,API,Color){"use strict";function View(){}return $.extend(!0,View.prototype,Default,{init:function(){let a=[];a.push("<div></div>"),this.dom=$(a.join("")),this.module.getDomContent().html(this.dom)},blank:{wellsList:function(){this.plate=null,this.wellsList=null,API.killHighlight(this.module.getId()),this.dom.empty()},plateSetup:function(){this.plateSetup=null,API.killHighlight(this.module.getId()),this.dom.empty()}},inDom:function(){const a=this;this.dom.on("mouseenter mouseleave click","td",function(b){const c=a.wellsList,d=$(this).parents(":eq(3)").index(),e=$(this).parent().index(),f=$(this).index(),g=a.cols,h=a.rows,i=a.module.getConfiguration("direction","vertical")||"vertical",j="vertical"===i?d*g*h+f*h+e:d*g*h+e*g+f;if(c[j]){let d=c[j]._highlight;"mouseenter"===b.type?(a.module.controller.createDataFromEvent("onTrackMouse","trackData",c[j]),a.module.controller.sendActionFromEvent("onTrackMouse","trackData",c[j]),a.module.controller.sendActionFromEvent("onTrackMouse","mouseEvent",b),a.module.controller.sendActionFromEvent("onTrackMouse","dataAndEvent",{data:c[j],event:b}),API.highlight([d],1)):"mouseleave"===b.type?API.highlight([d],0):"click"===b.type&&(a.module.controller.createDataFromEvent("onTrackClick","trackData",c[j]),a.module.controller.sendActionFromEvent("onTrackClick","trackData",c[j]),a.module.controller.sendActionFromEvent("onTrackClick","mouseEvent",b),a.module.controller.sendActionFromEvent("onTrackClick","dataAndEvent",{data:c[j],event:b}))}}),this.resolveReady()},update:{wellsList:function wellsList(moduleValue){const cfg=this.module.getConfiguration;let colNumber=cfg("colnumber")||10,rowNumber=cfg("rownumber")||10,style=cfg("shape")||"aligned",direction=cfg("direction")||"vertical";const colorJpath=cfg("colorjpath",!1),wellsList=moduleValue.get(),colorOptions=cfg("colorOptions");this.wellsList=wellsList;let shape;switch(style){case"aligned":{shape={shift:!1,margin:void 0};break}case"pairShifted":{shape={margin:!0,index:0};break}case"oddShifted":{shape={margin:!0,index:1};break}}const wellLabels=createWellLabels({cols:colNumber,rows:rowNumber},10,{direction:direction}),labelsList=wellLabels.wellLabels,axis=wellLabels.axis,nbRows=axis.filter(a=>"rows"===a[0])[0][1].length,nbColumns=axis.filter(a=>"cols"===a[0])[0][1].length;this.rows=nbRows,this.cols=nbColumns;const nbPlate=Math.ceil(wellsList.length/(nbRows*nbColumns)),tables=this.buildGrid(wellsList,labelsList,nbPlate,nbRows,nbColumns,direction,shape);this.dom.html(tables);const tableNodes=this.dom.find(":eq(0)").children();let grid=[];for(let a=0;a<tableNodes.length;a++){let c=$(tableNodes[a]).find(":eq(1)").children(),b=$(c[0]).children(),d="vertical"===direction?[b.length,c.length]:[c.length,b.length],e=_slicedToArray(d,2),f=e[0],g=e[1];for(let d=0;d<f;d++)for(let e=0;e<g;e++){let g="vertical"===direction?[e,d]:[d,e],h=_slicedToArray(g,2),i=h[0],a=h[1];grid.push({index:i*f+a,value:c[i].childNodes[a]})}}if("colorByJpath"===colorOptions){let arrayPath=colorJpath.split(".");arrayPath.shift(),arrayPath=arrayPath.join(".");let jpathItems=[];moduleValue.filter(function(item){let previous=arrayPath.split(".");1!==previous.length&&(previous.pop(),previous=previous.join("."));let value=eval(`item.${previous}`)?eval(`item.${arrayPath}`):null;value=DataObject.resurrect(value);let element=this.find(a=>a===value);void 0===element&&null!==value&&"object"!=typeof value&&this.push(value)},jpathItems);for(let a=0;a<grid.length;a++)this.addConfigurations(grid,a,arrayPath,jpathItems)}if("colorByJpathValue"===colorOptions){let a=cfg("jpathValue"),b=a.split(".");b.shift(),b=b.join(".");for(let a=0;a<grid.length;a++)this.addConfigurations(grid,a,b)}for(let a=0;a<wellsList.length;a++)this.listenHighlight(grid,wellsList[a]._highlight,a)},plateSetup:function plateSetup(moduleValue){var list=moduleValue.get();checkJpath(list);let path=list.color?"color":"group";path&&delete list.color;let configurations=this.module.definition.configuration.groups[path][0];this.plateSetup=list;const plateSetup=this.plateSetup;void 0!==plateSetup&&(this.module.definition.configuration.groups[path][0]=Object.assign({},configurations,plateSetup));const cfg=this.module.getConfiguration;let colNumber=cfg("colnumber")||10,rowNumber=cfg("rownumber")||10,style=cfg("shape")||"aligned",direction=cfg("direction")||"vertical";const colorJpath=cfg("colorjpath",!1),wellsList=this.wellsList,colorOptions=cfg("colorOptions");let shape;switch(style){case"aligned":{shape={shift:!1,margin:void 0};break}case"pairShifted":{shape={margin:!0,index:0};break}case"oddShifted":{shape={margin:!0,index:1};break}}const wellLabels=createWellLabels({cols:colNumber,rows:rowNumber},10,{direction:direction}),labelsList=wellLabels.wellLabels,axis=wellLabels.axis,nbRows=axis.filter(a=>"rows"===a[0])[0][1].length,nbColumns=axis.filter(a=>"cols"===a[0])[0][1].length;this.rows=nbRows,this.cols=nbColumns;const nbPlate=Math.ceil(wellsList.length/(nbRows*nbColumns)),tables=this.buildGrid(wellsList,labelsList,nbPlate,nbRows,nbColumns,direction,shape);this.dom.html(tables);const tableNodes=this.dom.find(":eq(0)").children();let grid=[];for(let a=0;a<tableNodes.length;a++){let c=$(tableNodes[a]).find(":eq(1)").children(),b=$(c[0]).children(),d="vertical"===direction?[b.length,c.length]:[c.length,b.length],e=_slicedToArray(d,2),f=e[0],g=e[1];for(let d=0;d<f;d++)for(let e=0;e<g;e++){let g="vertical"===direction?[e,d]:[d,e],h=_slicedToArray(g,2),i=h[0],a=h[1];grid.push({index:i*f+a,value:c[i].childNodes[a]})}}if("colorByJpath"===colorOptions){let arrayPath=colorJpath.split(".");arrayPath.shift(),arrayPath=arrayPath.join(".");let jpathItems=[];this.wellsList.filter(function(item){let previous=arrayPath.split(".");1!==previous.length&&(previous.pop(),previous=previous.join("."));let value=eval(`item.${previous}`)?eval(`item.${arrayPath}`):null;value=DataObject.resurrect(value);let element=this.find(a=>a===value);void 0===element&&null!==value&&"object"!=typeof value&&this.push(value)},jpathItems);for(let a=0;a<grid.length;a++)this.addConfigurations(grid,a,arrayPath,jpathItems)}if("colorByJpathValue"===colorOptions){let a=cfg("jpathValue"),b=a.split(".");b.shift(),b=b.join(".");for(let a=0;a<grid.length;a++)this.addConfigurations(grid,a,b)}for(let a=0;a<wellsList.length;a++)this.listenHighlight(grid,wellsList[a]._highlight,a)}},addConfigurations:function(grid,currentItem,colorJpath,jpathItems){let color;jpathItems&&(color=Color.getDistinctColorsAsString(jpathItems.length));const element=this.wellsList[currentItem];if(colorJpath){let previous=colorJpath.split(".");if(1!==previous.length&&(previous.pop(),previous=previous.join(".")),void 0===element)return;if(void 0===eval(`element.${previous}`))return;const val=DataObject.resurrect(eval(`element.${colorJpath}`));if(jpathItems){const a=jpathItems.findIndex(a=>a==val);$(grid[currentItem].value).find(":eq(1)").css({"background-color":color[a]})}else{if(Number.isNaN(parseInt(val,10)))return;let a=this.module.getConfiguration,b=a("min"),c=a("max"),d=a("spectrumColors");if(c=parseFloat(c),b=parseFloat(b),val<b||val>c)return;let e=Array(10).fill(b).map((a,d)=>a+(c-b)/10*d);const f="object"==typeof val?e.findIndex(a=>a>val):val;d[3]=parseFloat(f)/c,f&&$(grid[currentItem].value).find(":eq(1)").css({"background-color":`rgba(${d})`})}}},listenHighlight:function(a,b,c){const d=this;API.listenHighlight({_highlight:b},function(b){if(1===b){if(!a[c])return;$(a[c].value).find(":eq(0)").css({"border-color":"#F74949"})}else if(0===b){if(!a[c])return;$(a[c].value).find(":eq(0)").css({"border-color":"#ddd"})}},!1,d.module.getId())},buildGrid:function(a,b,c,d,e,f,g){let h=this.module.getConfiguration("plateIndex",0),k=this.module.getConfiguration("colorOptions",void 0),l=this.module.getConfiguration("wellSize",30),m=$("<div>");for(let j,n=0;n<c;n++){j=$("<table>");for(let c,m=0;m<d;m++){c=$("<tr>").attr({name:`row${m+""}`}).css({"vertical-align":"top"});for(let i=0;i<e;i++){let j="vertical"===f?n*d*e+i*d+m:n*d*e+m*e+i,o=$("<td>"),p=$("<div>").addClass("well-plate-well-bottom").css({"border-radius":`${l}px`,height:`${l}px`,width:`${l}px`}),q=$("<div>").addClass("well-plate-well-top"),r=Number.isNaN(parseInt(b[j][0],10))?b[j]:h*e*d+j+1;q.text("<div>").text(r),g.margin&&0!=(i+g.index)%2&&p.css({margin:"30px 0px 0px 0px"});let s="colorBySample"===k?a:Array(a.length).fill({color:"rgba(141, 234, 106)"});q.css({"background-color":`${void 0===s[j]?"#FFFFFF":s[j].color}`,"line-height":`${l}px`}),p.append(q),o.append(p),c.append(o)}j.append(c)}let c=$("<div>").css({"border-style":"inset"}).append(j);m.append(c)}return m}}),View});function createWellLabels(a,b){let c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},d=c.direction,e=void 0===d?"vertical":d,f=Object.entries(a);for(let c=0;c<f.length;c++)if(Number.isNaN(parseInt(f[c][1],10))){let a=f[c][1].toUpperCase().charCodeAt(0),b=Array(a-64).fill().map((a,b)=>String.fromCharCode(b+65));f[c][1]=b}else{let a=Array(parseInt(f[c][1],10)).fill().map((a,b)=>b+1);f[c][1]=a}let g=[],h=[f[0][1],f[1][1]],k=h[0],l=h[1];if(Number.isInteger(k[0])&&Number.isInteger(l[0])){let a="vertical"===e?k:l;for(let c=0;c<b;c++)for(let b,c=0;c<k.length;c++){b=[];for(let d=0;d<l.length;d++){let f="vertical"===e?[c,d]:[d,c],g=_slicedToArray(f,2),h=g[0],i=g[1];b[d]=`${i*a.length+a[h]}`}g.push(...b)}}else{var m="vertical"===e?[k,l]:[l,k],n=_slicedToArray(m,2);k=n[0],l=n[1];for(let a=0;a<b;a++)for(let a,b=0;b<k.length;b++){a=[];for(let c,d=0;d<l.length;d++)c="string"==typeof k[b]?k[b]+l[d]:l[d]+k[b],a[d]=`${c}`;g.push(...a)}}return{wellLabels:g,axis:f}}function checkJpath(a){const b=Object.entries(a);for(let c=0;c<b.length;c++)a[b[c][0]]=Array.isArray(b[c][1])?b[c][1]:[b[c][1]]}
