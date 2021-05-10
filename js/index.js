
tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  const enviarProfeOak = async function(){
    //siempre this me devuelve una referencia al elemento que llamó a la función
    //en este caso es el boton
    let nro = this.nro;
    let res = await Swal.fire({
      title:"Desea realmente continuar?",
      text: "Esta intentando enviar el pokemon al profesor oak, esto no se puede revertir",
      icon: "warning",
      showCancelButton:true.valueOf,
      confirmButtonText:"Si! hazlo!"
    })
    if(res.isConfirmed){
      pokemones.splice(nro,1);
      cargarTabla();
      Swal.fire("Pokemon descartado", "Pokemon enviado al profesor", "info");
    }else{
      Swal.fire("Cancelado", "Operacion cancelada", "error");
    }

  };
  const pokemones = []; //definir arreglo en javascript
  const cargarTabla = ()=>{

    //1, Obtener una referencia a la tabla
    let tbody = document.querySelector("#tbody-tabla");
    //Eliminar el contenido del tbody
    tbody.innerHTML = "";
    //2. recorrer la lista de pokemon
    for(let i=0; i <pokemones.length; ++i){
      let p = pokemones[i];
      //3. por cada pokemon generar una fila de la tabla (tr)
      let tr = document.createElement("tr");
      //4. por cada atributo generar un td de la tabla
      let tdNro = document.createElement("td");
      let tdNombre = document.createElement("td");
      let tdTipo = document.createElement("td");
      let tdDescripcion = document.createElement("td");
      let tdAcciones = document.createElement("td");

      //definir lo que va ne la tabla
      tdNro.innerText = i+1;
      tdNombre.innerText = p.nombre;
      //TODO: El tipo tiene que ser un icono
      let tipo = document.createElement("i");
      if(p.tipo == "1"){
        //planta <i class="fas fa-leaf"></i>
        tipo.classList.add("fas", "fa-leaf","text-success", "fa-3x");
      }else if(p.tipo == "2"){
        //<i class="fas fa-fire"></i>
        tipo.classList.add("fas", "fa-fire","text-danger", "fa-3x");
      }else if(p.tipo == "3"){
        //<i class="fas fa-bolt"></i>
        tipo.classList.add("fas", "fa-bolt","text-warning", "fa-3x");
      }else if(p.tipo == "4"){
       //<i class="fas fa-tint"></i>
       tipo.classList.add("fas", "fa-tint","text-primary", "fa-3x");
      }else {
        //<i class="fas fa-bullseye"></i>
        tipo.classList.add("fas", "fa-bullseye","text-info", "fa-3x");
      }
      tdTipo.classList.add("text-center")
      tdTipo.appendChild(tipo);
      //Cuando quiero agregar un elemento dentro de otro: appendChild
      //Cuando quiero definir texto, innerText
      //Cuando quiero definir directamente el html, innerHTML
      //TODO: Arreglar descripcion HECHO
      tdDescripcion.innerHTML = p.descripcion;

      let boton = document.createElement("button");
      boton.classList.add("btn", "btn-danger");
      boton.innerText = "Enviar al profesor oak";

      boton.nro = i;
      tdAcciones.appendChild(boton);
      tdAcciones.classList.add("text-center");

      boton.addEventListener("click",enviarProfeOak);

      //TODO: Que hago con las acciones!
      //5. agregar los td al tr
      tr.appendChild(tdNro);
      tr.appendChild(tdNombre);
      tr.appendChild(tdTipo);
      tr.appendChild(tdDescripcion);
      tr.appendChild(tdAcciones);
      //6. agregar el tr a la tabla
      tbody.appendChild(tr);
    }

  }
  
  document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let tipo = document.querySelector("#tipo-select").value;
    let legendario = document.querySelector("#legendario-si").checked;
    let descripcion = tinymce.get("descripcion-txt").getContent();
    //objeto, se le pueden añadir propiedades dinamicas
    let pokemon = {}; 
    //crea un atributos: numero letras funciones elementos html
    pokemon.nombre = nombre;
    pokemon.tipo = tipo;
    pokemon.legendario = legendario;
    pokemon.descripcion = descripcion;

    pokemones.push(pokemon); //como el append de python
    cargarTabla();
    Swal.fire("Resultado exitoso!", "Pokemon registrado", "info");

  } );