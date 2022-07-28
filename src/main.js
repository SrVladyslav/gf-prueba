import { createApp } from 'vue'
import App from './App'
// import './registerServiceWorker'
import router from "@/router/router"
import directives from "@/directives"
import store from '@/store'

// Importamos los componentes UI que creamos
import components from "@/components/UI"

const app = createApp(App)

// Registramos globalmente a nuestros componentes
components.forEach(component => {
    app.component(component.name, component)
});

// registrando las directivas v-intersection
directives.forEach(directive => {
        app.directive(directive.name, directive)
    })
    //app.directive('intersection', VInteresection)
app.use(router).use(store).mount('#app')