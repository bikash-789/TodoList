const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static('public'));


mongoose.connect("mongodb+srv://bikash_789:Clash@2216@cluster0.tjsx1.mongodb.net/todolistDB", {useNewUrlParser: true});

const itemsSchema={
    name: String,
};

//                          collections , schema name
const Item = mongoose.model("item", itemsSchema);


app.get("/", (req, res)=>{
    var today = new Date();
    var options = {
        weekday: "short",
        day: "numeric",
        month: "short"
    }
    var date = today.toLocaleDateString("en-US", options);
    Item.find({}, (err, objs)=>{
        res.render("list", {date: date, listOfTodo: objs});
    })
});



app.post("/", (req, res)=>{
    const itemName = req.body.todoItem;
    var newItem = new Item({
        name: itemName
    });
    newItem.save(); 
    res.redirect("/");
});

app.post("/delete", (req, res)=>{
    const _id= req.body.checked;
    Item.deleteOne({_id: _id}, (err)=>{
        if(err)
        console.log(err);
    });
    res.redirect("/");
});


let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}


app.listen(3000, (req, res)=>{
    console.log("Server has started successfully!");
});