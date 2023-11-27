const backgroundLogin = document.createElement('div');
const textoPrincipal = document.createElement('h1'); 
const textoSecundario = document.createElement('p'); 
const textoSenha = document.createElement('p'); 
const formulario = document.createElement('form'); 
const loginButton = document.createElement('button'); 
const senhaInput = document.createElement('input'); 

textoPrincipal.innerHTML = 'Atletas do Botafogo em 2023-2';
textoSecundario.innerHTML = 'Criado com objetivos exclusivamente didáticos para a <br> disciplina Desenvolvimento Web do Ibmec Rio.';
textoSenha.innerHTML = 'Efetue login com a senha: SENHA';
loginButton.innerHTML = 'Entrar';

senhaInput.type = 'password';

document.body.appendChild(backgroundLogin);
backgroundLogin.appendChild(textoPrincipal);
backgroundLogin.appendChild(textoSecundario);
backgroundLogin.appendChild(formulario);
backgroundLogin.appendChild(textoSenha);

formulario.appendChild(senhaInput);
formulario.appendChild(loginButton);

function checarSenha(event) {
    event.preventDefault(); 
  
    const senhaDigitada = senhaInput.value;
    const senhaCrypt = hex_md5(senhaDigitada)
  
    if (senhaCrypt === '85ee0fe4f155a9af2657d85054ad63ca') {
      window.location.href = 'detalhes.html'; 
    } else {
      alert('Senha incorreta! Tente novamente.');
    }
  }

formulario.addEventListener('submit', checarSenha);

formulario.id = 'formulario';
textoPrincipal.id = 'texto_principal';
textoSecundario.id = 'texto_secundario';
textoSenha.id = 'texto_senha';
backgroundLogin.id = 'background-login';






