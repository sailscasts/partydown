module.exports = {
  content: ['./views/**/*.ejs', './assets/js/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
