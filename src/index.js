const CustomCursor = require('custom-cursor.js').default 
const customCursor = new CustomCursor('.cursor', {
   hideTrueCursor: true,
   focusElements: [{
      selector: '.photo-link',
      focusClass: 'cursor--focused-view'
   }, 'a']
}).setPosition(-30, -30).initialize()
