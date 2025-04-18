import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ph.tesda.offlinebsrs',
  appName: 'Offline BSRS',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      androidDatabaseLocation: 'default'
    }
  }
};

export default config;
