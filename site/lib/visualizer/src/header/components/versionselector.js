'use strict';define(["jquery","src/header/components/default","src/util/versioning","src/util/util","uri/URI","lib/semver/semver"],function(a,b,c,d,e,f){"use strict";function g(){}function h(){return l||(l=Promise.resolve(a.getJSON(k))),l}function i(a){var b;return"query"===m?b=a.query(!0):"fragment"===m&&(b=a.fragment(!0)),b}function j(a,b,c){return"query"===m?a.setQuery(b,c):"fragment"===m&&(a.removeFragment(b),a.addFragment(b,c)),a}var k,l,m,n;return d.inherits(g,b,{initImpl:function(){k=this.options.url,m=this.options.queryType||"query",this.minVersion=this.options.minVersion&&f.valid(this.options.minVersion)?this.options.minVersion:"0.0.0"},_onClick:function(){var a=this;this.setStyleOpen(this._open),this._open?(n&&n!==this&&n._open&&n.onClick(),n=a,this.doElements()):this.close()},doElements:function(){var b,d=this,g=new e(document.location.href),j=i(g);b=j.v?j.v:`v${c.version}`,h().then(c=>{for(var e,g=d.$_elToOpen=a("<ul />"),h=0;h<c.length;h++)if(e=c[h],!(f.valid(e)&&f.lt(e,this.minVersion))){var j=b===e;g.append(d._buildSubElement(c[h],j))}d.open()})},_buildSubElement:function(b,c){var d=(c?"\u2022 ":"")+b,e=this,f=a("<li />").text(d);return f.addClass("hasEvent").bind("click",function(){e.load(b),e.onClick()}),f},load:function(a){var b=new e(document.location.href),c=i(b);c.v!==a&&(j(b,"v",a),document.location=b.href(),"fragment"===m&&document.location.reload())}}),g});
