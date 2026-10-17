import { buildLegacyTheme } from "sanity";

const NAVY = "#101820";
const BLUE = "#2877D4";
const PAPER = "#F5F1E8";

/** Premium SkyFactor studio theme: deep navy, paper whites and a single blue accent. */
export const skyfactorTheme = buildLegacyTheme({
  "--black": NAVY,
  "--white": "#FFFFFF",
  "--gray": "#6B7480",
  "--gray-base": "#6B7480",

  "--component-bg": "#0B1118",
  "--component-text-color": PAPER,

  "--brand-primary": BLUE,

  "--default-button-color": "#8A94A0",
  "--default-button-primary-color": BLUE,
  "--default-button-success-color": "#2FA37A",
  "--default-button-warning-color": "#D9A441",
  "--default-button-danger-color": "#D95C5C",

  "--state-info-color": BLUE,
  "--state-success-color": "#2FA37A",
  "--state-warning-color": "#D9A441",
  "--state-danger-color": "#D95C5C",

  "--main-navigation-color": NAVY,
  "--main-navigation-color--inverted": PAPER,

  "--focus-color": "#60A5FA",

  "--font-family-base":
    "var(--font-manrope), Manrope, system-ui, -apple-system, sans-serif",
  "--font-family-monospace": "ui-monospace, SFMono-Regular, Menlo, monospace",
});
