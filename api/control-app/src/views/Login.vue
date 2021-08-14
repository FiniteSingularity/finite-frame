<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <p v-if="error !== null">{{ error }}</p>
        <form @submit.prevent="login()">
        <ion-item>
          <ion-label position="floating">Username</ion-label>
          <ion-input v-model="username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-button expand="full" type="submit">Login</ion-button>
        </form>
      </div>
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
  IonLabel,
  IonInput,
  IonItem,
  IonButton
  
} from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
  },
  setup() {
    const username = ref();
    const password = ref();
    const store = useStore();
    const router = useRouter();

    const error = computed(function () {
      return store.getters['auth/error'];
    });


    async function login() {
      const success = await store.dispatch('auth/login', {
        username: username.value,
        password: password.value,
      });
      if (success) {
        router.replace('/');
      }
    }

    return {
      username,
      password,
      login,
      error
    }
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
