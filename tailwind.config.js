/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    keyframes: {
      cardSkeleton: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(100%)" },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },

    backgroundImage: {
      gradiant: "background-image:linear-gradient(90deg, #FFEE58 ,#FF8F00);",
    },
   
    extend: {
      colors: {
        'gray-900': "#212121",
        'gray-100': "#F5F5F5",
        'yellow-600': "#FDD835",
      },
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
        lorem: ["lorem", "sans-serif"],
      },
    },
  },
  plugins: [],
};
