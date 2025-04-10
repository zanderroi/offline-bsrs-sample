<template>
  <ion-page style="background-color: blue;">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-card>
            <img :src="`/img/tesdalogo.png`" class="logo" alt="TESDA Logo">
            <ion-card-header>
              <ion-card-title style="font-size: medium;">BSRS Offline</ion-card-title>
              <ion-card-subtitle style="font-size: small;">Welcome back! Please enter your
                credentials.</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <ion-label position="floating" style="font-size: small;">Email</ion-label>
              <ion-input class="input" v-model="email" type="email" required></ion-input>

              <ion-label position="floating" style="font-size: small;">Password</ion-label>
              <ion-input class="input" v-model="password" type="password" required>
                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
              </ion-input>

              <ion-button expand="block" @click="login" style="font-size: small;">Login</ion-button>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonInputPasswordToggle
} from "@ionic/vue";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();


const login = async () => {
  error.value = "";
  try {

    const response = await axios.post("/api/auth/login", {
      email: email.value,
      password: password.value,
    });


    const token = response.data.access_token;
   // console.log('Token:', token);

    localStorage.setItem("token", token);

    router.push("/");
  } catch (err) {
    console.error("Login error:", err.response || err.message);
    error.value = err.response?.data?.message || "Invalid email or password";
  }
};

const registerDevice = async (deviceId, licenseKey) => {
  try {
    const response = await axios.post('/api/offline/activate-key', {
      device_id: deviceId,
      license_key: licenseKey,
    });

    if (response.data.status) {
      localStorage.setItem('device_id', deviceId);
      localStorage.setItem('app_key', response.data.app_key);  // Assuming app_key is returned by the server
      console.log('Device registered and paired with license key');
    } else {
      console.error('Failed to pair device:', response.data.message);
    }
  } catch (err) {
    console.error('Error registering device:', err.response?.data || err.message);
  }
};
</script>

<style>
.input {
  border-radius: 5px;
  border-color: gray;
}


ion-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 20px;
}

.logo {
  width: 100px;
  height: auto;
  margin: 0 auto;
  display: block;
}
</style>
