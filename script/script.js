const listaInput = document.querySelector(".lista-texto");
const listaButton = document.querySelector(".lista-btn");
const listaList = document.querySelector(".lista-list");
const filtrarOpcoes = document.querySelector(".filtrar-lista");

document.addEventListener("DOMContentLoaded", getLocalLista);
listaButton.addEventListener("click", addLista);
listaList.addEventListener("click",deletarCheck);
filtrarOpcoes.addEventListener("change",filterLista);



function addLista(event){

    event.preventDefault();

    if (listaInput.value.trim() === "") {
      alert("insert a task");
      return;
    }

    const listaDiv = document.createElement("div");
    listaDiv.classList.add("lista");
    const newLista = document.createElement("li");
    newLista.innerText = listaInput.value;
    newLista.classList.add("lista-item");
    listaDiv.appendChild(newLista);
    saveLocalLista(listaInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `DONE`;
    completedButton.classList.add("DONE-btn");
    listaDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `DELETE`;
    trashButton.classList.add("trash-btn");
    listaDiv.appendChild(trashButton);

    listaList.appendChild(listaDiv);
    listaInput.value = "";


}

function deletarCheck(e){
  const item = e.target;
  if(item.classList.contains("trash-btn")){
    const lista = item.parentElement;
    lista.classList.add("slide");

    removeLocalLista(lista);
    lista.addEventListener("transitionend", function(){
    lista.remove();
    });
  }
 if(item.classList.contains("DONE-btn")){
  const todo = item.parentElement;
  todo.classList.toggle("DONE");
 }
}

function filterLista(e){
const listaS = listaList.childNodes;
  listaS.forEach(function(lista){
    switch(e.target.value){
      case "ALL":
        lista.style.display = "flex";
        break;
        case "DONE":
          if(lista.classList.contains("DONE")){
            lista.style.display = "flex";
          }else{
            lista.style.display = "none";
          }
          break;
          case "UNDONE":
            if(!lista.classList.contains("DONE")){
              lista.style.display = "flex";
            }else{
              lista.style.display = "none";
            }
            break;
     }
  });
}

function saveLocalLista(lista){
  let listaS;
  if(localStorage.getItem("listaS") === null){
    listaS = [];
  }else{
    listaS = JSON.parse(localStorage.getItem("listaS"));
  }
  listaS.push(lista);
  localStorage.setItem("listaS", JSON.stringify(listaS));
}

function getLocalLista(){
  let listaS;
  if(localStorage.getItem("listaS") === null){
    listaS = [];
  }else{
    listaS = JSON.parse(localStorage.getItem("listaS"));
  }
  listaS.forEach(function(lista){
    const listaDiv = document.createElement("div");
    listaDiv.classList.add("lista");
    const newLista = document.createElement("li");
    newLista.innerText = lista;
    newLista.classList.add("lista-item");
    listaDiv.appendChild(newLista);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `DONE`;
    completedButton.classList.add("DONE-btn");
    listaDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `DELETE`;
    trashButton.classList.add("trash-btn");
    listaDiv.appendChild(trashButton);
   
    listaList.appendChild(listaDiv);
  });
}

function removeLocalLista(lista){
  let listaS;
  if(localStorage.getItem("listaS") === null){
    listaS = [];
  }else{
    listaS = JSON.parse(localStorage.getItem("listaS"))
  }
const listaIndex = lista.children[0].innerText;
listaS.splice(listaS.indexOf(listaIndex), 1);
localStorage.setItem("listaS", JSON.stringify(listaS));

}

