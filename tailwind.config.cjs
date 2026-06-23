/** @type {import('tailwindcss').Config} */
// Scans the app source (and template) for class names. All class tokens appear
// as string literals in src/app.js, so JIT picks them up. The inline <style> in
// the template overrides Tailwind's red-* with the brand colour via !important,
// so default Tailwind colours are intentionally kept here.
module.exports = {
  content: ['./src/app.js', './src/template.html'],
  theme: {
    extend: {},
  },
  plugins: [],
};
