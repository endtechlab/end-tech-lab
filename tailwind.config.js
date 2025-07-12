module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
        "./types/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
      ],
  };
  