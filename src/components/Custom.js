import React from 'react';
import axios from 'axios';

class Custom extends React.Component{
  componentWillReceiveProps(){
    this.setState({
      submitted : false,
      on: false
    })
  }
  componentWillMount(){
    this.setState({
      submitted : false,
      on: false
    })
  }
  checkChange(){
    this.setState({
      on: true
    })
  }
  infoSubmit(e){
    e.preventDefault();

    if(this.refs.name.value &&
       this.refs.email.value && this.refs.message.value){

         var details = {
           name: this.refs.name.value,
           company: this.refs.company.value,
           email: this.refs.email.value,
           phone: this.refs.phone.value,
           message: this.refs.message.value,
           contact: (this.state.on) ? 'contact phone' : 'contact email'
         }

         axios.post("/reqinfo", details).then((resp)=>{
           console.log(resp.data);
         })

         this.setState({
           submitted: true
         });

       }else{
         this.refs.error.textContent = "😮 Please fill out all form fields before submitting, thank you"
       }
  }
  shouldRender(){
    if(!this.state.submitted){
      return (
        <div>
          <div className="custom_info">
            <form>
              <div className="custom_info_sub_name">
                <label htmlFor="name">Name</label>
                <input className="custom_info_field" ref="name"/>
              </div>
              <div className="custom_info_sub_name">
                <label htmlFor="company">Company (if applicable)</label>
                <input className="custom_info_field" ref="company"/>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input className="custom_info_field" ref="email"/>
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <input className="custom_info_field" ref="phone"/>
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea ref="message" name="message"></textarea>
              </div>
              <div>
                <label htmlFor="preference">Phone/Email Preference*</label>
                <div className="checkbox_caption">How should we reach out to you?</div>
                <label className="checkbox_label">
                  <input className="checkbox_input" type="checkbox" checked={this.state.on} onChange={this.checkChange.bind(this)}/>
                  Phone
                  </label>
                <label className="checkbox_label">
                  <input className="checkbox_input" type="checkbox"/>
                  Email
                </label>
              </div>
              <div className="error" ref="error"></div>
              <button onClick={this.infoSubmit.bind(this)}>Send</button>
            </form>
          </div>
        </div>
      )
    }else{
      return (
        <div className="custom_thankyou">
          <h1>Thank You!</h1>
          <h3>We&#39;ll be in touch soon!</h3>
        </div>
      )
    }
  }
  render(){
    return (
      <div className="custom_wrapper">
        <div className="img_div">
        <img className="custom_img" src={this.props.img} />
        </div>
        <div className="custom_info_header">
          <h2>CUSTOMIZATION IS THE CORNERSTONE OF WHAT WE DO!</h2>
          <p>Do you have a need for more modern & contemporary art within your workplace, home, or small business? Terraform Design makes a name by our eagerness to work with companies - both small and large - to help make the everyday landscapes of your life the BEST they can be. We LOVE collaboration, and want to work with you to make something new, beautiful, and one-of-a-kind. Fill out the information form below, and we will get in contact with you by the means you specify.</p>
        </div>
        {this.shouldRender()}
        <div className="custom_footer">
          <div className="custom_footer_sub">
            <h1>Need Inspiration?</h1>
            <h3>Want something made, but not sure what to request? Checkout our <a href="https://www.pinterest.com/legono/the-latest-in-fabrication/" target="_blank">latest in fabrication</a> Pinterest board to see all of what&#39;s possible in the wide world of fabrication &amp; design!</h3>
            <p>*Note: Not all designs and creations on this linked Pinterest board come from us - much comes from other brilliant designers out there in the exciting field of architecture & design</p>
          </div>
          <div className="custom_footer_sub">
            <a href="https://www.pinterest.com/legono/the-latest-in-fabrication/" target="_blank"><img src="images/pinterest.png" /></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Custom;
