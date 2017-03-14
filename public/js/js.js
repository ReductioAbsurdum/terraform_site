var position = 0;

function scrollR(num){
  if(num){
    position = num;
  }
  if(position === -1){
    if(window.scrollY > 0){
      Velocity(box_wrapper, 'scroll');
    }
  }
  if(position === 6){
    return;
  }
  Velocity(document.getElementsByClassName("box")[++position], 'scroll', {container: box_wrapper, axis: "x"});
  console.log(position);
};

function scrollL(){
  if(position === 0){
    return;
  }
  Velocity(document.getElementsByClassName("box")[--position], 'scroll', {container: box_wrapper, axis: "x"});
  console.log(position);
};

function dropIt(){
  var after = document.getElementById("after");
  Velocity(after, {opacity: 1}, {display: "block"}).then(function(a){
    Velocity(a, 'scroll');
  });
}

var contactUp = false;
function raiseIt(){
  var contact = document.getElementById('contact');
  if(!contactUp){
    Velocity(contact, {opacity: 1}, {display: "block"});
    contactUp = true;
  }else{
    exitContact();
  }
}

function exitContact(){
  //var contact = document.getElementById('contact');
  Velocity(contact, {opacity: 0}, {display: "none"});
  contactUp = false;
}


window.onload = function(){
  var box_wrapper = document.getElementById("box_wrapper");
  var pulseArrow = document.getElementsByClassName("pulse_arrow")[0];

  Velocity(pulseArrow, {opacity: 0.5}, {duration: 1000, loop: true});

  box_wrapper.addEventListener('scroll', function(){
    if(box_wrapper.scrollLeft > 100){
      Velocity(pulseArrow, 'fadeOut');
    }
    position = Math.floor(box_wrapper.scrollLeft / 500); //4000px / 8(.box) = 500
  });
}
