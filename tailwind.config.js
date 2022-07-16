module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ["./src/**/*.{html,js}"],
  corePlugins: {
    preflight: false,
  },
	important: '#root',
  theme: {
    extend: {},
  },
  variants: {},
  plugins: []
}