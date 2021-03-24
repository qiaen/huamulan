import { computed } from 'vue'
import store from '../store/index'
export default function () {
    let menus = computed(() => store.getters.menus)
    return {
        menus,
        SetMenus: (menus: array) => {
            console.log(store)
            store.dispatch('layout/SetMenus', menus)
        }
    }
}