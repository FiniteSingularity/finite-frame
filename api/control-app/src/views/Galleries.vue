<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Galleries</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="gallery in galleries" :key="gallery.id" @click="openGallery(gallery.id)">
          <ion-label>{{ gallery.name }}</ion-label>
          <ion-badge color="primary" slot="end">{{ gallery.image_count }} images</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonBadge } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Galleries',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonLabel, IonItem, IonBadge },
  setup() {
    const store = useStore();
    const router = useRouter();

    const galleries = computed(function() { return store.getters['galleries/all'] });

    function openGallery(galleryId: any) {
      router.push(`/tabs/galleries/${galleryId}`);
    }

    return {
      galleries,
      openGallery
    }
  }
});

</script>
