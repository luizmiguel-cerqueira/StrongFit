document.addEventListener('DOMContentLoaded', () => {
  
  
  document.querySelectorAll(".musculo").forEach(btn =>{
    btn.addEventListener("click",(e)=>{
        var escolha ="";
        escolha = e.currentTarget.dataset.musculo
        localStorage.setItem("musculoEscolhido", escolha)
        window.location.href="../training/training.html"
       
    })
})
  const radios = document.querySelectorAll('input[name="Def"]');
  const input = document.getElementById('Descricao');

  function atualizarCampo() {
  const selecionado = document.querySelector('input[name="Def"]:checked');

  if (selecionado && selecionado.value === 'sim') {
    input.disabled = false; 
  } else {
    input.disabled = true;  
    input.value = '';
  }}
  
radios.forEach(radio => {
  radio.addEventListener('change', atualizarCampo);
});

  atualizarCampo(); 
const send = document.querySelector('.PreferForm');
  send.addEventListener('submit',(event)=>  {
    event.preventDefault();  
  })

const button = document.getElementById("SubmitBtn");
  button.addEventListener('click',()=>{
    const dados = {
      objetivo : document.querySelector('input[name="objetivo"]:checked')?.value,
      experiencia : document.querySelector('input[name="Exp"]:checked')?.value,
      duracao : document.querySelector('input[name="Duracao"]:checked')?.value,
      local : document.querySelector('input[name="Local"]:checked')?.value,
      limitacao : document.querySelector('input[name="Def"]:checked')?.value,
      descricao : document.getElementById('Descricao').value
    };
    const jsonString = JSON.stringify(dados)
    console.log(jsonString)
  })

});
