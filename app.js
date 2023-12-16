const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require('fs');
const XLSX = require('xlsx');
// const { spawn } = require('child_process');
const path = require('path');
var request = require('request-promise'); 
const { url } = require("inspector");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var accname = "Sign Up";
var accicon = "fa-regular fa-user";
var linkarr = [];
var finallink = "https://mkp.gem.gov.in/laptop-notebook/hp-247-g8-ryzen3-athlon-3045b-win11h-8133/p-5116877-32989524800-cat.html#variant_id=5116877-32989524800";
var flagg = 0;

// product details variables
var proimage1;
var proimage2;
var proimage3;
var proname;
var promodel;
var brand; 
var prostock;
var prominqty;
var pro_id;
var proorigin;
var proprice;
var pro_pricefor;
var pro_sellertype;
var pro_sellervari;
var prorating;
var sellerlink;
var proprocessordesc;
var proprocessorgen; 
var prographictype;
var prographicdesc;
var prooperatingsys;
var proramtype;
var proramsize;
var proramspeed;
var prohddsize; 
var prossdsize;
var prodisplay;
var prodisplayreso;
var prowarranty;

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

app.get("/product_details", function(req, res){

    res.render("product_details",{
        accountname: accname,
        accounticon: accicon,
        proImage1: proimage1,
        proImage2: proimage2,
        proImage3: proimage3,
        pro_Pricefor: pro_pricefor,
        proPrice: proprice,
        proStock: prostock,
        proMinqty: prominqty,
        proId: pro_id,
        proOrigin: proorigin,
        proSellertype: pro_sellertype,
        proSellervari: pro_sellervari,
        proRating: prorating,
        sellerLink: sellerlink,
        proName: proname,
        proModel: promodel,
        proProcessordesc: proprocessordesc,
        proProcessorgen: proprocessorgen,
        proGraphictype: prographictype,
        proGraphicdesc: prographicdesc,
        proOperatingsys: prooperatingsys,
        proRamsize: proramsize,
        proSsdsize: prossdsize,
        proHddsize: prohddsize,
        proDisplay: prodisplay,
        proWarranty: prowarranty
    });
});

    // function for detail page script parsing
    async function arraysum() { 

        var data = { 
            array: [finallink,
            "https://www.amazon.com/HP-Display-i3-1215U-Graphics-15-dy5599nr/dp/B0BVD8LZQL/ref=pd_aw_ci_mcx_pspc_dp_m_m_t_3?pd_rd_w=CSqNA&content-id=amzn1.sym.8601bd6b-5f84-4e74-9236-bbdc6b94ed42&pf_rd_p=8601bd6b-5f84-4e74-9236-bbdc6b94ed42&pf_rd_r=KCYGXQAEB84X82VS0MAF&pd_rd_wg=xL4qz&pd_rd_r=c3b7ef46-f4ee-485b-84c6-f3cf68a667a7&pd_rd_i=B0BVD8LZQL&th=1",
        "https://www.flipkart.com/iball-intel-atom-quad-core-z3735f-2-gb-32-gb-emmc-storage-windows-10-home-compbook-excelance-laptop/p/itmf55118a236d70?pid=COMEGMXJ34KFMZ7U&lid=LSTCOMEGMXJ34KFMZ7UHNTVBN&marketplace=FLIPKART&fm=productRecommendation%2Fsimilar&iid=R%3As%3Bp%3ACOMGGR9SPXCF8RUU%3Bl%3ALSTCOMGGR9SPXCF8RUUELGZL5%3Bpt%3App%3Buid%3Ad6ce78b4-9b23-11ee-80c9-df0943815276%3B.COMEGMXJ34KFMZ7U&ppt=pp&ppn=pp&ssid=tgm13n4brk0000001702618381650&otracker=pp_reco_Similar%2BProducts_3_37.productCard.PMU_HORIZONTAL_iball%2BIntel%2BAtom%2BQuad%2BCore%2BZ3735F%2B-%2B%25282%2BGB%252F32%2BGB%2BEMMC%2BStorage%252FWindows%2B10%2BHome%2529%2BCompBook%2BExcelance%2BLaptop_COMEGMXJ34KFMZ7U_productRecommendation%2Fsimilar_2&otracker1=pp_reco_PINNED_productRecommendation%2Fsimilar_Similar%2BProducts_GRID_productCard_cc_3_NA_view-all&cid=COMEGMXJ34KFMZ7U"] 
        } 
    
        var options = { 
            method: 'POST', 
            uri: 'http://127.0.0.1:5500/array', 
            body: data, 
            json: true
        }; 
    
        var sendrequest = await request(options) 
    
            .then(function (parsedBody) { 
                // console.log(parsedBody);
                let result; 
                result = parsedBody['result']; 
    
    proimage1 = parsedBody.GEM.img1;
    proimage2 = parsedBody.GEM.img3;
    proimage3 = parsedBody.GEM.img4;
    proname = parsedBody.GEM.name;
    promodel = parsedBody.GEM.model;
    brand = parsedBody.GEM.brand; 
    prostock = parsedBody.GEM.in_stock;
    prominqty = parsedBody.GEM.minimum_quantity;
    pro_id = parsedBody.GEM.product_id;
    proorigin = parsedBody.GEM.origin;
    proprice = parsedBody.GEM.price;
    pro_pricefor = parsedBody.GEM.pricefor;
    pro_sellertype = parsedBody.GEM.sellertype;
    pro_sellervari = parsedBody.GEM.verificationstatus;
    prorating = parsedBody.GEM.rating;
    sellerlink = parsedBody.GEM.sellerslink;
    proprocessordesc = parsedBody.GEM.Processor_Description;
    proprocessorgen = parsedBody.GEM.Processor_Generation; 
    prographictype = parsedBody.GEM.Graphics_Type;
    prographicdesc = parsedBody.GEM.Graphic_Card_Description;
    prooperatingsys = parsedBody.GEM.Operating_System__Factory_Pre_Loaded_;
    proramtype = parsedBody.GEM.Type_of_RAM;
    proramsize = parsedBody.GEM.RAM_Size__GB_;
    proramspeed = parsedBody.GEM.RAM_Speed__MHz_;
    prohddsize = parsedBody.GEM.Total_HDD_Capacity__GB_; 
    prossdsize = parsedBody.GEM.Capacity_of_each_SSD__GB_;
    prodisplay = parsedBody.GEM.Display_Size__Inch_;
    prodisplayreso = parsedBody.GEM.Display_Resolution__Pixels_;
    prowarranty = parsedBody.GEM.On_Site_OEM_Warranty__Year__OEM__Authorised_channel_partner_shall_note_that_W_G_to_be_fulfilled_by_OEM_at_site_ ;
    
    // console.log( proimage1, proimage2, proimage3, proname, promodel, brand, prostock, prominqty, pro_id, proorigin, proprice, pro_pricefor, pro_sellertype, pro_sellervari, prorating, sellerlink)
            }) 
            .catch(function (err) { 
                console.log(err); 
            }); 
    } 


app.post("/product1", function(req, res){
    finallink = linkarr[0];
    arraysum();
    res.redirect("/product_details");
});



app.post("/product2", function(req, res){
    finallink = linkarr[1];
    arraysum();
    res.redirect("/product_details");
});
app.post("/product3", function(req, res){
    finallink = linkarr[2];
    arraysum();
    res.redirect("/product_details");
});
app.post("/product4", function(req, res){
    finallink = linkarr[3];
    arraysum();
    res.redirect("/product_details");
});
app.post("/product5", function(req, res){
    finallink = linkarr[4];
    arraysum();
    res.redirect("/product_details");
});
app.post("/product6", function(req, res){
    finallink = linkarr[5];
    arraysum();
    res.redirect("/product_details");
});
app.post("/gemvisit", function(req, res){
    res.redirect(finallink);
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
                linkarr.push(matchingProducts[i].link);
                // console.log(matchingProducts.length);
                // console.log(cardS[0]);
                };
                
            }else if (matchingProducts.length >= 6 ){
                for(var i = 0; i <= 5; i++ ){
                    cardS.push(matchingProducts[i]);
                    linkarr.push(matchingProducts[i].link);
                    };
            }
            // console.log(matchingProducts[0]);



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
