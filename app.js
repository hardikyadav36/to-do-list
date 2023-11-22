const express = require("express");
const bodyParser = require("body-parser");
const { log } = require("console");
const mongoose = require("mongoose");
//const date = require(__dirname + "/date.js");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//main().catch(err => console.log(err));

mongoose.connect("mongodb+srv://hardik36:3609@hardik36.ew2fypy.mongodb.net/todolistDB");
  
//mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "welcome"
});
const item2 = new Item({
    name: "hit + to add"
});
const item3 = new Item({

    name: "delete"
});

const defalutitems=[item1,item2,item3];

const items = ["Buy food", "Eat food", "Sell food"];
const workitem = [];
//const day=date.getDate();

app.get("/", (req, res) => {
     

    Item.find()
    .then(async function(founditems){
        if(founditems.length===0){
           await Item.insertMany(defalutitems);
        }
        else{
        res.render("list", { itemsname: founditems, itemtitle: "Today" });
        }
    })
    .catch(function(err){
        console.log(err);
    });
   
   
});


app.post("/", (req, res) => {
    const itemna = req.body.newItem;
  const itemsadd=new Item({
    name:itemna
  });
    itemsadd.save();

    res.redirect("/");
   
    
});

app.post("/delete", async (req, res) => {
    const checkitem = req.body.checkbox;
    
    try {
        await Item.findByIdAndRemove(checkitem).exec();
        console.log("deleted");
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send("Error deleting item");
    }
});

app.get("/about", (req, res) => {
    res.render("about");
});
app.listen(3000, (req, res) => {
    console.log("server is at 3000");
});

