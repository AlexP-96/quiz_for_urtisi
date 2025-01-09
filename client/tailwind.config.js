const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,tsx,ts}",
        flowbite.content(),
    ],
    plugins: [
        // ...
        flowbite.plugin(),
    ],
};