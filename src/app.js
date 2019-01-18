import Vue from 'vue';
import App from '@/components/App.vue';


Vue.config.productionTip = false;

export function createApp(__STATE__) {

    if (__STATE__) {
        App.propsDaat = __STATE__;
    }

    const app = new Vue({
        render: h => h(App),
    });

    return { app };
}
