import React, { Component } from 'react'
import AppStore from '../../Flux/Store/AppStore'
// import StepsForm from './form'
import ReactMarkdown from 'react-markdown'
import GeneralHeader from '../../components/header/Header'
// import FormTwo from './form2'
import './_contact.scss'

export default class Contact extends Component {
  constructor() {
    super()

    this.state = {}
  }
  componentDidMount() {
    // const theForm = document.getElementById('theForm')
    // new StepsForm(theForm, {
    //   onSubmit: form => {
    //     theForm.querySelector('.simform-inner').classList.add('hide')
    //     let messageEl = theForm.querySelector('.final-message')
    //     messageEl.innerHTML = "Thank you! We'll be in touch."
    //     messageEl.classList.add('show')
    //   }
    // })
  }
  render() {
		
		const { Contact } = AppStore.data.pages
    return (
      <div className="Contact">
        <GeneralHeader />
        <div className="contact_inner">
					<ReactMarkdown className="contact_listings" source={Contact.mainContent} />
        </div>	
      </div>
    )
  }
}

const FirstForm = () => (
	<form id="theForm" className="simform" autocomplete="off">
            <div className="simform-inner">
              <ol className="questions">
                <li>
                  <span>
                    <label for="q1">What's your name?</label>
                  </span>
                  <input id="q1" name="q1" type="text" />
                </li>
                <li>
                  <span>
                    <label for="q2">Where do you live?</label>
                  </span>
                  <input id="q2" name="q2" type="text" />
                </li>
                <li>
                  <span>
                    <label for="q3">What's your email address?</label>
                  </span>
                  <input id="q3" name="q3" type="text" />
                </li>
                <li>
                  <span>
                    <label for="q4">What's your phone number?</label>
                  </span>
                  <input id="q4" name="q4" type="text" />
                </li>
                <li>
                  <span>
                    <label for="q5">Best time of day to reach you?</label>
                  </span>
                  <input id="q5" name="q5" type="text" />
                </li>
                <li>
                  <span>
                    <label for="q6">What's the name of your company?</label>
                  </span>
                  <input id="q6" name="q6" type="text" />
                </li>
              </ol>
              <button className="submit" type="submit">
                Send answers
              </button>
              <div className="controls">
                <button className="next" />
                <div className="progress" />
                <span className="number">
                  <span className="number-current" />
                  <span className="number-total" />
                </span>
                <span className="error-message" />
              </div>
            </div>
            <span className="final-message" />
          </form>
)

/*
  Contact Page Copy per city
*/
