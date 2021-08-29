<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/frames">
          <ion-label>Frames</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/galleries">
          <ion-label>Galleries</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/setup">
          <ion-label>Setup</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonPage,
  IonRouterOutlet
} from '@ionic/vue';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet },
  setup() {
    return {
    }
  }
}
</script>
