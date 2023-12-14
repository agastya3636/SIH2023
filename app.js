const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var accname = "Sign Up";
var accicon = "fa-regular fa-user";
app.get("/", function(req, res){
    res.render("index", {accountname: accname, accounticon: accicon});
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
app.get("/pricing", function(req, res){
    res.render("product_details", {accountname: accname, accounticon: accicon});
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});




// // Function to read Excel file using Fetch API
// async function readExcelFile(filePath) {
//     try {
//         const response = await fetch(filePath);
//         const arrayBuffer = await response.arrayBuffer();
//         const data = new Uint8Array(arrayBuffer);
//         const workbook = XLSX.read(data, { type: 'array' });
//         return workbook;
//     } catch (error) {
//         throw error;
//     }
// }

// // Function to search for a product in the Excel file.
// document.querySelector('.search-form').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const searchTerm = document.querySelector('.searchbar').value.trim();

//     if (searchTerm) {
//         try {
//             const filePath = 'Book.xlsx';

//             const workbook = await readExcelFile(filePath);
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];

//             const productData = XLSX.utils.sheet_to_json(worksheet);
//             console.log('searchTerm:', searchTerm);
//             console.log(productData);
//             const matchingProducts = productData.filter((product) => {
//                 const productName = String(product["Product Name"]).toLowerCase();
//                 const searchTermLowerCase = searchTerm.toLowerCase();
//                 console.log('Product Name:', productName);
//                 return productName.includes(searchTermLowerCase);
//             });



//             console.log("Matching Products",matchingProducts )

//             // Generate cards for matching products
//             const productContainer = document.querySelector('.product-container');
//             productContainer.innerHTML = ''; // Clear previous results

//             matchingProducts.forEach((product) => {
//                 const card = createProductCard(product);
//                 productContainer.appendChild(card);
//             });

//             if (matchingProducts.length === 0) {
//                 productContainer.innerHTML = '<p>No matching products found.</p>';
//             }
//         } catch (error) {
//             console.error('Error reading Excel file:', error);
//         }
//     }
// });


// // Function to create a product card
// function createProductCard(product) {
//     const card = document.createElement('div');
//     card.classList.add('product-card');

//     // Create elements for displaying product information.
//     const productName = document.createElement('h3');
//     productName.textContent = product['Product Title'];

//     const gemPrice = document.createElement('p');
//     gemPrice.textContent = `Gem Price: ₹${product['Gem Price']}`;
    

//     const amazonPrice = document.createElement('p');
//     amazonPrice.textContent = `Amazon Price: ₹${product['Amazon Price']}`;
    
//     const flipkartPrice = document.createElement('p');
//     flipkartPrice.textContent = `Flipkart Price: ₹${product['Flipkart Price']}`;

//     const gemLink = document.createElement('a');
//     gemLink.textContent = 'View on GeM   ';
//     gemLink.href = product['Gem Link'];
//     gemLink.target = '_blank';

//     const amazonLink = document.createElement('a');
//     amazonLink.textContent = 'View on Amazon  ';
//     amazonLink.href = product['Amazon Link'];
//     amazonLink.target = '_blank';

//     const flipkartLink = document.createElement('a');
//     flipkartLink.textContent = 'View on flipkart';
//     flipkartLink.href = product['Flipkart Link'];
//     flipkartLink.target = '_blank';

//     const space1 = document.createElement('br');
//     const space2 = document.createElement('br');

//     const image=document.createElement('img');
//     image.src=""+product["Image link"];
//     image.style.width='90%';
//     image.style.height='50%';


//     // Add elements to the card.
//     card.appendChild(image);
//     card.appendChild(productName);
//     card.appendChild(gemPrice);

//     card.appendChild(amazonPrice);
//     card.appendChild(flipkartPrice);
//     card.appendChild(gemLink);
//     card.appendChild(space2);
//     card.appendChild(amazonLink);
//     card.appendChild(space1);
//     card.appendChild(flipkartLink);

//     // Apply styles to the card (you can customize this).
//     card.style.border = '1px solid #ccc';
//     card.style.padding = '10px';
//     card.style.margin = '10px';
//     card.style.width='400px';
//     card.style.borderRadius = '5px';

//     return card;
// }




// document.addEventListener('DOMContentLoaded', () => {
//     // Attach the form submission handler to the form
//     const searchForm = document.querySelector('.search-form');
//     searchForm.addEventListener('submit', handleFormSubmission);
// });

// async function handleFormSubmission(event) {
//     event.preventDefault(); // Prevent the default form submission behavior
//     const productName = document.querySelector('.searchbar').value;
//     if (productName.trim() !== '') {
//         try {
//             const url = `https://amazon23.p.rapidapi.com/product-search?query=${encodeURIComponent(productName)}&country=IN`;
//             const options = {
//                 method: 'GET',
//                 headers: {
//                     'X-RapidAPI-Key': '4e1b08f254mshbb257e3caab87f9p1bd9bcjsnaf520b2cad0b',
//                     'X-RapidAPI-Host': 'amazon23.p.rapidapi.com'
//                 }
//             };

//         //    const response = await fetch(url, options);
//             if (response.status === 404) {
//                 console.error('API endpoint not found');
//                 return null;
//             }
//             const result = await response.json(); // Parse the JSON response
//             console.log(result);
//             updatePriceDetails(result);

//         } catch (error) {
//             console.error(error);
//         }
//     }
// }


// function updatePriceDetails(responseData) {
//     const products = responseData.result; // Get the array of products from the response

//     if (products && Array.isArray(products)) {
//         products.forEach((product, index) => {
//             const buyBoxPrice = product.price.current_price;
//             const title = product.title;
//             const thumbnailUrl = product.thumbnail;
//             const productUrl = product.url;

//             // Create elements for displaying the product details
//             const card = document.createElement('div');
//             card.classList.add('amazon');

//             const img = document.createElement('img');
//             img.src = thumbnailUrl;
//             img.alt = title;

//             const titleElement = document.createElement('h3');
//             titleElement.textContent = title;

//             const priceElement = document.createElement('h3');
//             priceElement.textContent = `Price: ₹${buyBoxPrice}`;

//             // Create a link element for the product URL
//             const linkElement = document.createElement('a');
//             linkElement.href = productUrl;
//             linkElement.target = '_blank'; // Open link in a new tab
//             linkElement.textContent = 'View on Amazon';

//             // Append elements to the card
//             card.appendChild(img);
//             card.appendChild(titleElement);
//             card.appendChild(priceElement);
//             card.appendChild(linkElement);

//             // Append the card to the DOM
//             const row = document.querySelector('.row-result');
//             if (row) {
//                 row.appendChild(card);
//             }
//         });
//     }
// }
