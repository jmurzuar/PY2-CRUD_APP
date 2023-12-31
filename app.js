let cards = [];
const form = document.getElementById('cardForm');

function carga_fecha_combo() {
  const fechaActual = new Date().toISOString().split('T')[0];

  // Establecer la fecha mínima en el elemento input
  const fechaInput = document.getElementById('fechavence');
  fechaInput.min = fechaActual;
  fechaInput.value = fechaActual

}

// Cargar datos del localStorage al iniciar
function loadFromLocalStorage() {
  const storedData = localStorage.getItem('cards');
  if (storedData) {
    cards = JSON.parse(storedData);
    sortCardsByTimestamp(); // Ordenar las tarjetas al cargar
    renderCards();
  }
}

function contar_registros() {

  if (typeof (Storage) !== "undefined") {
    // Obtener el contenido de 'cards' desde localStorage
    var cardsData = localStorage.getItem('cards');

    // Verificar si 'cards' tiene algún contenido
    if (cardsData) {
      // Parsear el contenido como JSON para obtener un array u objeto
      var cardsArray = JSON.parse(cardsData);

      // Obtener el número de registros en 'cards'
      var numRegistros = cardsArray.length;

      // Filtrar elementos basados en algún criterio (por ejemplo, una propiedad llamada 'tipo' igual a 'someValue')
      var filtro = 'Cerrado'; // Ajusta esto según tus necesidades
      var filtrados = cardsArray.filter(function (card) {
        return card.estado === filtro;
      });

      // Obtener el número de registros filtrados
      var numRegistrosFiltrados = filtrados.length;

      // Filtrar elementos basados en algún criterio (por ejemplo, una propiedad llamada 'tipo' igual a 'someValue')
      var filtro2 = 'Programado'; // Ajusta esto según tus necesidades
      var filtrados2 = cardsArray.filter(function (card2) {
        return card2.estado === filtro2;
      });

      // Obtener el número de registros filtrados
      var numRegistrosFiltrados2 = filtrados2.length;


      // Obtener el número de registros filtrados
      var numRegistrosFiltrados = filtrados.length;

      // Filtrar elementos basados en algún criterio (por ejemplo, una propiedad llamada 'tipo' igual a 'someValue')
      var filtro3 = 'Ingresado'; // Ajusta esto según tus necesidades
      var filtrados3 = cardsArray.filter(function (card3) {
        return card3.estado === filtro3;
      });

      // Obtener el número de registros filtrados
      var numRegistrosFiltrados3 = filtrados3.length;


      // Mostrar el número de registros en la consola
      //console.log("Número de registros en 'cards': " + numRegistros);
      document.getElementById('card_contar').innerHTML = '<p>&nbsp;&nbsp;<strong>Total registros: ' + numRegistros + '</strong> (Cerrados: ' + numRegistrosFiltrados + ', Progamados: ' + numRegistrosFiltrados2 + ', Ingresados: ' + numRegistrosFiltrados3 + ')</p>';
    } else {
      document.getElementById('card_contar').innerHTML = '<p>&nbsp;&nbsp;No se encontraron registros</p>';
      //console.log("No hay datos en 'cards' en localStorage.");
    }
  } else {
    document.getElementById('card_contar').innerHTML = '<p>&nbsp;&nbsp;El navegador no es compatible con localStorage</p>';
    //console.log("El navegador no es compatible con localStorage.");
  }

}


// Guardar datos en localStorage
function saveToLocalStorage() {
  localStorage.setItem('cards', JSON.stringify(cards));
}



function addCard() {
  const cardContent = document.getElementById('cardContent').value;
  const cardContent2 = document.getElementById('cardContent2').value;
  const cardfechavence = document.getElementById('fechavence').value;
  const cardestado = document.getElementById('estado').value;

  if (cardContent.trim() !== '') {
    const card = {
      id: Date.now(),
      content: cardContent,
      content2: cardContent2,
      fecha: cardfechavence,
      estado: cardestado,
      timestamp: new Date().toLocaleString(),


    };

    cards.push(card);
    sortCardsByTimestamp(); // Ordenar las tarjetas después de añadir una nueva
    renderCards();
    saveToLocalStorage(); // Guardar datos en localStorage
 
    form.reset();
    carga_fecha_combo();
  }
}

// diplicado con listener

form.addEventListener('submit', function (event) {

  //elimina comportamientos por defecto del formulario
  event.preventDefault();

  const cardContent = document.getElementById('cardContent').value;
  const cardContent2 = document.getElementById('cardContent2').value;
  const cardfechavence = document.getElementById('fechavence').value;
  const cardestado = document.getElementById('estado').value;


  if (cardContent.trim() !== '' && cardContent2.trim() !== '') {
    const card = {
      id: Date.now(),
      content: cardContent,
      content2: cardContent2,
      fecha: cardfechavence,
      estado: cardestado,
      timestamp: new Date().toLocaleString(),


    };

    document.getElementById("cardForm").style.backgroundColor = "#eef3f5";
    document.getElementsByClassName("button")[0].innerHTML = "Grabar";
    document.getElementsByClassName("button")[0].style.backgroundColor = "#7fffd4"

    cards.push(card);
    sortCardsByTimestamp(); // Ordenar las tarjetas después de añadir una nueva
    renderCards();
    saveToLocalStorage(); // Guardar datos en localStorage

    form.reset();
    carga_fecha_combo();
    contar_registros();



  } else {

    alert('Favor llenar todos los campos');

  }

}

)

// fin listener


function deleteCard(id) {

  cards = cards.filter(card => card.id !== id);
  sortCardsByTimestamp(); // Ordenar las tarjetas después de eliminar
  renderCards();
  saveToLocalStorage(); // Guardar datos en localStorage
  contar_registros();
}

// orden numérico / fecha - hora
function sortCardsByTimestamp() {
  //cards.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  cards.sort((b, a) => new Date(b.fecha) - new Date(a.fecha));
}

// orden alfabético
function sortCardsAlphabetically() {
  cards.sort((a, b) => a.content.localeCompare(b.content));
}


function renderCards() {
  const cardContainer = document.getElementById('cardContainer');

  cardContainer.innerHTML = '';


  cards.forEach(card => {

    var cardFecha = new Date(card.fecha);
    var hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    hoy.setDate(hoy.getDate() - 1);

    if (cardFecha >= hoy && card.estado != 'Cerrado') {
      fechas = 'vence';
    } else if (cardFecha < hoy && card.estado != 'Cerrado') {
      fechas = 'vencido';
    }
    else {
      fechas = '';
    }

    if (card.estado == 'Ingresado') {
      imagen_estado = '<img class="logo_estado" src="images/ingresado.png" width="25" height="20">';
    } else if (card.estado == 'Cerrado') {
      imagen_estado = '<img class="logo_estado" src="images/cerrado.png" width="15" height="20">';
    }
    else {
      imagen_estado = '<img class="logo_estado" src="images/calen.png" width="20" height="20">';
    }

    const cardElement = document.createElement('div');
    cardElement.className = 'card ' + card.estado + '';
    cardElement.innerHTML = `
      <br>
      <p class="titulo1">${card.content}</p>
      <p class="titulo2">${card.content2}</p>
      <br>
      <p class="fecha_vence2 ${fechas}">&nbsp;${fechas} ${card.fecha}&nbsp;</p><br>${imagen_estado}
      <p class="titulo3">${card.timestamp}<br>${card.estado}</p>
      <br>
      <br>
      <div class="div_botones">
      <button class="button--secundary" onclick="editCard(${card.id})">Editar</button>
      <button class="button--terciary" onclick="deleteCard(${card.id})">Eliminar</button>
      </div>
    `;
    cardContainer.appendChild(cardElement);
  });
}


function editCard(id) {
  // Buscar la tarjeta con el ID específico



  const cardToEdit = cards.find(card => card.id === id);

  // Verificar si la tarjeta existe
  if (cardToEdit) {
   
    document.getElementById('cardContent').value = cardToEdit.content;
    document.getElementById('cardContent2').value = cardToEdit.content2;
    document.getElementById('fechavence').value = cardToEdit.fecha;
    document.getElementById('estado').value = cardToEdit.estado;

    const fechaInput = document.getElementById('fechavence');
    fechaInput.min = cardToEdit.fecha;

    document.getElementById("cardForm").style.backgroundColor = "#f8bf02";
    document.getElementsByClassName("button")[0].innerHTML = "Editar";
    document.getElementsByClassName("button")[0].style.backgroundColor = "#b7f312"



    cards = cards.filter(card => card.id !== id);
    cards.splice(id, 1);
    // Renderizar y guardar en localStorage
    sortCardsByTimestamp(); // Ordenar las tarjetas después de editar
    renderCards();
    saveToLocalStorage();
    contar_registros();



  }
}



// Llamar a la función para cargar datos al iniciar

loadFromLocalStorage();
carga_fecha_combo();
contar_registros();
