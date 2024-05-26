/** @type {import('tailwindcss').Config} */
import {
  red as _red,
  blue as _blue,
  yellow as _yellow,
  orange as _orange,
  green as _green,
  violet as _violet,
  emerald as _emerald,
  stone as _stone,
  sky as _sky,
  trueGray,
  blueGray,
  rose as _rose,
  lime as _lime,
} from "tailwindcss/colors";

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  colors: {
    /* Agregar colores
      Escribir el color en hexadecimal, ej: #444
      Seleccionar el hexadecimal y lueco presionar ctrl+k y ctrl+g
      Genra la paleta de colores como la que se encuentra a continuación.
      Para usarlo, unicamente indicamnos el nombre del color y nos autocompletrá, ej: text-black
    */
    gray: {
      100: "#efefef",
      200: "#dfdfdf",
      300: "#cfcfcf",
      400: "#bfbfbf",
      500: "#afafaf",
      600: "#8c8c8c",
      700: "#696969",
      800: "#464646",
      900: "#232323",
    },
    black: {
      100: "#dadada",
      200: "#b4b4b4",
      300: "#8f8f8f",
      400: "#696969",
      500: "#444444",
      600: "#363636",
      700: "#292929",
      800: "#1b1b1b",
      900: "#0e0e0e",
    },
    indigo: {
      100: "#d1dceb",
      200: "#a3bad8",
      300: "#7497c4",
      400: "#4675b1",
      500: "#18529d",
      600: "#13427e",
      700: "#0e315e",
      800: "#0a213f",
      900: "#05101f",
    },
    white: {
      100: "#fefefe",
      200: "#fdfdfd",
      300: "#fcfcfc",
      400: "#fbfbfb",
      500: "#fafafa",
      600: "#c8c8c8",
      700: "#969696",
      800: "#646464",
      900: "#323232",
    },
    transparent: "transparent",
    current: "currentColor",
    red: _red,
    blue: _blue,
    yellow: _yellow,
    orange: _orange,
    green: _green,
    violet: _violet,
    emerald: _emerald,
    stone: _stone,
    sky: _sky,
    neutral: trueGray,
    slate: blueGray,
    lime: _lime,
    rose: _rose,
    "uv-blue": "#18529D",
    "uv-green": "#28AD56",
    "uv-text-black": "#3f3f3f",
    "uv-light-green": "e3fada",
    error: "#b91c1c",
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  extend: {
    height: {
      57: "57%",
      18: "4.25rem",
    },
    backgroundImage: {
      "uv-background": "url('/src/assets/uv/fondoMascara.svg')",
    },
  },
};
export const plugins = [];
