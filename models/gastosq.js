import fs from "fs";

let addGastosQuery = async (newGasto) => {
    try {
        let gastos = JSON.parse(
            fs.readFileSync("./data/gastos.json", "utf-8")
        );
        gastos.gastos.push(newGasto);
        fs.writeFileSync("./data/gastos.json", JSON.stringify(gastos));
        return gastos;
    } catch (error) {
        console.log("Error code: ", error.code, "Error message: ", error.message);
    }
};

let getGastosQuery = async () => {
    try {
        let gastos = JSON.parse(
            fs.readFileSync("./data/gastos.json", "utf-8")
        );
        return gastos;
    } catch (error) {
        console.log("Error code: ", error.code, "Error message: ", error.message);
    }
}

let updateGastosQuery = async (newGasto) => {
    const { id } = newGasto;
    try {
      let { gastos}= JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
      gastos = gastos.map((gasto) => {
        if (gasto.id === id) {
          return newGasto;
        } else {
          return gasto;
        }
      });
      fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
      return gastos;
    } catch (error) {
      console.log("Error code: ", error.code, "Error message: ", error.message);
    }
  };

let deleteGastosQuery = async (id) => {
    try {
      let { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
      gastos = gastos.filter((gasto) => gasto.id !== id);
      fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
      return gastos;
    } catch (error) {
      console.log("Error code: ", error.code, "Error message: ", error.message);
    }
  };

let recalcularMontoGastos = () => {
    let { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
    let { roommates } = JSON.parse(fs.readFileSync("./data/roommates.json", "utf-8"));
    roommates.forEach((r) => {
      r.debe = 0;
      r.recibe = 0;
      r.total = 0;
    });

    gastos.forEach((g) => { 
      let montoPorPersona = g.monto / roommates.length;
      roommates.forEach((r) => {
        if (g.roommate === r.nombre) {
          r.recibe += montoPorPersona * (roommates.length - 1);
        } else {
          r.debe -= montoPorPersona;
        }
        r.total = r.recibe - r.debe;
      });
    });
  
    // Escritura del archivo JSON con los datos actualizados
  fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
  
  
  };

  export {
    addGastosQuery,
    getGastosQuery,
    updateGastosQuery,
    deleteGastosQuery,
    recalcularMontoGastos
  }