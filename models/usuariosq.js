import fs from "fs";

let addRoommateQuery = async (newUser) => {
  try {
    let roommates = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    roommates.roommates.push(newUser);
    fs.writeFileSync("./data/roommates.json", JSON.stringify(roommates));
    return roommates;
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
  }
};

let getRoommatesQuery = async () => {
  try {
    let roommates = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    return roommates;
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
  }
};

export {
  addRoommateQuery,
  getRoommatesQuery

}
