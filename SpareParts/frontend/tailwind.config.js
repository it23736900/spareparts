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
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(16, 185, 129, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.6)" },
        },
        "gradient-x": {
          "0%, 100%": { transform: "translateX(-50%)" },
          "50%": { transform: "translateX(50%)" },
        },
        "gradient-y": {
          "0%, 100%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
        },
        "gradient-diagonal": {
          "0%, 100%": { transform: "translateX(-50%) translateY(-50%)" },
          "50%": { transform: "translateX(50%) translateY(50%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
              animation: {
          scrollInline: "scrollInline 60s linear infinite",
          scrollReverse: "scrollReverse 60s linear infinite",
          slideDown: "slideDown 0.3s ease-out",
          glow: "glow 2s ease-in-out infinite",
          "gradient-x": "gradient-x 8s ease-in-out infinite",
          "gradient-y": "gradient-y 6s ease-in-out infinite",
          "gradient-diagonal": "gradient-diagonal 10s ease-in-out infinite",
          shimmer: "shimmer 3s ease-in-out infinite",
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
