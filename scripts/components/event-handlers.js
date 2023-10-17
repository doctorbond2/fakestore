

function loginEL(namn) {

  const loginButton = document.querySelector('.login-button');
  const loginInput = document.querySelector('.login-input');
  const generatedLoginName = document.querySelector('.place-the-login-name-here');
  generatedLoginName.style.fontSize = '0.9em';
  
  loginButton.addEventListener('click',() => {
    const username = loginInput.value;
    console.log(username);
    if(username === '' || typeof username === 'number') {
      alert('Please enter your name, use letters not numbers :)');
    } else {
      generatedLoginName.innerHTML = `Logged in as: ${username}`;
    }
  });
}

export {loginEL};