'use strict';define(["modules/default/defaultmodel","src/util/datatraversing"],function(a,b){"use strict";function c(){}return $.extend(!0,c.prototype,a,{getValue:function(){return this.dataValue},getjPath:function(){const a=this.module.getDataFromRel("wellsList");let c=[];return a&&null!=a?(b.getJPathsFromElement(a[0],c),c):c}}),c});