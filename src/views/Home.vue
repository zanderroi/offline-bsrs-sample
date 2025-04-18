<template>
  <ion-page>
    <ion-grid class="p-4 mt-4">
      <ion-row class="mb-4">
        <!-- <ion-col>
          <p class="text-lg font-bold">Welcome, {{ name }}</p>
        </ion-col> -->
        <ion-col>
          <div
            class="w-16 h-16 border-2 bg-blue-700 rounded-lg flex flex-col items-center justify-center"
          >
            <ion-icon
              :icon="syncCircleSharp"
              size="large"
              color="light"
            ></ion-icon>
            <p class="text-xs text-white">Sync</p>
          </div>
        </ion-col>
        <ion-col>
          <div
            class="w-16 h-16 border-2 bg-blue-700 rounded-lg flex flex-col items-center justify-center"
          >
            <ion-icon
              :icon="syncCircleSharp"
              size="large"
              color="light"
            ></ion-icon>
            <p class="text-xs text-white">Sync</p>
          </div>
        </ion-col>
        <ion-col>
          <div
            class="w-16 h-16 border-2 bg-blue-700 rounded-lg flex flex-col items-center justify-center"
          >
            <ion-icon
              :icon="syncCircleSharp"
              size="large"
              color="light"
            ></ion-icon>
            <p class="text-xs text-white">Sync</p>
          </div>
        </ion-col>
      </ion-row>
      <ion-row class="mt-4"> asdasd </ion-row>
    </ion-grid>
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
  IonInputPasswordToggle,
} from "@ionic/vue";

import { syncCircleSharp } from "ionicons/icons";

// const name = ref("");
// onMounted(async () => {
//   const db = await getDB(); 
//   const res = await db.query("SELECT name FROM users LIMIT 1");
//   if (res.values.length) {
//     name.value = res.values[0].name;
//   }
// });

</script>

<style lang="scss" scoped></style>
