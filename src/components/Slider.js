import React from 'react';

class Slider extends React.Component{
  constructor(props){
    super(props);
    this.state = {currentImg: 0};
  };
  componentWillReceiveProps(){
    this.setState({
      currentImg: 0
    })
  }
  increase(){
    this.setState({
      currentImg: ++this.state.currentImg % this.props.images.length
    });
  };
  updateCurrentImg(e){
    this.setState({
      currentImg: e.target.id
    })
  };
  render(){
    return(
      <div id="showcase">
        <div className="slider_wrapper">
          <div className="slider_image_present cursor" onClick={this.increase.bind(this)}>
            <img src={this.props.images[this.state.currentImg]}/>
          </div>
          <div className="thumb_holder">
          {Object.keys(this.props.images).map(img=>
            <div key={img} className="thumb cursor">
              <img id={img} src={this.props.images[img]} onClick={this.updateCurrentImg.bind(this)}/>
            </div>
          )}
          </div>
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  images : React.PropTypes.array.isRequired
}

export default Slider;
