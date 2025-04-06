<template>
  <ion-page style="background-color: blue;">
    <ion-grid >
      <ion-row>
        <ion-col>
          <ion-card>
            <img :src="`/img/tesdalogo.png`" class="logo" alt="TESDA Logo">
            <ion-card-header>
              <ion-card-title style="font-size: medium;">BSRS Offline</ion-card-title>
              <ion-card-subtitle style="font-size: small;">Welcome back! Please enter your credentials.</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <ion-label position="floating" style="font-size: small;">Email</ion-label>
              <ion-input
                class="input"
                v-model="email"
                type="email"
                required
              ></ion-input>

              <ion-label position="floating" style="font-size: small;">Password</ion-label>
              <ion-input
                class="input"
                v-model="password"
                type="password"
                required
              >
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
    const response = await axios.post("http://your-api-domain.com/api/login", {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);

    // Redirect to home or dashboard
    router.push("/home");
  } catch (err) {
    error.value = "Invalid email or password";
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
