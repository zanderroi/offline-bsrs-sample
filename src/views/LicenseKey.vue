<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Back to Login Link -->
        <ion-buttons slot="start">
          <router-link to="/login" class="ion-activatable ripple-parent">
            <ion-button fill="clear" class="flex items-center">
              <ion-icon :icon="arrowBack" slot="start" size="small" />
              <span>Back to Login</span>
            </ion-button>
          </router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid class="bg-gray-100 h-full ">

        <ion-row class="ion-justify-content-center h-full ">
          <ion-col size="" class=" p-4">
            <h2 class="text-center font-extrabold text-blue-700 mb-4 mt-4">
              ACTIVATE YOUR DEVICE
            </h2>
            <ion-label position="floating" style="font-size: small"
              >License Key</ion-label
            >
            <ion-input
              class="w-full shadow-sm rounded-md bg-white text-xs ion-padding mb-2"
              style="height: 2%"
              v-model="licenseKey"
              type="text"
              required
            ></ion-input>
            <ion-button size="small" class="w-full p-4" @click="handleSubmit"
              >SUBMIT</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
      <IonLoading
        :is-open="isLoading"
        message="Registering device, please wait..."
        spinner="crescent"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
  IonLoading,
} from "@ionic/vue";

import { syncCircleSharp, arrowBack } from "ionicons/icons";
import { Device } from "@capacitor/device";
import { Preferences } from "@capacitor/preferences";

// Reactive variables
const licenseKey = ref("");
const deviceModel = ref(""); // To store the device model
const router = useRouter();
const isLoading = ref(false);

// Fetch the device model
const fetchDeviceModel = async () => {
  try {
    const info = await Device.getInfo();
    deviceModel.value = info.model || "Unknown Device";
    console.log("Device model:", deviceModel.value);
  } catch (err) {
    console.error("Error fetching device info:", err.message);
  }
};
// Generate a unique device ID
const generateDeviceId = async () => {
  try {
    const info = await Device.getInfo();
    const deviceModel = info.model || "unknown-device";
    return `device-${deviceModel}-${Math.random().toString(36).substr(2, 9)}`;
  } catch (err) {
    console.error("Error fetching device info:", err.message);
    return `device-unknown-${Math.random().toString(36).substr(2, 9)}`;
  }
};
// Register the device with the license key
const registerDevice = async (deviceId, licenseKey) => {
  try {
    console.log("Registering device with ID:", deviceId);
    const response = await axios.post("/api/offline/license", {
      device_id: deviceId,
      license_key: licenseKey,
    });

    if (response.data.status) {
      await Preferences.set({ key: "device_id", value: deviceId });
      await Preferences.set({ key: "license_key", value: licenseKey });

      console.log("Device registered and paired with license key");
      return true;
    } else {
      console.error("Failed to pair device:", response.data.message);
      return false;
    }
  } catch (err) {
    console.error("Error registering device:", err.response?.data || err.message);
    return false;
  }
};

const handleSubmit = async () => {
  if (!licenseKey.value) {
    console.error("License key is required");
    return;
  }
  isLoading.value = true;
  const deviceId = await generateDeviceId(); // Generate a new device ID
  const success = await registerDevice(deviceId, licenseKey.value);
  isLoading.value = false;
  if (success) {
    router.push("/success"); // Navigate to success page
  }
};

// Fetch device model on component mount
onMounted(() => {
  fetchDeviceModel();
});
</script>

<style lang="scss" scoped></style>
