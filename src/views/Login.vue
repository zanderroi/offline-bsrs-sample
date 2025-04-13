<template>
  <ion-page style="background-color: blue">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-card class="mb-2">
            <img :src="`/img/tesdalogo.png`" class="logo" alt="TESDA Logo" />
            <ion-card-header>
              <ion-card-title style="font-size: medium">BSRS Offline</ion-card-title>
              <ion-card-subtitle style="font-size: small"
                >Welcome back! Please enter your credentials.</ion-card-subtitle
              >
            </ion-card-header>

            <ion-card-content>
              <ion-label position="floating" style="font-size: small">Email</ion-label>
              <ion-input class="input shadow-sm bg-gray-100" v-model="email" type="email" required></ion-input>

              <ion-label position="floating" style="font-size: small">Password</ion-label>
              <ion-input class="input shadow-sm bg-gray-100" v-model="password" type="password" required>
                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
              </ion-input>

              <ion-button expand="block" @click="login" class="mt-4" style="font-size: small"
                >Login</ion-button
              >
            </ion-card-content>
          </ion-card>

          <div class="px-6" v-if="!isCheckingKey && !hasLicenseKey">
            <router-link to="/license" class="ion-activatable ripple-parent">
              Link Device
            </router-link>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
    <IonLoading
        :is-open="isLoading"
        message="Logging in, please wait..."
        spinner="crescent"
      />
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Preferences } from "@capacitor/preferences";
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
  IonInputPasswordToggle,
} from "@ionic/vue";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const hasLicenseKey = ref(false);
const isCheckingKey = ref(true);
const isLoading = ref(false);

onMounted(async () => {
  const { value } = await Preferences.get({ key: "license_key" });
  hasLicenseKey.value = !!value;
  isCheckingKey.value = false; // now done checking
});

const login = async () => {
  error.value = "";
  try {
    isLoading.value = true;
    const response = await axios.post("/api/auth/login", {
      email: email.value,
      password: password.value,
    });
    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    const token = response.data.access_token;
    await Preferences.set({ key: "token", value: token });
    isLoading.value = false;
    router.push("/");
  } catch (err) {
    console.error("Login error:", err.response || err.message);
    error.value = err.response?.data?.message || "Invalid email or password";
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
