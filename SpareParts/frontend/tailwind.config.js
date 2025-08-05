module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Titillium Web"', 'sans-serif'],
      },

      
    },
  },
  
  variants: {
    extend: {
      transform: ['group-hover'], // ✅ ADD THIS
    },
  },
  plugins: [],
}
