import React from 'react';

class Info extends React.Component{
  formatPrice(){
    var p = this.props.price;
    var pa = p.toString().split('');
    if(pa.length === 6){
      pa.splice(1, 0, ",");
      pa.splice(5, 0, ".");
      return `$${pa.join('')}`;
    }else if(pa.length === 5){
      pa.splice(3, 0, ".");
      return `$${pa.join('')}`;
    }

  }
  render(){
    return (
      <div className="description">{
        this.props.description.map((desc, index)=>
          <p key={index}>{desc}</p>
        )
      }
        <p>Price: {this.formatPrice()}  **Free Shipping**</p>
        <hr />
        <button type="button" name="button" onClick={this.props.changeSection}>Order Now</button>
    </div>
    )
  }
}

Info.propTypes = {
  description: React.PropTypes.array.isRequired,
  price: React.PropTypes.number.isRequired,
  changeSection: React.PropTypes.func.isRequired
}

export default Info;
