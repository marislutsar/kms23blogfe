// https://github.com/ntohq/buefy-next/discussions/156
import Buefy, { DialogProgrammatic, ToastProgrammatic } from 'buefy';

import 'buefy/dist/buefy.css';

export default defineNuxtPlugin((nuxtApp) => {
    const appWithBuefy = nuxtApp.vueApp.use(Buefy, {});
    
    // @ts-ignore
    const dialog = new DialogProgrammatic(appWithBuefy);
    nuxtApp.provide('dialog', dialog);
    
    // @ts-ignore
    const toast = new ToastProgrammatic(appWithBuefy);
    nuxtApp.provide('toast', toast);
});