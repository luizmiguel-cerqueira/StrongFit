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