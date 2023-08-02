module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"], // Add paths to your HTML and React files
  theme: {
    extend: {
      screens: {
        tall: "(min-width: 500px) and (max-width: 999px)", // Add this line
        // => @media (min-height: 800px) { ... }
        md: "1000px",
      },
    },
  },
  plugins: [],
};
