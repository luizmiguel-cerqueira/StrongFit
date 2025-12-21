
document.querySelectorAll(".musculo").forEach(btn =>{
    btn.addEventListener("click",(e)=>{
        var escolha ="";
        escolha = e.currentTarget.dataset.musculo
        localStorage.setItem("musculoEscolhido", escolha)
        window.location.href="../training/training.html"
       
    })
})