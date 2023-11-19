import { light, dark } from "@eva-design/eva";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const Themes = {
  light: {
    theme: light,
    title: "LIGHT",
    icon: "sun",
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    theme: dark,
    title: "DARK",
    icon: "moon",
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export default Themes;