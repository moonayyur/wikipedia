'use strict';define(["modules/default/defaultcontroller","src/util/datatraversing","src/util/api","src/util/debug"],function(a,b,c,d){"use strict";function e(){}return $.extend(!0,e.prototype,a),e.prototype.init=function(){this.toggleElements={},this.resolveReady()},e.prototype.moduleInformation={name:"Table",description:"Displays a complex (but slower) grid with editable capability. Works async",author:"Norman Pellet",date:"24.12.2013",license:"MIT",cssClass:"jqgrid"},e.prototype.references={row:{label:"Row"},list:{label:"Table"},selectedrows:{label:"Selected rows"}},e.prototype.events={onSelect:{label:"A line is selected",refVariable:["row"],refAction:["row"]},onHover:{label:"Hovers a line",refVariable:["row"],refAction:["row"]},onToggleOn:{label:"On Toggle On",refVariable:["selectedrows"],refAction:["row"]},onToggleOff:{label:"On Toggle Off",refVariable:["selectedrows"],refAction:["row"]}},e.prototype.variablesIn=["list"],e.prototype.actionsIn=$.extend({},e.prototype.actionsIn,{addRow:"Add a new row",addColumn:"Add a new column",removeColumn:"Remove a column",removeRow:"Remove a row"}),e.prototype.configurationStructure=function(){var a=this.module.model.getjPath("row",!1);return{groups:{group:{options:{type:"list",multiple:!1},fields:{nblines:{type:"float",title:"Lines per page",default:20},toggle:{type:"combo",title:"Line toggling",options:[{key:"0",title:"No"},{key:"single",title:"Single row"},{key:"multiple",title:"Multiple rows"}]},colorjpath:{type:"combo",title:"Color jPath",options:a},filterRow:{type:"jscode",title:"Filter"},highlightLine:{type:"checkbox",title:"Highlight on hover",options:{Yes:"Yes"},default:["Yes"]}}},cols:{options:{type:"table",multiple:!0,title:"Columns"},fields:{name:{type:"text",title:"Columns title"},jpath:{type:"combo",title:"jPath",options:a},number:{type:"checkbox",title:"Number ?",options:{number:"Yes"}},editable:{type:"combo",title:"Editable",default:"none",options:[{key:"none",title:"No"},{key:"text",title:"Text"},{key:"checkbox",title:"Checkbox"},{key:"select",title:"Combo"}]},options:{type:"text",title:"Options (; separated)"},width:{type:"text",title:"Width"}}}}}},e.prototype.onVarReceiveChange=function(a,d,e){var f=c.getVar(a),g=[];f&&("array"==f.getType()?b.getJPathsFromElement(f.get(0),g):"arrayXY"==f.getType()&&b.getJPathsFromElement(f,g),1<g.length&&e.getGroup("cols").getField("coljpath").implementation.setOptions(g))},e.prototype.configFunctions={colsjPaths:function(a){return a||[]}},e.prototype.configAliases={colsjPaths:["groups","cols",0],nbLines:["groups","group",0,"nblines",0],toggle:["groups","group",0,"toggle",0],colorjPath:["groups","group",0,"colorjpath",0],filterRow:["groups","group",0,"filterRow",0],highlightLine:["groups","group",0,"highlightLine",0]},e.prototype.lineHover=function(a,b){this.setVarFromEvent("onHover","row","list",[b]),this.sendActionFromEvent("onHover","row",a.get(b)),c.highlight(a[b],1)},e.prototype.lineOut=function(a,b){var d=a[b];d&&c.highlight(d,0)},e.prototype.lineClick=function(a,b){this.setVarFromEvent("onSelect","row","list",[b]),this.sendActionFromEvent("onSelect","row",a.get(b))},e.prototype.onToggleOn=function(a,b){this.sendActionFromEvent("onToggleOn","row",a.get(b)),this.setVarFromEvent("onToggleOn","row","list",[b]),this.toggleElements[b]=!0,this.doToggle("on")},e.prototype.onToggleOff=function(a,b){this.sendActionFromEvent("onToggleOff","row",a.get(b)),this.setVarFromEvent("onToggleOff","row","list",[b]),delete this.toggleElements[b],this.doToggle("off")},e.prototype.doToggle=function(a){var b=this,e=this.module.getDataFromRel("list");this.allVariablesFor("on"==a?"onToggleOn":"onToggleOff","selectedrows",function(a){var f=new DataArray;for(var g in b.toggleElements)if(e[g]){e.traceSync([g]),d.warn("Warning. This is only sync");var h=e[g].traceSync(a.jpath.slice(0));f.push(h)}c.createData(a.name,f,a.filter)})},e.prototype.export=function(){return this.module.view.exportToTabDelimited()},e});
