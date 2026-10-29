import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: [
      "#2f162f",
      "#2f162f",
      "#2f162f",
      "#2f162f",
      "#2f162f",
      "#2f162f",
      "#2f162f",
      "#2f162f",
      "#2f162f",
      "#2f162f",
    ],
    secondary: [
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
      "#1F0F1F",
    ],
    surface: [
      "#d4af371a",
      "#d4af3733",
      "#d4af374d",
      "#d4af3766",
      "#d8b04f",
      "#d4af37",
      "#bc982a",
      "#a78622",
      "#9b7d1b",
      "#7b6210",
    ],

    textMain: [
      "#ffffff",
      "#fefaf4",
      "#fdf6eb",
      "#fcf1e0",
      "#fbebd3",
      "#fae5c7",
      "#f9e0bb",
      "#f8daae",
      "#f6d4a2",
      "#f5ce95",
    ],
    toastError: [
      "#fdf2f2",
      "#fae1e1",
      "#f5c5c5",
      "#eea1a1",
      "#e37272",
      "#c73e3e",
      "#a82828",
      "#881e1e",
      "#6b1717",
      "#4d0e0e",
    ],

    // پالت موفقیت زیتونی/زمردی لوکس (هارمونی با طلایی)
    toastSuccess: [
      "#f2f8f4",
      "#e1efe6",
      "#c5e0cf",
      "#a1cdb2",
      "#74b38d",
      "#4d976c",
      "#3b7a55",
      "#2e6143",
      "#234c34",
      "#173423",
    ],

    // پالت هشدار طلایی/کهربایی پخته
    toastWarning: [
      "#fdf9ed",
      "#fbf0d3",
      "#f7e1a6",
      "#f2cd72",
      "#ecb844",
      "#d49a24",
      "#b07b19",
      "#8d5f13",
      "#6f4910",
      "#4f330a",
    ],

    // پالت اطلاعیه سورمه‌ای/فیروزه‌ای پخته
    toastInfo: [
      "#f0f6fa",
      "#ddecfa",
      "#b8daf5",
      "#8dc1ee",
      "#65a6e6",
      "#4789cd",
      "#346ca8",
      "#295484",
      "#204268",
      "#172f4b",
    ],
  },
  primaryColor: "primary",
  fontFamily: "'IRANSansWeb', sans-serif",
  components: {
    Notification: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          backgroundColor: "rgba(31, 15, 31, 0.92)", // همان secondary با شفافیت شیشه‌ای
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212, 175, 55, 0.2)", // کادر طلایی محو
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        },
        title: {
          color: "#fefaf4",
          fontWeight: 600,
          fontSize: "0.9rem",
        },
        description: {
          color: "rgba(254, 250, 244, 0.75)",
          fontSize: "0.82rem",
          lineHeight: 1.5,
        },
        closeButton: {
          color: "#d4af37",
          "&:hover": {
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            color: "#d4af37",
          },
        },
      },
    },
  },
});
