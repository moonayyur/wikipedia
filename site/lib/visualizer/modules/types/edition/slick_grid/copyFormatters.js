'use strict';define(["src/util/api"],function(a){"use strict";let b;return{OCLToMolfile:{load:async function(){b=await a.require("openchemlib/openchemlib-core")},extract:function(a,c){DataObject.check(a,!0);let d=a.getChildSync(c.jpath);d=d?d.get()||"":"";const e=b.Molecule.fromIDCode(d);return e.toMolfileV3()}}}});
