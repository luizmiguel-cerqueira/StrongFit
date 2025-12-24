    document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('BotaoReg');
    button.addEventListener('click', async () => {
        
        const user = document.getElementById('user');
        const pass1 = document.getElementById('password1');
        const pass2 = document.getElementById('password2');
        
        if(user.value == '' || pass1.value == ''|| pass2.value == ''){
            document.getElementById('aviso1').textContent = "todos os campos precisam estar preenchidos";
            return
        }
        if(pass1.value != pass2.value){
            document.getElementById('aviso1').textContent = "As senhas precisam coincidir";
            return
        }
        const dados ={
            user: user.value,
            pass: pass1.value
        };
        const jsonString = JSON.stringify(dados);
        console.log('1')
        const existe = await buscaUser(jsonString);
        console.log('2')

        if(!existe){
            document.getElementById('aviso1').textContent = "usuário ja existente";
        
        }else{
            window.location.href='../login/login.html';
        }
    })
    
});
async function buscaUser(inputs) {
        console.log('passoi aq')
        const response = await fetch('http://127.0.0.1:3000/api/saveDB',{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: inputs
        }).catch(err => console.log('saiii'))
        
        console.log('passoi aq2')
            const dados = await response.json();
            if(dados.ok){ 
                console.log("sera q passa aq?")
                return true
            }else{
                return false
            }
    };