import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/Slider';
import Stripe from './components/Stripe';

var images = ['spore_imgs/spore1.png', 'spore_imgs/spore2.png', 'spore_imgs/spore3.png', 'spore_imgs/spore4.png', 'spore_imgs/spore5.png']

ReactDOM.render(<Slider images={images}/>, document.getElementById('showcase'));
ReactDOM.render(<Stripe />, document.getElementById('stripe'));
