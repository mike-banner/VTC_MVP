/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdb,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#6366f1',
                    secondary: '#4f46e5',
                    dark: '#0a0a0c',
                },
            },
        },
    },
    plugins: [require('@park-ui/tailwind-plugin')],
    parkUI: {
        accentColor: 'indigo',
        grayColor: 'slate',
    },
    darkMode: 'class',
}
