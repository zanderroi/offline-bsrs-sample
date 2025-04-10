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
import { heart, calendar, musicalNote, settingsOutline } from 'ionicons/icons';
</script>

<style scoped>
/* Ensure the footer stays at the bottom */
ion-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
</style>
