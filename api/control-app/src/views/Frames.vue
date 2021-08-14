<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>FS Frames</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="frame in frames" :key="frame.id" @click="frameClicked(frame.id)">
          <ion-label>{{ frame.frame_location }}: {{ frame.username }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
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
  IonLabel
} from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Frames',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const frames = computed(function() { return store.getters['frames/all'] });

    function frameClicked(id: string) {
      console.log(id);
      router.push(`/tabs/frames/${id}`);
    }

    return {
      frames,
      frameClicked
    };
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
