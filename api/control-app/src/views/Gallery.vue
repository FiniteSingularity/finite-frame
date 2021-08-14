<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ gallery.name }}</ion-title>
        <ion-buttons slot="start"><ion-back-button></ion-back-button></ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ gallery.name }}</ion-title>
          <ion-buttons slot="start"><ion-back-button></ion-back-button></ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item><ion-label>Test</ion-label></ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons
} from '@ionic/vue';

import { Gallery } from '@/models/gallery.model';

export default defineComponent({
  name: 'Gallery',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonBackButton,
    IonButtons
  },
  props: ['id'],
  setup(props) {
    const store = useStore();

    const galleryId = ref();
    const gallery = ref();

    function getGalleryData(id) {
      galleryId.value = id;
      gallery.value = store.getters['galleries/entities'][id];
    }

    watch(
      () => props.id,
      async newId => {
        console.log('newId', newId);
        getGalleryData(newId);
      }
    );

    onBeforeMount(() => {
      getGalleryData(props.id);
    });



    return {
      galleryId,
      gallery
    }
  }
});
</script>
