document.addEventListener('DOMContentLoaded', () => {  
    fetch('http://127.0.0.1:3000/api/UserArea',{
        method:'GET',
        credentials: "include"
    })
    .then(res =>{
        if(res.status == 401){
            window.location.href='../login/login.html'
        }
    });
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
          if(res.ok == true){
            window.location.href='../index.html'
          }
        }).catch(err=> console.error(err))
    })
})