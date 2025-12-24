document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://127.0.0.1:3000/api/training', {
        method:"GET",
        credentials:"include"
    })

    escolha = localStorage.getItem("musculoEscolhido")
    document.querySelector(".trainingText").textContent = ("Seu treino de " + escolha) 
    localStorage.removeItem("musculoEscolhido")
    
    document.querySelectorAll(".musculo").forEach(btn =>{
        btn.addEventListener("click",(e)=>{
            var escolha ="";
            escolha = e.currentTarget.dataset.musculo
            localStorage.setItem("musculoEscolhido", escolha)
            window.location.href="../training/training.html"
           
        })
    })
    const out = document.querySelector('.logoutBtn')
    out.addEventListener('click',()=>
    {
        fetch('http://127.0.0.1:3000/api/logout',{
          credentials:'include',
          method:'GET'
        }).then(res =>{
          console.log('a2')
          if(res.ok == true){
            window.location.href='../index.html'
          }
        }).catch(err=> console.error(err))
    })
})
