'use strict';define([require,"../../field","fancytree"],function(a,b){"use strict";var c=function(a){$.ui.fancytree.debugLevel=0;var b=this;this.name=a,this.domExpander=$("<div></div>").fancytree({toggleEffect:!1,debut:0,source:[],activate:function(a,c){c=c.node,c.data.isFolder||b.getElementExpanded()&&(b.getElementExpanded().value=c.key)},click:function(a,c){c=c.node,c&&(!c.children||c.children&&0==c.children.length)&&b.form.hideExpander(!0)}})};return c.prototype=new b,c.prototype.showExpander=function(a){var b,c=this.getOptions(a),d=this.domExpander.fancytree("getRootNode"),e=this.domExpander.fancytree("getTree");this._showExpander(a),e._callHook("treeClear",e),d.addChildren(c),e.getActiveNode&&null!=(b=e.getActiveNode())&&b.setActive(!1),e.getNodeByKey&&(b=e.getNodeByKey(a.value))&&b.setActive(!0),d.toggleExpanded()},c});
