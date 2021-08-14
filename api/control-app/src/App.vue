<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch('frames/loadAll');
      store.dispatch('galleries/loadAll');
    });
  }
});
</script>
