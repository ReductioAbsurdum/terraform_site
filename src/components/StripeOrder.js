import React from 'react';
import axios from 'axios';
import {stripe_pk_test} from '../../config';

const sendToServer = info =>{
  return axios.post("/charge", info).then(resp=>resp.data);
}

class StripeOrder extends React.Component{
  constructor(props){
    super(props);
    this.empty = [];
    this.stripe = Stripe(stripe_pk_test);
    this.card = this.stripe.elements().create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '30px',
          fontWeight: 300,
          fontFamily: 'Helvetica Neue',
          fontSize: '15px',
          '::placeholder': {
            color: '#aeb7c1',
          },
        },
      }
    })
  };
  componentDidMount(){
    this.card.mount(document.getElementById('card_element'));
  };
  hasOptions(){
    if(this.props.options.length > 0){
      return (
        <select className="field" ref="options">
          <option value="">Select Options for Item</option>
          {
            this.props.options.map((option, index)=>
              <option key={index} value={option}>{option}</option>
            )
          }
        </select>
      )
    }else{
      return (
        <select className="field" ref="options">
          <option value="">No Additional Options for this item</option>;
        </select>
      )
    }
  }
  verify(){
    if(this.props.options.length > 0 && !this.refs.options.value){
      this.empty.push("Options");
    }
    if(!this.refs.email.value){
      this.empty.push("Email");
    }
    if(!this.refs.name.value){
      this.empty.push("Full Name");
    }
    if(!this.refs.address.value){
      this.empty.push("Address");
    }
    if(!this.refs.city.value){
      this.empty.push("City");
    }
    if(!this.refs.state.value){
      this.empty.push("State");
    }
    if(!this.refs.zip_code.value){
      this.empty.push("Postal Code");
    }
  };
  submit(e){
    e.preventDefault();
    var DOMerror = this.refs.error;
    DOMerror.textContent = "";
    this.verify();
    if(this.empty.length > 0){
      DOMerror.textContent = `Please fill out the following sections: ${this.empty.join(", ")} ... Thank You!`
      this.empty = [];
      return;
    }

    var metadata = {
      name: this.refs.name.value,
      address_city: this.refs.city.value,
      address_line1: this.refs.address.value,
      address_state: this.refs.state.value,
      address_zip: this.refs.zip_code.value,
      email: this.refs.email.value
    }

    var _this = this;
    this.stripe.createToken(this.card, metadata).then(function(result){
      if(result.error){
        DOMerror.textContent = result.error.message;
      }else{
        result.price = _this.props.price;
        console.log(result);
        console.log("Time to send to server to complete charge!");
        //send result in ajax post request to /charge (on the server we create the charge that sends to stripe)
        sendToServer(result).then(resp=>{
          if(resp.message){
            DOMerror.textContent = resp.message;
          }else{
            _this.props.changeSection();
          }
        });
      }
    });

  };
  render(){
    return (
      <div className="orderform_wrapper">
      <form>
        <div className="group">
          <label htmlFor="state">
            <span>Options</span>
            {this.hasOptions()}
          </label>
        </div>

        <div className="group">
          <label>
            <span>Email</span>
            <input className="field" type="email" ref="email" placeholder="your@email.com"/>
          </label>
        </div>

          <div className="group">
          <label>
            <span>Full Name</span>
            <input className="field" type="text" ref="name" placeholder="Jane Doe"/>
          </label>


          <label>
            <span>Address</span>
            <input className="field" type="text" ref="address" placeholder="Street Name"/>
          </label>

          <label>
            <span>City</span>
            <input className="field" type="text" ref="city" placeholder="City Name"/>
          </label>

          <label htmlFor="state">
            <span>State</span>
            <select className="field" ref="state">
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
            </label>

          <label>
            <span>Postal Code</span>
            <input className="field" type="text" ref="zip_code" placeholder="5 digit zip"/>
          </label>
          </div>

        <div className="group">
          <label>
            <span>Card Info</span>
            <div className="field" id="card_element"></div>
          </label>

        </div>
        <div className="error" ref="error"></div>
      <hr/>
      <button type="submit" onClick={this.submit.bind(this)}>Submit Purchase</button>
      </form>
      </div>
    )
  };
};

StripeOrder.propTypes = {
  options: React.PropTypes.array,
  changeSection: React.PropTypes.func.isRequired,
  price: React.PropTypes.number.isRequired
}

export default StripeOrder;
