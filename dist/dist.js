!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).standalone=e()}}(function(){return function o(f,u,a){function c(r,e){if(!u[r]){if(!f[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(s)return s(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=u[r]={exports:{}};f[r][0].call(i.exports,function(e){return c(f[r][1][e]||e)},i,i.exports,o,f,u,a)}return u[r].exports}for(var s="function"==typeof require&&require,e=0;e<a.length;e++)c(a[e]);return c}({1:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.map=t.filter=t.from=void 0;var n=e("../inference"),i=e("../utils");t.from=function(e){var r=0,t=Array.isArray(e)?e:Object.entries(e);return function(){return r<t.length?(0,i.next)(t[r++]):(0,i.eof)()}},t.filter=function(r){return(0,n.inferArray)(function(e){return!0===r(e)?(0,i.next)(e):(0,i.arg)()})},t.map=function(r){return(0,n.inferArray)(function(e){return(0,i.next)(r(e))})}},{"../inference":4,"../utils":5}],2:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.takeWhile=t.take=void 0;var n=e("../inference"),i=e("../utils");t.take=function(r){var t=0;return(0,n.inferArray)(function(e){return t<r?(t++,(0,i.next)(e)):(t=0,i.eof)()})},t.takeWhile=function(r){return(0,n.inferArray)(function(e){return!0===r(e)?(0,i.next)(e):(0,i.eof)()})}},{"../inference":4,"../utils":5}],3:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.takeWhile=t.take=t.filter=t.map=t.lazy=void 0;var o=e("./utils"),n=e("./funcs/base"),i=e("./funcs/take");t.lazy=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){var i,r=(i=[(0,n.from)(e)].concat(t),function(){var e=i.length,r=0,t=void 0;do{var n=(0,i[r])(t);if((0,o.isNext)(n))t=(0,o.fmap)(n),r+=1;else if((0,o.isArg)(n))r-=1;else if((0,o.isEof)(n))return[t,o.EOF]}while(r<e);return[t]});return(0,t[t.length-1].__infer__)(r)}},t.map=n.map,t.filter=n.filter,t.take=i.take,t.takeWhile=i.takeWhile},{"./funcs/base":1,"./funcs/take":2,"./utils":5}],4:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.inferAny=t.inferObject=t.inferArray=void 0;var f=function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,r){var t=[],n=!0,i=!1,o=void 0;try{for(var f,u=e[Symbol.iterator]();!(n=(f=u.next()).done)&&(t.push(f.value),!r||t.length!==r);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw o}}return t}(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")},u=e("./utils"),n=function(e){var r={},t=null,n=void 0;do{var i=e(),o=f(i,2);if(t=o[0],n=o[1],(0,u.isEof)(n))break;Object.assign(r,t)}while((0,u.isNotEof)(n));return r},i=function(){throw new Error("Any inference is not supported")},o=function(r){return function(e){return e.__infer__=r,Object.freeze(e)}},a=o(function(e){var r=[],t=void 0,n=void 0;do{var i=e(),o=f(i,2);if(t=o[0],n=o[1],(0,u.isEof)(n))break;r.push(t)}while((0,u.isNotEof)(n));return r}),c=o(n),s=o(i);t.inferArray=a,t.inferObject=c,t.inferAny=s},{"./utils":5}],5:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},i=Object.freeze({state:"arg "}),o=Object.freeze({state:"eof "}),f=Object.freeze({state:"next "}),u=function(e){return f.state===e.state};t.EOF=o,t.fmap=function(e){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"value";return u(e)?e[r]:void 0},t.next=function(e){return n({},f,{value:e})},t.arg=function(){return i},t.eof=function(){return o},t.isArg=function(e){return i===e},t.isEof=function(e){return o===e},t.isNotEof=function(e){return o!==e},t.isNext=u},{}]},{},[3])(3)});
//# sourceMappingURL=dist.js.map