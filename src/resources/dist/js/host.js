/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/resources/js/dispatcher.js":
/*!****************************************!*\
  !*** ./src/resources/js/dispatcher.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventDispatcher": () => (/* binding */ eventDispatcher)
/* harmony export */ });
/**
 * API for dispatching events between windows that have the `window.x`
 * library loaded.
 */
var eventDispatcher = function eventDispatcher(target, streamId) {
  var handlers = {}; // Listen for messages being sent to the current window. Received
  // messages are only delegated to their handler if the handler exists
  // and the "key" matches the streamID of the dispatcher. This helps
  // ensure messages from other libraries do not accidently trigger
  // our handlers.

  window.addEventListener('message', function (event) {
    var _event$data = event.data,
        key = _event$data.key,
        type = _event$data.type,
        message = _event$data.data;
    var isValidMessage = key === streamId;
    var handler = handlers[type];
    if (isValidMessage && handler) handler(message);
  });
  return {
    /**
     * Listen for messages of the provided name/ID.
     */
    on: function on(name, handler) {
      handlers[name] = handler;
    },

    /**
     * Dispatch a message to any regsitered handlers.
     */
    dispatch: function dispatch(name, message) {
      target.postMessage({
        type: name,
        data: message,
        key: streamId
      }, '*');
    }
  };
};

/***/ }),

/***/ "./src/resources/js/utils.js":
/*!***********************************!*\
  !*** ./src/resources/js/utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getComponentEl": () => (/* binding */ getComponentEl),
/* harmony export */   "getComponentDepth": () => (/* binding */ getComponentDepth),
/* harmony export */   "getComponentChildren": () => (/* binding */ getComponentChildren),
/* harmony export */   "getComponentParent": () => (/* binding */ getComponentParent),
/* harmony export */   "highlightComponent": () => (/* binding */ highlightComponent)
/* harmony export */ });
/**
 * Returns the element associated with the provide instance ID.
 */
var getComponentEl = function getComponentEl(instanceId) {
  return document.querySelector("[data-stackr-component=\"".concat(instanceId, "\"]"));
};
/**
 * Returns the depth of the provided element.
 */

var getComponentDepth = function getComponentDepth(el) {
  var depth = 0;
  var node = el; // Increase depth until we reach the root (root has depth 0)

  while (node = node.parentElement) {
    if (node.hasAttribute('data-stackr-component')) {
      depth++;
    }
  }

  return depth;
};
/**
 * Returns the direct children of the provided element.
 */

var getComponentChildren = function getComponentChildren(el) {
  var children = Array.from(el.querySelectorAll('[data-stackr-component]'));
  return children.filter(function (child) {
    return getComponentParent(child) === el;
  }).map(function (el) {
    return el.getAttribute('data-stackr-component');
  });
};
/**
 * Returns the parent component of the provided element.
 */

var getComponentParent = function getComponentParent(el) {
  var parent = el;

  while ((parent = parent.parentElement) && !parent.hasAttribute('data-stackr-component')) {
    ;
  }

  return parent ? parent.getAttribute('data-stackr-component') : null;
};
var highlightComponent = function highlightComponent(instanceId) {
  var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  Array.from(document.querySelectorAll('.stackr-highlight')).forEach(function (el) {
    el.classList.remove('stackr-highlight');
  });
  getComponentEl(instanceId).classList.toggle('stackr-highlight', show);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/resources/js/host.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dispatcher */ "./src/resources/js/dispatcher.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/resources/js/utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function highlightInstance(id) {
  var highlight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var scrollIntoView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var el = document.querySelector("[data-stackr-component=\"".concat(id, "\"]"));

  if (el) {
    if (scrollIntoView && highlight) el.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
    el.classList.toggle('stackr-highlight', highlight);
  }
}

function decorateInstance(id, el, dispatcher) {
  if (!el) {
    console.warn('decorateInstance: no element found for id', id);
    return;
  }

  var data = window.stackrComponents[el.getAttribute('data-stackr-component')];
  var stackrDiv = document.createElement('div');
  el.addEventListener('mouseover', function (e) {
    highlightInstance(id, true, false);
    dispatcher.dispatch('STACKR_INSTANCE_MOUSE_OVER', id);
  });
  el.addEventListener('mouseout', function (e) {
    highlightInstance(id, false);
    dispatcher.dispatch('STACKR_INSTANCE_MOUSE_OUT', id);
  });
  stackrDiv.classList.add('stackr-debug');
  el.appendChild(stackrDiv);
  return el;
}

function getInstances(inspector) {
  // Listen for events from the inspector.
  inspector.on('STACKR_HIGHLIGHT_INSTANCE', function (obj) {
    highlightInstance(obj.id, obj.highlight);
  });
  return Object.keys(window.stackrComponents).map(function (key) {
    var el = decorateInstance(key, document.querySelector("[data-stackr-component=\"".concat(key, "\"]")), inspector);
    return !el ? null : _objectSpread(_objectSpread({
      id: key
    }, window.stackrComponents[key]), {}, {
      depth: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getComponentDepth)(el),
      parent: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getComponentParent)(el),
      children: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getComponentChildren)(el)
    });
  }).filter(function (c) {
    return c !== null;
  });
}

(function () {
  var inspector = (0,_dispatcher__WEBPACK_IMPORTED_MODULE_0__.eventDispatcher)(window.parent, "stackr-inspector");
  var url = document.location.href; // 1. Notify the inspector that we're ready.

  console.log('Stackr-Host: Sending host ready message...');
  inspector.dispatch('STACKR_HOST_READY', {
    url: url
  });
  console.log('Stackr-Host: Waiting for inspector to connect...'); // 2. Wait for the Inspector to start.

  inspector.on('STACKR_INSPECTOR_CONNECT', function () {
    inspector.dispatch('STACKR_HOST_CONNECTED', {
      url: url,
      instances: getInstances(inspector)
    });
  });
})();
})();

/******/ })()
;