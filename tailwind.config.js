/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          600: '#4f46e5',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[700]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-links': theme('colors.indigo[600]'),
            '--tw-prose-bold': theme('colors.gray[900]'),
            '--tw-prose-quotes': theme('colors.gray[700]'),
            '--tw-prose-quote-borders': theme('colors.indigo[300]'),
            '--tw-prose-code': theme('colors.indigo[700]'),
            '--tw-prose-pre-bg': theme('colors.gray[50]'),
            '--tw-prose-pre-code': theme('colors.gray[800]'),
            maxWidth: 'none',
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: theme('colors.indigo[300]'),
              '&:hover': {
                textDecorationColor: theme('colors.indigo[600]'),
              },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: theme('colors.gray[100]'),
              borderRadius: '0.25rem',
              paddingLeft: '0.3em',
              paddingRight: '0.3em',
              paddingTop: '0.1em',
              paddingBottom: '0.1em',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            pre: {
              border: `1px solid ${theme('colors.gray[200]')}`,
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            blockquote: {
              borderLeftColor: theme('colors.indigo[400]'),
              fontStyle: 'normal',
              color: theme('colors.gray[700]'),
            },
            'h2, h3': {
              scrollMarginTop: '5rem',
            },
            table: {
              display: 'block',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
