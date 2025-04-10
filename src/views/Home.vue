<template>
  <ion-page>
    <ion-grid class="p-4 mt-4">
      <ion-row class="mb-4">
        <ion-col>
          <div
            class="w-16 h-16 border-2 bg-blue-700 rounded-lg flex flex-col items-center justify-center"
          >
            <ion-icon :icon="syncCircleSharp" size="large" color="light"></ion-icon>
            <p class="text-xs text-white">Sync</p>
          </div>
        </ion-col>
        <ion-col>
          <div
            class="w-16 h-16 border-2 bg-blue-700 rounded-lg flex flex-col items-center justify-center"
          >
            <ion-icon :icon="syncCircleSharp" size="large" color="light"></ion-icon>
            <p class="text-xs text-white">Sync</p>
          </div>
        </ion-col>
        <ion-col>
          <div
            class="w-16 h-16 border-2 bg-blue-700 rounded-lg flex flex-col items-center justify-center"
          >
            <ion-icon :icon="syncCircleSharp" size="large" color="light"></ion-icon>
            <p class="text-xs text-white">Sync</p>
          </div>
        </ion-col>
      </ion-row>
      <ion-row class="mt-4">
        asdasd
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
  IonInputPasswordToggle,
} from "@ionic/vue";

import { syncCircleSharp } from "ionicons/icons";
</script>

<style lang="scss" scoped></style>
