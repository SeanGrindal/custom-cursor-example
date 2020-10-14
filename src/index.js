const CustomCursor = require('custom-cursor.js').default 
new CustomCursor('.cursor', {
   hideTrueCursor: true,
   focusElements: [{
      selector: '.photo-link',
      focusClass: 'cursor--focused-view'
   }, 'a']
}).initialize()
