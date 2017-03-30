import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './components/Contact';
import Terraform_Item from './components/Terraform_Item';

ReactDOM.render(<Contact />, document.getElementById('contact_component'));

var img_items = document.getElementsByClassName('box_image');
var items = Array.prototype.slice.call(img_items);
ReactDOM.render(<Terraform_Item items={items}/>, document.getElementById('after'));
