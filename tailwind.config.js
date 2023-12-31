/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors")
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                "poppins": ['Poppins', 'sans-serif'],
                "manrope": ['Manrope', 'sans-serif'],
                "montserrat": ['Montserrat', 'sans-serif'],
                "bricolage": ["Bricolage Grotesque", 'sans-serif'],
                'body': [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'system-ui',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'Noto Sans',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji'
                ],
                'sans': [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'system-ui',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'Noto Sans',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji'
                ]

            },
            backgroundColor: {
                color_dark: "#181818",
                color_light: "#edeeeb"

            },
            colors: {
                primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" }
                ,
                onGold: "var(--color-primary-50)",
                color_gold: "#FFD700"
            },


        },
    },
    darkMode: "class",

    plugins: [
        createThemes({
            gold: {
                primary: "var(---color-primary)"
            }
        })
    ],
}