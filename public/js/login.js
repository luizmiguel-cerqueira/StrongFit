    document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('btnLogin');
    button.addEventListener('click', async () => {
        
        const user = document.getElementById('user')
        const pass = document.getElementById('word')
        
        const infos = {
            username: user.value,
            password: pass.value
        };

        const jsonString = JSON.stringify(infos)
        const response = await validarLogin(jsonString)
        
        if(response){
            window.location.href='../userArea/userArea.html'
        }else{
            document.getElementById('aviso').textContent = "usuário ou senha incorretos"
        }
    })
});
async function validarLogin(inputs) {
    const response = await fetch('http://127.0.0.1:3000/api/login', {
        method:'POST',
        credentials: 'include',
        headers: { 'Content-Type':'application/Json' },
        body: inputs
    }).catch(err => console.error(err))

    const dados = await response.json();

    if(dados.ok){
        return true
    }else{
        return false
    }
}
async function IrAreaCliente() {
    const response = await fetch('http://127.0.0.1:3000/public/userArea/userArea')
}