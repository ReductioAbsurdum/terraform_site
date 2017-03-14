import React from 'react';
import Info from './Info';
import StripeOrder from './StripeOrder';

class Stripe extends React.Component{
  constructor(props){
    super(props);
    this.state = {orderSection: 0};
  }
  changeSection(num){
    this.setState({
      orderSection: num
    });
  }
  isSelected(num){
    return (this.state.orderSection === num ? ' selected' : '');
  }
  orderSection(){
    if(this.state.orderSection === 0){
      return <Info changeSection={this.changeSection.bind(this, 1)}/>
    }else if(this.state.orderSection === 1){
      return <StripeOrder changeSection={this.changeSection.bind(this, 2)}/>
    }else if(this.state.orderSection === 2){
      return (
        <div className="finish">
          <h3>Thank You For Your Purchase</h3>
          <p>If you have any questions or concerns with your purchase feel free to get in contact with us. Note: you can find all of our contact information by pressing the bottom right button "Contact"</p>
          <button type="button" name="button" onClick={this.changeSection.bind(this, 0)}>Back to Item Info</button>
        </div>
      )
    }
  }
  render(){
    return (
      <div>
        <div className="steps_wrapper">
          <div className="line"></div>
          <div className={"step_wrapper" + this.isSelected(0)}>
            <div className="step">1</div>
            <span>Item Info</span>
          </div>
          <div className={"step_wrapper" + this.isSelected(1)}>
            <div className="step">2</div>
            <span>Order Form</span>
          </div>
          <div className={"step_wrapper" + this.isSelected(2)}>
            <div className="step">3</div>
            <span>Thank You</span>
          </div>
        </div>
        <h1>The Terraform Spore Lamp</h1>
        <div className="form_description_wrapper">
          {this.orderSection()}
        </div>
      </div>
    )
  }
}

export default Stripe;
