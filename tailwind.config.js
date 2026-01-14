/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
        colors:{
          primary_green:"#0E5907",   
          secondary_green:"#265828",   
          tertiary_green:"#ABC5A9", 
          quaternary_green:"#F0F5F0", 
          primary_orange:"#F29000", 
          secondary_orange:"#FDF3E3", 
          primary_gray:"#9CA2A9",
          secondary_gray:"#00000029",
          tertiary_gray:"#DFDFDF",

          primary_red:"#D0101F",
          secondary_red:"#E63F50",
          tertiary_red:"#FFE2E3",

        }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

