/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                "poppins": ['Poppins', 'sans-serif'],
                "manrope": ['Manrope', 'sans-serif'],
                "montserrat": ['Montserrat', 'sans-serif'],

            }

        },
    },
    plugins: [],
}