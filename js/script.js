const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener('submit', e => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    validateInputs(); // Chama a função para validar os inputs
});

// Define uma função para configurar um erro em um elemento
const setError = (element, message) => {
    const inputControl = element.parentElement; // pega elemento pai do input
    const errorDisplay = inputControl.querySelector('.error'); // puxa elemento com a classe 'error'

    errorDisplay.innerText = message; // define a mensagem de erro
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

// Define uma função para configurar um sucesso em um elemento
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = ''; // Limpa a mensagem de erro
    inputControl.classList.add('success'); // Adiciona a classe 'success' para estilizar visualmente
    inputControl.classList.remove('error'); // Remove a classe 'error' se estiver presente
};

// Verifica se o email fornecido é válido
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Função para validar os inputs
const validateInputs = () => {
    const usernameValue = username.value.trim(); // pega o valor do username e remove espaços em branco
    const emailValue = email.value.trim(); // pega o valor do email e remove espaços em branco
    const passwordValue = password.value.trim(); // pega o valor da senha e remove espaços em branco
    const password2Value = password2.value.trim(); // pega o valor da confirmação de senha e remove espaços em branco

    // Validação do campo de username
    if(usernameValue === '') {
        setError(username, 'Username is required'); // Configura um erro se o username estiver vazio
    } else {
        setSuccess(username); // Configura um sucesso se o username estiver preenchido
    }

    // Validação do campo de email
    if(emailValue === '') {
        setError(email, 'Email is required'); // Configura um erro se o email estiver vazio
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address'); // Configura um erro se o email não for válido
    } else {
        setSuccess(email); // Configura um sucesso se o email for válido
    }

    // Validação do campo de senha
    if(passwordValue === '') {
        setError(password, 'Password is required'); // Configura um erro se a senha estiver vazia
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.') // Configura um erro se a senha for menor que 8 caracteres
    } else {
        setSuccess(password); // Configura um sucesso se a senha for válida
    }

    // Validação do campo de confirmação de senha
    if(password2Value === '') {
        setError(password2, 'Please confirm your password'); // Configura um erro se a confirmação de senha estiver vazia
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match"); // Configura um erro se as senhas não coincidirem
    } else {
        setSuccess(password2); // Configura um sucesso se as senhas coincidirem
    }

};

const resetForm = () => {
  username.value = '';
  email.value = '';
  password.value = '';
  password2.value = '';
  
  // Remover classes de sucesso ou erro apenas dos elementos input-control
  username.parentElement.classList.remove('success', 'error');
  email.parentElement.classList.remove('success', 'error');
  password.parentElement.classList.remove('success', 'error');
  password2.parentElement.classList.remove('success', 'error');
};

form.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs();

  // Se todos os campos forem válidos, limpar o formulário após um pequeno atraso
  if (username.parentElement.classList.contains('success') &&
      email.parentElement.classList.contains('success') &&
      password.parentElement.classList.contains('success') &&
      password2.parentElement.classList.contains('success')) {
      
      // Adicionar um atraso de 1 segundo (1000 milissegundos) antes de redefinir o formulário
      setTimeout(resetForm, 1000);
  }
});
