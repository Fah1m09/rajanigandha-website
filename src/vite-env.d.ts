/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_LEAD_LABEL?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_SERVER_TRACKING?: string;
  readonly VITE_TRACKING_ENDPOINT?: string;
}
