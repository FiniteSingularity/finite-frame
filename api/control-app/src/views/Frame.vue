<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ frame.frame_location }}</ion-title>
        <ion-buttons slot="start"><ion-back-button></ion-back-button></ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ frame.frame_location }}</ion-title>
          <ion-buttons slot="start"><ion-back-button></ion-back-button></ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-list v-if="frame.state">
        <ion-item>
          <ion-label>View</ion-label>
          <ion-select v-model="frame.state.view" interface="popover">
            <ion-select-option value="P">Pictures</ion-select-option>
            <ion-select-option value="C">Calendar</ion-select-option>
            <ion-select-option value="R">Recipes</ion-select-option>
            <ion-select-option value="V">Videos</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item v-if="frame.state.view === 'P'">
          <ion-label>Gallery</ion-label>
          <ion-select v-model="frame.state.gallery" interface="popover">
            <ion-select-option
              v-for="gallery of galleries"
              :key="gallery.id"
              :value="gallery.id"
            >{{ gallery.name }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button slot="end" @click="updateFrameState()">Update</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonFooter,
  IonBackButton,
  IonButtons
} from '@ionic/vue';
import { defineComponent, onBeforeMount, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { Frame } from '@/models/frame.model';

export default defineComponent({
  name: 'Frame',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonFooter,
    IonBackButton,
    IonButtons
  },
  props: ['id'],
  setup(props) {
    const store = useStore();

    const frameId = ref();

    const frame = computed(function() { 
      const entities = store.getters['frames/entities'];
      return entities[frameId.value] as Frame;
    });

    const galleries = computed(function() {
      return store.getters['galleries/all'];
    });

    watch(
      () => props.id,
      async newId => {
        console.log('new id!');
        frameId.value = newId;
      }
    );

    function updateFrameState() {
      store.dispatch('frames/updateFrameState', frame.value)
    }

    onBeforeMount(() => {
      frameId.value = props.id;
    });

    return {
      frameId,
      frame,
      galleries,
      updateFrameState,
    };
  }
});
</script>

<style scoped>

</style>
