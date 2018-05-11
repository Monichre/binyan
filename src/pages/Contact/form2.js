import React, { Component } from 'react'
import './_contact2.scss'

export default class FormTwo extends Component {
  render() {
    return (
      <form id="form2">
        <p>Dear Binyan,</p>
        <p>
          My
          <label for="your-name"> name</label> is
          <input
            type="text"
            name="your-name"
            id="your-name"
            minlength="3"
            placeholder="(your name here)"
            required
          />{' '}
          and
        </p>

        <p>
          my
          <label for="email"> email address</label> is
          <input type="email" name="your-email" id="email" placeholder="(your email address)" required />
        </p>

        <p>
          {' '}
          I have a
          <label for="your-message"> message</label> for you,
        </p>

        <p>
          <textarea
            name="your-message"
            id="your-message"
            placeholder="(your msg here)"
            className="expanding"
            required
          />
        </p>
        <p>
          <button type="submit">
            <svg
              version="1.1"
              className="send-icn"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100px"
              height="36px"
              viewBox="0 0 100 36"
              enable-background="new 0 0 100 36"
              xmlSpace="preserve">
              <path d="M100,0L100,0 M23.8,7.1L100,0L40.9,36l-4.7-7.5L22,34.8l-4-11L0,30.5L16.4,8.7l5.4,15L23,7L23.8,7.1z M16.8,20.4l-1.5-4.3l-5.1,6.7L16.8,20.4z M34.4,25.4l-8.1-13.1L25,29.6L34.4,25.4z M35.2,13.2l8.1,13.1L70,9.9L35.2,13.2z" />
            </svg>
            <small>send</small>
          </button>
        </p>
      </form>
    )
  }
}



// // Auto resize input
// function resizeInput() {
//     $(this).attr('size', $(this).val().length);
// }

// $('input[type="text"], input[type="email"]')
//     // event handler
//     .keyup(resizeInput)
//     // resize on page load
//     .each(resizeInput);


// console.clear();
// // Adapted from georgepapadakis.me/demo/expanding-textarea.html
// (function(){
  
//   var textareas = document.querySelectorAll('.expanding'),
      
//       resize = function(t) {
//         t.style.height = 'auto';
//         t.style.overflow = 'hidden'; // Ensure scrollbar doesn't interfere with the true height of the text.
//         t.style.height = (t.scrollHeight + t.offset ) + 'px';
//         t.style.overflow = '';
//       },
      
//       attachResize = function(t) {
//         if ( t ) {
//           console.log('t.className',t.className);
//           t.offset = !window.opera ? (t.offsetHeight - t.clientHeight) : (t.offsetHeight + parseInt(window.getComputedStyle(t, null).getPropertyValue('border-top-width')));

//           resize(t);

//           if ( t.addEventListener ) {
//             t.addEventListener('input', function() { resize(t); });
//             t.addEventListener('mouseup', function() { resize(t); }); // set height after user resize
//           }

//           t['attachEvent'] && t.attachEvent('onkeyup', function() { resize(t); });
//         }
//       };
  
//   // IE7 support
//   if ( !document.querySelectorAll ) {
  
//     function getElementsByClass(searchClass,node,tag) {
//       var classElements = new Array();
//       node = node || document;
//       tag = tag || '*';
//       var els = node.getElementsByTagName(tag);
//       var elsLen = els.length;
//       var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
//       for (i = 0, j = 0; i < elsLen; i++) {
//         if ( pattern.test(els[i].className) ) {
//           classElements[j] = els[i];
//           j++;
//         }
//       }
//       return classElements;
//     }
    
//     textareas = getElementsByClass('expanding');
//   }
  
//   for (var i = 0; i < textareas.length; i++ ) {
//     attachResize(textareas[i]);
//   }
  
// })();
