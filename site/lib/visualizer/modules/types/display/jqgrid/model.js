'use strict';define(["modules/default/defaultmodel","src/util/datatraversing"],function(a,b){"use strict";function c(){}return $.extend(!0,c.prototype,a,{getValue:function(){return this.dataValue},getjPath:function(a,c){var d;switch(a){case"selectedrows":case"row":case"element":if(d=c&&c.list?c.list:this.module.getDataFromRel("list")||new DataArray,d=d.get(0),!d)return[];break;default:d=this.module.data;}var e=[];return b.getJPathsFromElement(d,e),e}}),c});
