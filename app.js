const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require('fs');
const XLSX = require('xlsx');
const { NULL } = require("xlsx-populate/lib/FormulaError");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var accname = "Sign Up";
var accicon = "fa-regular fa-user";

var flagg = 0;

app.get("/", function(req, res){
    // res.render("index", {accountname: accname, accounticon: accicon});

        res.render("index", {
            accountname: accname,
            accounticon: accicon,
            searchingtitle: searchingTitle,
            cards: cardS,
            Flagg: flagg
        });
        
        flagg = 0;
        searchingTitle = "Get the pricing and comparison details of your searched product right here!";

});

app.get("/login", function(req, res){
    res.render("login");
});
app.get("/signup", function(req, res){
    res.render("signup");
});
app.get("/about", function(req, res){
    res.render("about",{accountname: accname, accounticon: accicon});
});

app.post("/login", function(req, res){

    var name = req.body.accName;
    var emailid = req.body.email;
    var password = req.body.pass;
    
    accname = name
    accicon = "fa-solid fa-user";
    res.redirect("/");

});
app.post("/signup", function(req, res){
    var newname = req.body.newName;
    var newemailid = req.body.newemail;
    var newpassword = req.body.newpass;
    
    accname = newname
    accicon = "fa-solid fa-user";
    res.redirect("/");

});

app.post("/product1", function(req, res){
    res.render("product_details",{accountname: accname, accounticon: accicon})
});
app.post("/product2", function(req, res){
    res.render("product_details",{accountname: accname, accounticon: accicon})
});
app.get("/pricing", function(req, res){
    res.render("product_details", {accountname: accname, accounticon: accicon});
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});

// Searching

// Variables for Product Card

var searchingTitle = "Get the pricing and comparison details of your searched product right here!";
var cardS = [];


app.post("/searching", function(req,res){
    cardS = [];
    flagg = 1;
    searchingTitle = " Price and Details of Searched Product";

async function readExcelFile(filePath) {
    try {
        const data = fs.readFileSync(filePath);
        const workbook = XLSX.read(data, { type: 'buffer' });
        return workbook;
    } catch (error) {
        throw error;
    }
}

const filePath = "datascrap.xlsx";

async function processExcelFile(filePath) {

    const searchInput = req.body.searchValue;

    if (searchInput) {
        try {

            const workbook = await readExcelFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const productData = XLSX.utils.sheet_to_json(worksheet);

            const searchKeywords = searchInput.toLowerCase().split(/\s+/);
            const matchingProducts = productData.filter((product) => {
                const productName = String(product["ProductName"]).toLowerCase();

                return searchKeywords.every(keyword => productName.includes(keyword));
            });

            if(matchingProducts.length < 6 && matchingProducts.length > 0 ){
                

            for(var i = 0; i < matchingProducts.length; i++ ){
                // console.log("Matching Products: ", matchingProducts[i].image);
                // searchingTitle = "Simple and affordable price plans for your product on different Sites";
                cardS.push(matchingProducts[i]);
                // console.log(matchingProducts.length);
                // console.log(cardS[0]);
                };

            }else if (matchingProducts.length >= 6 ){
                for(var i = 0; i <= 5; i++ ){
                    cardS.push(matchingProducts[i]);
                    };
            }



            // if (matchingProducts.length === 0) {
                // console.log(" No matching products found. ");
            // }
        }catch (error) {
            console.error('Error reading Excel file:', error);
        }
    }
}

processExcelFile(filePath);

    res.redirect("/");
});
