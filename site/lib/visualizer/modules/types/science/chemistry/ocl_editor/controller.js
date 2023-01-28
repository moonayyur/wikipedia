'use strict';define(["modules/default/defaultcontroller","openchemlib/openchemlib-full","src/util/ui"],function(a,b,c){"use strict";function d(){this.currentMol={idCode:"",coordinates:""}}return $.extend(!0,d.prototype,a),d.prototype.getToolbar=function(){var d=a.getToolbar.call(this);return d.unshift({onClick:function(){var a=$(window).width(),b=$(window).height(),d=require.toUrl("modules/types/science/chemistry/ocl_editor/help/index.html");c.dialog(`<iframe src=${d} width="100%", height="100%" frameBorder="0"></iframe>`,{width:Math.min(a-40,800),height:b-70,title:"OpenChemLib editor Help"})},title:"Help",cssClass:"fa fa-question",ifLocked:!0}),d.unshift({onClick:()=>{navigator.clipboard&&navigator.clipboard.readText().then(a=>{a.includes("\n")||(a=b.Molecule.fromSmiles(a).toMolfile()),this.module.view.onActionReceive.setMolfile.call(this.module.view,a)})},title:"Import molfile or SMILES from clipboard",cssClass:"fa fa-paste",ifLocked:!0}),d.unshift({onClick:()=>{this.module.view.onActionReceive.copyMolfile.call(this.module.view)},title:"Copy Molfile V3 to clipboard",cssClass:"fa fa-copy",ifLocked:!0}),d.unshift({onClick:()=>{this.module.view.onActionReceive.downloadSvg.call(this.module.view)},title:"Download as SVG vector file",cssClass:"fa fa-image",ifLocked:!0}),d.unshift({onClick:()=>{this.module.view.onActionReceive.downloadMolfile.call(this.module.view)},title:"Download as molfile",cssClass:"fa fa-download",ifLocked:!0}),d},d.prototype.moduleInformation={name:"OCL Molecule editor",description:"Molecule editor using the openchemlib javascript library",author:"Michael Zasso",date:"11.05.2015",license:"BSD",cssClass:"ocl_editor"},d.prototype.references={mol:{label:"Molfile 2D"},molV3:{label:"Molfile V3 2D"},smiles:{label:"Smiles"},actid:{label:"OCL molecule ID"},actidOrGroup:{label:"OCL molecule ID. Distinguish racemic OR group."}},d.prototype.variablesIn=["mol","molV3","smiles","actid"],d.prototype.events={onStructureChange:{label:"Molecular structure has changed",refVariable:["mol","molV3","smiles","actid","actidOrGroup"]}},d.prototype.actionsIn=$.extend({},a.actionsIn,{setMolfile:"Set molecule from molfile",downloadSvg:"Download molecule as SVG",copyMolfile:"Copy Molfile to clipboard"}),d.prototype.configurationStructure=function(){return{groups:{group:{options:{type:"list"},fields:{prefs:{type:"checkbox",title:"Options",default:["svg"],options:{queryFeatures:"Enable query features",svg:"Use SVG toolbar",inPlace:"Modify input variable"}}}}}}},d.prototype.configAliases={prefs:["groups","group",0,"prefs",0]},d.prototype.onChange=function(a,c){const d=this.module.getConfigurationCheckbox("prefs","inPlace");if(!(d&&null===this.module.view._currentValue)){var e=(a||" ").split(" "),f=c.getCanonizedIDCode(b.Molecule.CANONIZER_DISTINGUISH_RACEMIC_OR_GROUPS),a=e[0],g=e[1];if(f!==this.currentMol.idCodeOr){this.currentMol={coordinates:g,idCode:a,idCodeOr:f};var h=c.toMolfile(),i=c.toMolfileV3(),j=c.toSmiles();if(this.createDataFromEvent("onStructureChange","mol",h),this.createDataFromEvent("onStructureChange","molV3",i),this.createDataFromEvent("onStructureChange","smiles",j),this.createDataFromEvent("onStructureChange","actid",{value:e[0],coordinates:e[1]}),this.createDataFromEvent("onStructureChange","actidOrGroup",{value:f,coordinates:g}),d&&this.module.view._currentType){var k=this.module.view._currentValue;switch(this.module.view._currentType){case"mol":k.setValue(h);break;case"molV3":k.setValue(i);break;case"smiles":k.setValue(j);break;case"oclid":k.value&&(k.coordinates=e[1]),k.setValue(e[0]);break;default:throw new Error("invalid structure format type");}this.module.model.dataTriggerChange(k)}}}},d});
