module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  
  variants: {
    extend: {
      transform: ['group-hover'], // ✅ ADD THIS
    },
  },
  plugins: [],
}
