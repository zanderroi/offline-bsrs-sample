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
import { heart, settingsOutline, logOutOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import { api, capacitorHttpRequest } from "@/axios";
import { Preferences } from "@capacitor/preferences";
import { ref, onMounted } from "vue";
import { getDB } from "@/services/sqliteService";
const router = useRouter();
const user = ref(null);

// const loadUser = async () => {
//   try {
//     const db = await getDB();
//     const result = await db.query("SELECT * FROM users LIMIT 1");
//     if (result.values && result.values.length > 0) {
//       user.value = result.values[0];
//     }
//   } catch (error) {
//     console.error("Failed to load user:", error);
//   }
// };

// onMounted(() => {
//   loadUser();
// });

const logout = async () => {
  try {
    // Retrieve the token from Preferences
    const { value: token } = await Preferences.get({ key: "token" });

    if (!token) {
      console.error("No token found. Cannot log out.");
      return;
    }

    // Make the logout request using Capacitor HTTP
    await capacitorHttpRequest("GET", "/auth/logout", {}, {
      Authorization: `Bearer ${token}`, // Add the Authorization header
    });

    // Clear only the token from Preferences
    await Preferences.remove({ key: "token" });

    // Navigate to the login page
    router.push("/login");
  } catch (err) {
    console.error("Logout error:", err.message || "Unknown error");
  }
};
</script>
