import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);
const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
            primary: colors.orange.base,
            secondary: colors.yellow.base,
            accent: colors.indigo.base,
            error: colors.pink.base,
            warning: colors.red.base,
            info: colors.blue.base,
            success: colors.green.base
        },
      },
    },
  })
export default vuetify

