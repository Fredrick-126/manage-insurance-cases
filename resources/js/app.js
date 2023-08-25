import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import Maska from 'maska'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
  setup({ el, App, props, plugin }) {
    // eslint-disable-next-line vue/component-api-style
    return createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(Maska)
      .use(ZiggyVue)
      .mount(el)
  },
  progress: {
    color: '#4B5563',
  },
})
