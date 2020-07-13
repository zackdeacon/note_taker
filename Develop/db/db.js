const util = require("util")
const fs = require("fs")
const writtenNotes = "./Develop/db/db.json";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    async readNotes(){
        try {
            const initialNotes = await readFileAsync(writtenNotes, "utf8")
            return initialNotes?JSON.parse(initialNotes):[]
        } catch(err){
            console.log("wrong READING notes: " + err);
        }
    }
    async writeNotes(notesArr){
        try {
          await writeFileAsync(writtenNotes, JSON.stringify(notesArr))
        } catch(err){
            console.log("wrong WRITING notes ", err)
        }
    }
}

// const testDB = new DB();
// const test = async () =>{
// testDB.writeNotes({
//     title: "hreiuferuigbiuerbiu",
//     text: "gyuefgyewfyuewgfyiewfyuiewgfyu"
// })
// console.log(`testDB.readNotes()`, await testDB.readNotes());
// }
module.exports = new DB();
// test();