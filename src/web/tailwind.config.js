module.exports = {
  content: ['./client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'l-blue': '#95B9E5',
        'm-blue': '#3b76b7',
        'd-blue': '#324a78',
        test: '#468DDA',
      },
    },
  },
  plugins: [require('daisyui')],
};
