import { defineComponent, reactive } from '@vue/composition-api';
import { Line, mixins } from 'vue-chartjs';

var script = {
  mixins: [Line, mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => {}
    },
    options: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.renderChart(this.chartData, this.options);
    });
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

const variables = {
  OPTIONS: {
    legend: {
      labels: {
        filter: items => {
          return items.text = '';
        }
      }
    },
    tooltips: {
      mode: 'index',
      intersect: true,
      yPadding: 8,
      xPadding: 20,
      titleFontSize: 0,
      bodyFontSize: 16,
      bodyFontColor: '#354B4F',
      backgroundColor: '#fff',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#E1EBEB',
      cornerRadius: 5,
      displayColors: false
    },
    scales: {
      xAxes: [{
        display: true,
        // Y軸の表示
        ticks: {
          min: 0,
          // Y軸の最小値
          max: 5,
          // Y軸の最大値
          fontSize: 12,
          // Y軸のフォントサイズ
          fontColor: '#7BA0A6',
          stepSize: 1 // Y軸の間隔

        },
        gridLines: {
          color: '#E1EBEB'
        }
      }],
      yAxes: [{
        position: 'right',
        ticks: {
          display: false,
          min: 0,
          max: 100,
          fontSize: 12,
          fontColor: '#7BA0A6',
          stepSize: 20
        },
        gridLines: {
          color: '#E1EBEB'
        }
      }]
    }
  }
};

//
var script$1 = defineComponent({
  components: {
    LineChart: __vue_component__
  },
  props: {
    chartData: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  setup(props, context) {
    const state = reactive({
      options: {},
      mql: window.matchMedia('(max-width: 768px)'),
      height: 0,
      isMobile: false
    });
    state.myData = createGraphData(props.summaryData, props.monthlyData, contLabel.value, contKey.value);
    state.options = variables.OPTIONS;

    if (state.mql.matches) {
      state.height = 126;
      state.isMobile = true;
    } else {
      state.height = 124;
      state.isMobile = false;
    }

    return {
      state
    };
  }

});

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [!_vm.state.isMobile ? [_c('line-chart', {
    attrs: {
      "chart-data": _vm.chartData,
      "options": _vm.options,
      "width": 422,
      "height": _vm.height
    }
  })] : [_c('line-chart', {
    attrs: {
      "chart-data": _vm.chartData,
      "options": _vm.options,
      "height": _vm.height
    }
  })]], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-26f2d154_0", {
    source: "div[data-v-26f2d154]{width:57%}@media screen and (max-width:768px){div[data-v-26f2d154]{width:100%}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-26f2d154";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

// Import vue component

const install = function installStudentGradesGraph(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('StudentGradesGraph', __vue_component__$1);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$1;
