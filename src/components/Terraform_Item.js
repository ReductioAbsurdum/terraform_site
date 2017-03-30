import React, {Component} from 'react';
import Slider from './Slider';
import Stripe from './Stripe';
import Custom from './Custom';
import axios from 'axios';


const fetchData = (num) => {
  return axios.get(`/${num}`).then(resp=>resp.data);
}

class Terraform_Item extends Component{
  constructor(props){
    super(props);
  }
  fetch_data(num){
   fetchData(num).then(data=>{
     this.setState({
       item: true,
       data: data
     });
   });
  }
  componentWillMount(){
    this.setState({
      item: false,
      data: {
        id: 0,
        description : [],
        title: "",
        price: 0,
        photos: [],
        sale: false
      }
    });
    //var _this = this;
    //document.getElementById('100').addEventListener('click', (item)=>{
      //this.fetch_data(item.target.id);
    //});

    var _this = this;
    this.props.items.map((item)=>{
      item.addEventListener('click', (info)=>{
        this.fetch_data(info.target.id);
      })
    })
}
itemRender(sale){
  if(sale){
    return (
      <div>
        <Slider images={this.state.data.photos}/>
        <Stripe title={this.state.data.title}
                description={this.state.data.description}
                price={this.state.data.price}
                sale={this.state.data.sale}
                options={this.state.data.options}/>
      </div>
    )
  }else{
    return (
        <Custom img={this.state.data.photos[0]}/>
    )
  }
}
  render(){
    return (
      <div>
        {this.itemRender(this.state.data.sale)}
      </div>
    )
  }
}

export default Terraform_Item;
