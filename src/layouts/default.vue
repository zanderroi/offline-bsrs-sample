<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <!-- IonRouterOutlet must be inside IonTabs -->
        <ion-router-outlet></ion-router-outlet>

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/">
            <ion-icon :icon="heart" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="settings" href="/settings">
            <ion-icon :icon="settingsOutline" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>
          <ion-tab-button @click="logout">
            <ion-icon :icon="logOutOutline" />
            <ion-label>Logout</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
import { heart, settingsOutline, logOutOutline } from 'ionicons/icons';
import { useRouter } from "vue-router";
import axios from "axios";
import api from "@/axios";

const router = useRouter(); 


const logout = async () => {
  try {
    await api.get("/auth/logout")
    localStorage.removeItem("token")
    router.push("/login")
  } catch (err) {
    console.error("Logout error:", err)
  }
}
</script>