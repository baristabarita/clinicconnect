/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat','sans-serif'],
        'roboto' : ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        'custom': '4px 4px 1px rgba(0, 0, 0, 0.4)'
      },
      keyframes: {
        'slide-down': {
          '0%': {
            transform: 'translateY(-30%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'zoom-in': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.1)',
          },    
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },     
        },
        'zoom-in-end': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1.1)',
          },     
        },
        'swipe-down':{
          '0%':{
            transform: 'translateY(0)',
          },
          '50%':{
            transform: 'translateY(-10px)',
          },
          '100%':{
            transform: 'translateY(0)',
          }
        },
        'small-fade-in-down': {
          '0%': {
              opacity: '1',
              transform: 'translateY(-10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0px)'
          },
      },
      'slide-right': {
        '0%': {
          transform: 'translateX(100%)',
        },
        '100%': {
          transform: 'translateX(0)',
        },
      },
      'slide-left': {
        '0%': {
          transform: 'translateX(-100%)',
        },
        '100%': {
          transform: 'translateX(0)',
        },
      },
      'slide-up': {
        '0%': {
          transform: 'translateY(100%)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      },
      'fade-in': {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      'fade-out': {
        '0%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        },
      },
      'shake': {
        '0%, 100%': {
          transform: 'translateX(0)',
        },
        '10%, 30%, 50%, 70%, 90%': {
          transform: 'translateX(-10px)',
        },
        '20%, 40%, 60%, 80%': {
          transform: 'translateX(10px)',
        },
      },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
        'zoom-in': 'zoom-in 0.6s ease-out',
        'zoom-in-end': 'zoom-in-end 0.8s ease-out',
        'swipe-down': 'swipe-down 1.5s ease-in-out infinite',
        'small-fade-in-down': 'small-fade-in-down 0.5s ease-out',
        'slide-right': 'slide-right 1s ease-out',
        'slide-left': 'slide-left 1s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out',
        'shake': 'shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
      },
    },
  },
  plugins: [],
}

