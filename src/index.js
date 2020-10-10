const CustomCursor = require('custom-cursor.js').default 
new CustomCursor('.cursor', {
   focusElements: [{
      selector: '.photo-link',
      focusClass: 'cursor--focused-view'
   }, 'a']
}).initialize()
