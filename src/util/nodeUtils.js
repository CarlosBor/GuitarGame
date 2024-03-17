export const disableNodes = (nodes) =>{
    console.log(nodes);
    for(var i=0;i<nodes.length;i++){
      nodes[i].setAttribute("disabled", "disabled");
    }
  }
  
export const enableNodes = (nodes) =>{
    for(var i=0;i<nodes.length;i++){
      nodes[i].removeAttribute("disabled");
    }
  }