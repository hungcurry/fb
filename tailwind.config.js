module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,vue}"],
  // 白名單
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl',
  ],
  darkMode: 'class', // 'media自動' or 'class手動'
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          // sm: '1.5rem',
          // lg: '2rem',
        },
      },
      spacing: {
        'main-span': '72px'
      },
      colors: {
        'fb-bg': '#18191a',
        'fb-header': '#242526',
        'fb-input': '#3a3b3c',
        'fb-popover': '#3e4042',
        'fb-active': '#323436',
        'fb-card': '#242526',
        'fb': '#2e89ff'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
