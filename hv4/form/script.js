function validator() {
  let pattern = [
    /^[a-zа-яё]+$/i,
    /^\+7\(\d{3}\)\d{3}-\d{4}$/,
    /^[\w\.-]+@\w+\.[a-z]{2,4}$/i
  ];

  let foundInput = [
    document.getElementsByName('name')[0].value,
    document.getElementsByName('phone')[0].value,
    document.getElementsByName('email')[0].value
  ];

  let name = ['name', 'phone', 'email']

  for (i  = 0; i < 3; i++) {
    if (pattern[i].test(foundInput[i])){
      document.getElementById(name[i]).className = 'valid';
    } else{
      document.getElementById(name[i]).className = 'invalid';
    };
  };
};

function stopDef(e){
  e.preventDefault()
}
    
document.querySelector('button').addEventListener("click", stopDef);
   

document.querySelector('button').addEventListener("click", validator)