/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#021024",
                secondary: "#052659",
                accent: "#5483B3",
                muted: "#7DA0CA",
                light: "#C1E8FF",
            },
        },
    },
    plugins: [],
};
