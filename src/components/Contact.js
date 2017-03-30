import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Contact extends React.Component{
  componentWillMount(){
    this.setState({
      sent : false
    });
  }
  submitForm(e){
    e.preventDefault();
    this.refs.error.textContent = "";
    if(this.refs.contact_name.value && this.refs.contact_email.value &&
       this.refs.contact_subject.value && this.refs.contact_message.value){
      var details = {
        name: this.refs.contact_name.value,
        email : this.refs.contact_email.value,
        subject : this.refs.contact_subject.value,
        message : this.refs.contact_message.value,
        from : "contact_page"
      };

      axios.post("/reqinfo", details).then(resp=>{
        console.log(resp);
      });

      this.setState({
        sent : true
      });
    }else{
      this.refs.error.textContent = "😮 Please fill out all form fields before you submit";
    }
  }
  whichRender(sent){
    if(sent){
      return (
        <div>
          <h1>Thank You!</h1>
          <h4>We will be in touch with you soon!</h4>
        </div>
      )
    }else{
      return (
          <form>
              <input className="contact_field" type="text" ref="contact_name" placeholder="Full Name"/>
              <input className="contact_field" type="text" ref="contact_email" placeholder="Email"/>
              <input className="contact_field" type="text" ref="contact_subject" placeholder="Subject"/>
            <hr/>
            <textarea ref="contact_message" placeholder="We're excited to hear from you!"></textarea>
            <hr/>
            <div className="error" ref="error"></div>
            <button onClick={this.submitForm.bind(this)}>Submit</button>
          </form>
      )
    }
  }
  render(){
    return (
      <div className="contact_form">
      {this.whichRender(this.state.sent)}
      </div>
    )
  }
}

export default Contact;
