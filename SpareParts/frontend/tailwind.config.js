module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Titillium Web"', 'sans-serif'],
      },
      keyframes: {
        scrollInline: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.33%)" },
        },
        scrollReverse: {
          "0%": { transform: "translateX(-33.33%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        scrollInline: "scrollInline 60s linear infinite",
        scrollReverse: "scrollReverse 60s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      transform: ['group-hover'],
      animation: ['group-hover'],
    },
  },
  plugins: [],
};
