'use strict';Object.defineProperty(exports,'__esModule',{value:true});var compositionApi=require('@vue/composition-api'),vueChartjs=require('vue-chartjs');var script = {
  mixins: [vueChartjs.Line, vueChartjs.mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
      default: function _default() {}
    },
    options: {
      type: Object,
      required: true,
      default: function _default() {}
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.renderChart(_this.chartData, _this.options);
    });
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-3c000760";
/* functional template */

var __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var variables = {
  OPTIONS: {
    legend: {
      labels: {
        filter: function filter(items) {
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
};//
var script$1 = compositionApi.defineComponent({
  components: {
    LineChart: __vue_component__
  },
  props: {
    chartData: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    }
  },
  setup: function setup(props, context) {
    var state = compositionApi.reactive({
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
      state: state
    };
  }
});function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__ = function __vue_render__() {
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

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-26f2d154_0", {
    source: "div[data-v-26f2d154]{width:57%}@media screen and (max-width:768px){div[data-v-26f2d154]{width:100%}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-26f2d154";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-26f2d154";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installStudentGradesGraph(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('StudentGradesGraph', __vue_component__$1);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__$1;