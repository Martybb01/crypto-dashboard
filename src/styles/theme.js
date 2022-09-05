import { createTheme } from "react-data-table-component";

createTheme("violet", {
  text: {
    primary: "#f5e4ff",
    secondary: "#f5e4ff",
  },
  background: {
    default: "#4901ff5d",
  },

  button: {
    default: "#f5e4ff",
    hover: "rgba(0,0,0,.08)",
    focus: "rgba(255,255,255,.12)",
    disabled: "rgba(255, 255, 255, .34)",
  },
});

export default createTheme;
