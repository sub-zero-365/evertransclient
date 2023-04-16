/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                "poppins": ['Poppins', 'sans-serif'],
                "manrope": ['Manrope', 'sans-serif'],
                "montserrat": ['Montserrat', 'sans-serif'],

            },
            backgroundColor: {
                color_dark: "#181818",
                color_light: "#f8f8f8"

            }

        },
    },
    darkMode: "class",

    plugins: [],
}