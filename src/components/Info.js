import React from 'react';

class Info extends React.Component{
  render(){
    return (
      <div className="description">
        <p>The Spore Lamp is created using a total of 159 separate, 1/4 inch thick interlocking pieces. It is created out of Birch Plywood, and 3 different finishes are currently available, with additional finishes and choices of types of wood to choose from, coming in the future.</p>
        <p>The Spore Lamp was created using algorithmic modeling &amp; parametric design in order to create an eco-friendly, all USA Made lighting fixture entirely cut &amp; crafted using laser cutting machines.  As part of the Terraform Design movement, our projects are based off of organic, natural flowing shapes found in nature, and exist as a marriage between landscape &amp; technology.</p>
        <p>Dimensions: 16 inches (length &amp; width) by 13 inches (height)</p>
        <p>Price: $259.95  **Free Shipping**</p>
        <hr />
        <button type="button" name="button" onClick={this.props.changeSection}>Order Now</button>
    </div>
    )
  }
}

export default Info;
