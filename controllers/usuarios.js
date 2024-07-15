import path from "path";
import { v4 as uuidv4 } from 'uuid';  
import { addRoommateQuery, getRoommatesQuery } from "../models/usuariosq.js";
import { recalcularMontoGastos } from "../models/gastosq.js";  
import axios from "axios";

const __dirname = path.resolve();

let home = (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
}

let addRoommate = async (req, res) => {
    try {
        let response = await axios.get("https://randomuser.me/api/");
        let randomUser = response.data.results[0];
        let id = uuidv4().slice(0, 6);
        let newUser = {
          id,
          nombre: `${randomUser.name.first} ${randomUser.name.last}`,
          email: randomUser.email,
          debe: 0,
          recibe: 0,
        };


        let results = await addRoommateQuery(newUser);
        recalcularMontoGastos();
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

let getRoommates = async (req, res) => {
    try {
        let results = await getRoommatesQuery();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    home,
    addRoommate,
    getRoommates
}