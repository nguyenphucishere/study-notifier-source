module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.html',
    './src/js/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
       'spin-slow': 'spin 1s linear infinite',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
