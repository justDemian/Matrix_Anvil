class Matrix {
  constructor (code){
    this.code = code;
    this.data = this.processCode(code);

    this.info = {
      letter : "",
      determinant : ""
    }
  }

  processCode(code) {
    //this.info.letter = code[0];
    const bracketsPart = code.slice(code.indexOf('['));
    const rowMatches = [...bracketsPart.matchAll(/\[([^\[\]]+)\]/g)];
    const matrix = rowMatches.map(match => {
      return match[1].split(',').map(num => Number(num.trim()));
    });

    return matrix;
  }

  print() {
    console.log("Matriz:");
    this.data.forEach(row => console.log(row));
  }

  // Obtener un valor individual
  get(row, col) {
    return this.data[row]?.[col];
  }

  // Obtener la cantidad de filas y columnas
  get dimensions() {
    return { rows: this.data.length, cols: this.data[0]?.length || 0 };
  }
}

var test_matrix = new Matrix("A[1,2,3][4,5,6][7,8,9]")
test_matrix.print();