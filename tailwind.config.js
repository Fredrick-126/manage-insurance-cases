import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.vue',
    './resources/js/**/*.js',
  ],

  theme: {
    screens: {
      xxs: '332px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    placeholderColor: {
      primary: 'var(--color-placeholder)',
    },
    extend: {
      boxShadow: {
        control: '0 4px 4px rgba(0, 0, 0, 0.05)',
      },
      colors: {
        body: 'var(--color-background)',
        primary: 'var(--color-primary)',
        disable: 'var(--color-disable)',
        card: 'var(--color-item-background)',
        main: 'var(--color-main)',
        sub: 'var(--color-sub)',
        control: 'var(--color-control)',
      },
      flex: {
        'form-item': '0 1 calc(50% - 13px)',
        'form-item-25': '0 1 calc(25% - 10px)',
        'form-item-30': '0 1 calc(33% - 13px)',
        'form-item-40': '0 1 calc(40% - 13px)',
        'form-item-full': '0 1 100%',
      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        button: '18px',
      },
      gap: {
        'form-group': '24px 26px',
      },
      height: {
        nav: '65px',
        header: '73px',
        button: '40px',
        progress: '10px',
        container: 'calc(100vh - var(--height-header) - 20px)',
      },
      listStyleType: {
        decimal: 'decimal',
      },
      maxWidth: {
        mobile: '300px',
        button: '200px',
      },
      minHeight: {
        input: '40px',
        button: '40px',
        container: 'calc(100vh - var(--height-header) - 50px)',
      },
      transitionDuration: {
        350: '350ms',
        400: '400ms',
      },
    },
  },

  plugins: [forms, typography],
}
