import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../helpers/sendMail.js";
import { addGastosQuery, getGastosQuery, updateGastosQuery, deleteGastosQuery, recalcularMontoGastos } from "../models/gastosq.js";


let addGasto = async (req, res) => {
  try {
    let id = uuidv4().slice(0, 6);
    let { roommate, descripcion, monto } = req.body;
    let newGasto = { id, roommate, descripcion, monto };
    let results = await addGastosQuery(newGasto);
    sendEmail(monto, descripcion, roommate)
    recalcularMontoGastos()
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getGastos = async (req, res) => {
  try {
    let results = await getGastosQuery();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let updateGasto = async (req, res) => {
  try {
    let { id } = req.query;
    let { roommate, descripcion, monto } = req.body;
    let newGasto = { id, roommate, descripcion, monto };
    let results = await updateGastosQuery(newGasto);
recalcularMontoGastos()
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let deleteGasto = async (req, res) => {
  try {
    let { id } = req.query;
    let results = await deleteGastosQuery(id);
    recalcularMontoGastos()
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addGasto,
  getGastos,
  updateGasto,
  deleteGasto

}