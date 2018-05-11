/**
 * stepsForm.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 * ES6 Conversion by Liam Ellis
 */

const Modernizr = window.Modernizr

const transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd',
    transition: 'transitionend'
  }
const transEndEventName = transEndEventNames[Modernizr.prefixed('transition')]
const support = { transitions: Modernizr.csstransitions }

const extend = (a, b) => {
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key]
    }
  }
  return a
}

class StepsForm {
  constructor(el, options) {
    this.el = el
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init() // --> Not sure about this line
  }

  _init = () => {
    // current question
    this.current = 0

    // questions
    this.questions = [].slice.call(this.el.querySelectorAll('ol.questions > li'))
    // total questions
    this.questionsCount = this.questions.length
    // show first question
    this.questions[0].classList.add('current')
    // next question control
    this.ctrlNext = this.el.querySelector('button.next')
    // progress bar
    this.progress = this.el.querySelector('div.progress')
    // question number status
    this.questionStatus = this.el.querySelector('span.number')
    // current question placeholder
    this.currentNum = this.questionStatus.querySelector('span.number-current')
    this.currentNum.innerHTML = Number(this.current + 1)
    // total questions placeholder
    this.totalQuestionNum = this.questionStatus.querySelector('span.number-total')
    this.totalQuestionNum.innerHTML = this.questionsCount
    // error message
    this.error = this.el.querySelector('span.error-message')

    // init events
    this._initEvents()
  }

  _initEvents = () => {
    const self = this
    // first input
    const firstElInput = this.questions[this.current].querySelector('input')
    // focus
    let onFocusStartFn = () => {
      firstElInput.removeEventListener('focus', onFocusStartFn)
      self.ctrlNext.classList.add('show')
    }
    // show the next question control first time the input gets focused
    firstElInput.addEventListener('focus', onFocusStartFn)
    // show next question
    this.ctrlNext.addEventListener('click', ev => {
      ev.preventDefault()
      self._nextQuestion()
    })

    // pressing enter will jump to next question
    document.addEventListener('keydown', ev => {
      let keyCode = ev.keyCode || ev.which
      // enter
      if (keyCode === 13) {
        ev.preventDefault()
        self._nextQuestion()
      }
    })

    // disable tab
    this.el.addEventListener('keydown', ev => {
      let keyCode = ev.keyCode || ev.which
      // tab
      if (keyCode === 9) {
        ev.preventDefault()
      }
    })
  }

  _nextQuestion = () => {
    // if (!this._validate()) {
    //   return false
    // }

    // check if form is filled
    if (this.current === this.questionsCount - 1) {
      this.isFilled = true
    }
    this._clearError()

    let currentQuestion = this.questions[this.current]
    let nextQuestion

    this.current = this.current + 1
    this._progress()

    if (!this.isFilled) {
      this._updateQuestionNumber()
      this.el.classList.add('show-next')
      nextQuestion = this.questions[this.current]
      currentQuestion.classList.remove('current')
      nextQuestion.classList.add('current')
    }

    // after animation ends, remove class "show-next" from form element and change current question placeholder
    const self = this
    const onEndTransitionFn = ev => {
      console.log(this)
      if (support.transitions) {
        this.progress.removeEventListener(transEndEventName, onEndTransitionFn)
      }
      if (self.isFilled) {
        self._submit()
      } else {
        self.el.classList.add('show-next')
        self.currentNum.innerHTML = self.nextQuestionNum.innerHTML
        self.questionStatus.removeChild(self.nextQuestionNum)
        nextQuestion.querySelector('input').focus()
      }
    }

    if (support.transitions) {
      this.progress.addEventListener(transEndEventName, onEndTransitionFn)
    } else {
      onEndTransitionFn()
    }
  }

  // updates the progress bar by setting its width
  _progress = () => {
    this.progress.style.width = this.current * (100 / this.questionsCount) + '%'
  }

  // changes the current question number
  _updateQuestionNumber = () => {
    // first, create next question number placeholder
    this.nextQuestionNum = document.createElement('span')
    this.nextQuestionNum.className = 'number-next'
    this.nextQuestionNum.innerHTML = Number(this.current + 1)
    // insert it in the DOM
    this.questionStatus.appendChild(this.nextQuestionNum)
  }

  // submits the form
  _submit = () => {
    this.options.onSubmit(this.el)
  }

  _validate = () => {
    // current question´s input
    let input = this.questions[this.current].querySelector('input').value
    if (input === '') {
      this._showError('EMPTYSTR')
      return false
    }

    return true
  }

  // TODO (next version..)
  _showError = err => {
    let message = ''
    switch (err) {
      case 'EMPTYSTR':
        message = 'Please fill the field before continuing'
        break
      case 'INVALIDEMAIL':
        message = 'Please fill a valid email address'
        break
      // ...
    }
    this.error.innerHTML = message
    this.error.classList.add('show')
  }

  // TODO (next version..)
  _showError = err => {
    var message = ''
    switch (err) {
      case 'EMPTYSTR':
        message = 'Please fill the field before continuing'
        break
      case 'INVALIDEMAIL':
        message = 'Please fill a valid email address'
        break
    }
    this.error.innerHTML = message
    this.error.classList.add('show')
  }

  // clears/hides the current error message
  _clearError = () => {
    this.error.classList.remove('show')
  }
}

export default StepsForm

// function stepsForm( el, options ) {
// 	this.el = el;
// 	this.options = extend( {}, this.options );
// 		extend( this.options, options );
// 		this._init();
// }

// stepsForm.prototype.options = {
// 	onSubmit : function() { return false; }
// };
