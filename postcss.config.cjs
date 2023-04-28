module.exports = {
  plugins: {
    // "postcss-lab-function": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      browsers: "last 2 versions",
      features: { "nesting-rules": false },
    }
  },
};