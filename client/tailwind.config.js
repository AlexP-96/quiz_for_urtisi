import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/index.html",
        './src/**/*.{js,jsx,ts,tsx,html,scss}',
        "./node_modules/flowbite/**/*.js",
        flowbite.content()
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
};