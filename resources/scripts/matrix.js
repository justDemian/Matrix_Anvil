document.getElementById("add_matrix").addEventListener("click", () => {
  crearMatriz(1, 1); // Inicializar matriz 1x1
});

function crearMatriz(filas, columnas) {
  const contenedor = document.getElementById("matrix_container");
  contenedor.innerHTML = ""; // Limpiar matriz previa

  const tabla = document.createElement("table");
  tabla.id = "matrix";
  tabla.style.borderCollapse = "collapse";

  for (let i = 0; i < filas; i++) {
    const fila = document.createElement("tr");
    for (let j = 0; j < columnas; j++) {
      const celda = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.dataset.fila = i;
      input.dataset.columna = j;
      input.style.width = "40px";
      input.style.textAlign = "center";

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          manejarEnter(input);
        } else if (e.key === "Tab") {
          e.preventDefault();
          manejarTab(input);
        }
      });

      input.addEventListener("input", () => {
        input.value = input.value.replace(/[^\d\-]/g, ""); // solo números y negativos
      });

      celda.appendChild(input);
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }

  contenedor.appendChild(tabla);
  tabla.querySelector("input").focus(); // Enfocar primera celda
}

function manejarEnter(input) {
  if (input.value === "") input.value = "0";
  
  const fila = Number(input.dataset.fila);
  const col = Number(input.dataset.columna);
  const tabla = document.getElementById("matrix");
  const numFilas = tabla.rows.length;

  // Añadir nueva columna a todas las filas
  for (let i = 0; i < numFilas; i++) {
    const nuevaCelda = tabla.rows[i].insertCell(-1);
    const nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.dataset.fila = i;
    nuevoInput.dataset.columna = tabla.rows[i].cells.length - 1;
    nuevoInput.style.width = "40px";
    nuevoInput.style.textAlign = "center";
    nuevoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        manejarEnter(nuevoInput);
      } else if (e.key === "Tab") {
        e.preventDefault();
        manejarTab(nuevoInput);
      }
    });
    nuevoInput.addEventListener("input", () => {
      nuevoInput.value = nuevoInput.value.replace(/[^\d\-]/g, "");
    });
    nuevaCelda.appendChild(nuevoInput);
  }

  // Enfocar nueva celda en la misma fila
  tabla.rows[fila].cells[col + 1].querySelector("input").focus();
}

function manejarTab(input) {
  const fila = Number(input.dataset.fila);
  const col = Number(input.dataset.columna);
  const tabla = document.getElementById("matrix");
  const numCols = tabla.rows[0].cells.length;

  // Crear nueva fila
  const nuevaFila = document.createElement("tr");
  for (let j = 0; j < numCols; j++) {
    const nuevaCelda = document.createElement("td");
    const nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.value = "0";
    nuevoInput.dataset.fila = fila + 1;
    nuevoInput.dataset.columna = j;
    nuevoInput.style.width = "40px";
    nuevoInput.style.textAlign = "center";
    nuevoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        manejarEnter(nuevoInput);
      } else if (e.key === "Tab") {
        e.preventDefault();
        manejarTab(nuevoInput);
      }
    });
    nuevoInput.addEventListener("input", () => {
      nuevoInput.value = nuevoInput.value.replace(/[^\d\-]/g, "");
    });
    nuevaCelda.appendChild(nuevoInput);
    nuevaFila.appendChild(nuevaCelda);
  }
  tabla.appendChild(nuevaFila);

  // Enfocar misma columna en nueva fila
  tabla.rows[fila + 1].cells[col].querySelector("input").focus();
}