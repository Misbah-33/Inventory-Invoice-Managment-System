/* =====================================================

INVENTORY & INVOICE MANAGEMENT SYSTEM

Author: Misbah kanwal & Javeria Bibi

Technology:
HTML
CSS
JavaScript
Local Storage

===================================================== */

/* =====================================================
PRODUCT DATABASE
===================================================== */

let products =
JSON.parse(
localStorage.getItem("products")
) || [];

/* =====================================================
CUSTOMER DATABASE
===================================================== */

let customers =
JSON.parse(
localStorage.getItem("customers")
) || [];

let invoices =
JSON.parse(
localStorage.getItem("invoices")
) || [];

let sales =
JSON.parse(
localStorage.getItem("sales")
) || [];

/* =====================================================
NAVIGATION SYSTEM
===================================================== */

function showSection(sectionId){

document
.querySelectorAll(".section")
.forEach(section=>{

section.classList.add("hidden");

});

document
.getElementById(sectionId)
.classList.remove("hidden");

}

/* =====================================================
PRODUCT MANAGEMENT
===================================================== */

function saveProduct(){

let product = {

name:
document.getElementById(
"productName"
).value,

price:
document.getElementById(
"productPrice"
).value,

currency:
document.getElementById(
"productCurrency"
).value

};

if(product.name === ""){
alert("Please enter product name");
return;
}

products.push(product);

localStorage.setItem(
"products",
JSON.stringify(products)
);

renderProducts();

updateDashboard();

document.getElementById(
"productName"
).value = "";

document.getElementById(
"productPrice"
).value = "";

}

function renderProducts(){

let table =
document.getElementById(
"productTable"
);

if(!table) return;

table.innerHTML = "";

products.forEach(
(product,index)=>{

table.innerHTML += `

<tr>

<td>${product.name}</td>

<td>${product.price}</td>

<td>${product.currency}</td>

<td>

<button
onclick="deleteProduct(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteProduct(index){

products.splice(index,1);

localStorage.setItem(
"products",
JSON.stringify(products)
);

renderProducts();

updateDashboard();

}

/* =====================================================
CUSTOMER MANAGEMENT
===================================================== */

function saveCustomer(){

let customer = {

name:
document.getElementById(
"customerName"
).value,

phone:
document.getElementById(
"customerPhone"
).value,

email:
document.getElementById(
"customerEmail"
).value,

country:
document.getElementById(
"customerCountry"
).value

};

if(customer.name === ""){
alert("Please enter customer name");
return;
}

customers.push(customer);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

renderCustomers();

updateDashboard();

loadCustomerDropdown();

document.getElementById(
"customerName"
).value = "";

document.getElementById(
"customerPhone"
).value = "";

document.getElementById(
"customerEmail"
).value = "";

document.getElementById(
"customerCountry"
).value = "";

document.getElementById(
"customerName"
).value = "";

document.getElementById(
"customerPhone"
).value = "";

document.getElementById(
"customerEmail"
).value = "";

document.getElementById(
"customerCountry"
).value = "";

}

function renderCustomers(){

let table =
document.getElementById(
"customerTable"
);

if(!table) return;

table.innerHTML = "";

customers.forEach(
(customer,index)=>{

table.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.phone}</td>

<td>${customer.email}</td>

<td>${customer.country}</td>

<td>

<button
onclick="deleteCustomer(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteCustomer(index){

customers.splice(index,1);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

renderCustomers();

updateDashboard();

}

/* =====================================================
DASHBOARD
===================================================== */

function updateDashboard(){

let productElement =
document.getElementById(
"totalProducts"
);

let customerElement =
document.getElementById(
"totalCustomers"
);

let invoiceElement =
document.getElementById(
"totalInvoices"
);

let revenueElement =
document.getElementById(
"totalRevenue"
);

let profitElement =
document.getElementById(
"totalProfit"
);

let totalRevenue = 0;
let totalProfit = 0;
let paidAmount = 0;
let pendingAmount = 0;

sales.forEach(sale=>{

let revenue =
Number(sale.qty) *
Number(sale.sell);

let profit =
(
Number(sale.sell) -
Number(sale.cost)
)
*
Number(sale.qty);

totalRevenue += revenue;

totalProfit += profit;

if(sale.status === "Paid"){

paidAmount += revenue;

}
else{

pendingAmount += revenue;

}

});

if(productElement){
productElement.innerText =
products.length;
}

if(customerElement){
customerElement.innerText =
customers.length;
}

if(invoiceElement){
invoiceElement.innerText =
sales.length;
}

if(revenueElement){
revenueElement.innerText =
"USD " + totalRevenue.toFixed(2);
}

if(profitElement){
profitElement.innerText =
"USD " + totalProfit.toFixed(2);
}
let paidElement =
document.getElementById(
"paidAmount"
);

let pendingElement =
document.getElementById(
"pendingAmount"
);

if(paidElement){
paidElement.innerText =
"USD " + paidAmount.toFixed(2);
}

if(pendingElement){
pendingElement.innerText =
"USD " + pendingAmount.toFixed(2);
}
}

function generateInvoiceNumber(){

let nextNumber =
invoices.length + 1001;

return "INV-" + nextNumber;

}

function loadCustomerDropdown(){

let dropdown =
document.getElementById(
"invoiceCustomer"
);

if(!dropdown) return;

dropdown.innerHTML =
'<option value="">Select Customer</option>';

customers.forEach(customer=>{

dropdown.innerHTML +=

`<option value="${customer.name}">
${customer.name}
</option>`;

});

}

function addInvoiceRow(){

let tableBody =
document.getElementById(
"invoiceTableBody"
);

let productOptions = "";

products.forEach(product=>{

productOptions +=

`<option value="${product.name}">
${product.name}
</option>`;

});

let row =

`

<tr>

<td>

<select class="invoiceProduct">

<option value="">
Select Product
</option>

${productOptions}

</select>

</td>

<td>

<input
type="number"
class="invoiceQty"
value="1"
oninput="calculateInvoice()">

</td>

<td>

<input
type="number"
class="invoiceCost"
value="0"
oninput="calculateInvoice()">

</td>

<td>

<input
type="number"
class="invoiceSell"
value="0"
oninput="calculateInvoice()">

</td>

<td class="rowTotal">
0
</td>

<td>

<button
onclick="this.parentElement.parentElement.remove();calculateInvoice();">

Delete

</button>

</td>

</tr>

`;

tableBody.innerHTML += row;

calculateInvoice();

}

function calculateInvoice(){

let qtyInputs =
document.querySelectorAll(
".invoiceQty"
);

let costInputs =
document.querySelectorAll(
".invoiceCost"
);

let sellInputs =
document.querySelectorAll(
".invoiceSell"
);

let totals =
document.querySelectorAll(
".rowTotal"
);

let revenue = 0;

let profit = 0;

for(let i=0;i<qtyInputs.length;i++){

let qty =
Number(qtyInputs[i].value);

let cost =
Number(costInputs[i].value);

let sell =
Number(sellInputs[i].value);

let rowRevenue =
qty * sell;

let rowProfit =
qty * (sell - cost);

totals[i].innerText =
rowRevenue.toFixed(2);

revenue += rowRevenue;

profit += rowProfit;

}

document.getElementById(
"invoiceRevenue"
).innerText =
revenue.toFixed(2);

document.getElementById(
"invoiceProfit"
).innerText =
profit.toFixed(2);

}

function saveInvoice(){

let invoice = {

invoiceNumber:
document.getElementById(
"invoiceNumber"
).value,

invoiceDate:
document.getElementById(
"invoiceDate"
).value,

customer:
document.getElementById(
"invoiceCustomer"
).value,

revenue:
Number(
document.getElementById(
"invoiceRevenue"
).innerText
),

profit:
Number(
document.getElementById(
"invoiceProfit"
).innerText
),

status:
"Pending"


};
if(invoice.customer === ""){
alert("Please select customer");
return;
}

if(invoice.revenue <= 0){
alert("Please add products first");
return;
}


invoices.push(invoice);

localStorage.setItem(
"invoices",
JSON.stringify(invoices)
);

renderInvoices();

updateDashboard();


alert(
"Invoice Saved Successfully"
);

}

function renderInvoices(){

let table =
document.getElementById(
"invoiceHistoryTable"
);

if(!table) return;

table.innerHTML = "";

invoices.forEach(
(invoice,index)=>{

table.innerHTML += `

<tr>

<td>${invoice.invoiceNumber}</td>

<td>${invoice.invoiceDate}</td>

<td>${invoice.customer}</td>

<td>${invoice.revenue}</td>

<td>${invoice.profit}</td>

<td>${invoice.status}</td>

<td>

<button
onclick="markPaid(${index})">

${invoice.status === "Paid"
? "Mark Pending"
: "Mark Paid"}

</button>

<button
onclick="deleteInvoice(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function markPaid(index){

if(invoices[index].status === "Paid"){

invoices[index].status =
"Pending";

}
else{

invoices[index].status =
"Paid";

}

localStorage.setItem(
"invoices",
JSON.stringify(invoices)
);

renderInvoices();

updateDashboard();

}

function deleteInvoice(index){

invoices.splice(index,1);

localStorage.setItem(
"invoices",
JSON.stringify(invoices)
);

renderInvoices();

updateDashboard();

}

function loadReportCustomers(){

let dropdown =
document.getElementById(
"reportCustomer"
);

if(!dropdown) return;

dropdown.innerHTML =
'<option value="">All Customers</option>';

customers.forEach(customer=>{

dropdown.innerHTML += `

<option value="${customer.name}">

${customer.name}

</option>

`;

});

}

function generateReport(){

let customerFilter =
document.getElementById(
"reportCustomer"
).value;

let statusFilter =
document.getElementById(
"reportStatus"
).value;

let fromDate =
document.getElementById(
"reportFromDate"
).value;

let toDate =
document.getElementById(
"reportToDate"
).value;

let reportTable =
document.getElementById(
"reportTable"
);

reportTable.innerHTML = "";

let totalRevenue = 0;
let totalProfit = 0;
let totalInvoices = 0;

sales.forEach(sale=>{

let customerMatch =
customerFilter === ""
||
sale.customer === customerFilter;

let statusMatch = true;

let dateMatch = true;

if(fromDate){
dateMatch =
sale.date >= fromDate;
}

if(toDate){
dateMatch =
dateMatch &&
sale.date <= toDate;
}

if(
customerMatch &&
statusMatch &&
dateMatch
){

let revenue =
Number(sale.qty) *
Number(sale.sell);

let profit =
(
Number(sale.sell) -
Number(sale.cost)
)
*
Number(sale.qty);

totalInvoices++;

totalRevenue += revenue;

totalProfit += profit;

reportTable.innerHTML += `

<tr>

<td>SALE</td>

<td>${sale.date}</td>

<td>${sale.customer}</td>

<td>${revenue}</td>

<td>${profit}</td>

<td>-</td>

</tr>

`;

}

});


document.getElementById(
"reportInvoices"
).innerText =
totalInvoices;

document.getElementById(
"reportRevenue"
).innerText =
totalRevenue.toFixed(2);

document.getElementById(
"reportProfit"
).innerText =
totalProfit.toFixed(2);

}

function downloadReportPDF(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

doc.setFontSize(18);

doc.text(
"Sales Report",
20,
20
);

doc.setFontSize(12);

doc.text(
"Total Invoices: " +
document.getElementById(
"reportInvoices"
).innerText,
20,
40
);

doc.text(
"Revenue:  " +
document.getElementById(
"reportRevenue"
).innerText,
20,
50
);

doc.text(
"Profit:  " +
document.getElementById(
"reportProfit"
).innerText,
20,
60
);

y += 15;

doc.text(
"Generated By Inventory & Invoice Management System",
20,
y
);

doc.save(
"Sales_Report.pdf"
);

}

function loadSalesCustomers(){

let dropdown =
document.getElementById(
"saleCustomer"
);

if(!dropdown) return;

dropdown.innerHTML =
'<option value="">Select Customer</option>';

customers.forEach(customer=>{

dropdown.innerHTML +=

`<option value="${customer.name}">
${customer.name}
</option>`;

});

}

function loadSalesProducts(){

let dropdown =
document.getElementById(
"saleProduct"
);

if(!dropdown) return;

dropdown.innerHTML =
'<option value="">Select Product</option>';

products.forEach(product=>{

dropdown.innerHTML +=

`<option value="${product.name}">
${product.name}
</option>`;

});

}



function loadProductCost(){

let productName =
document.getElementById(
"saleProduct"
).value;

let product =
products.find(
p => p.name === productName
);

if(product){

document.getElementById(
"saleCost"
).value =
product.price;

}

}
function saveSale(){
    let selectedProduct =
products.find(
p => p.name ===
document.getElementById(
"saleProduct"
).value
);

let sale = {

date:
document.getElementById(
"saleDate"
).value,

customer:
document.getElementById(
"saleCustomer"
).value,

product:
document.getElementById(
"saleProduct"
).value,

qty:
Number(
document.getElementById(
"saleQty"
).value
),

cost:
Number(
document.getElementById(
"saleCost"
).value
),

sell:
Number(
document.getElementById(
"saleSell"
).value
),

currency:
selectedProduct.currency,

status:
document.getElementById(
"saleStatus"
).value,
};

sale.profit =
(sale.sell - sale.cost)
* sale.qty;

sales.push(sale);

localStorage.setItem(
"sales",
JSON.stringify(sales)
);

renderSales();

alert(
"Sale Saved Successfully"
);

}

function renderSales(){

let table =
document.getElementById(
"salesTable"
);

if(!table) return;

table.innerHTML = "";

sales.forEach((sale,index)=>{

table.innerHTML += `

<tr>

<td>${sale.date}</td>
<td>${sale.customer}</td>
<td>${sale.product}</td>
<td>${sale.qty}</td>
<td>${sale.cost}</td>
<td>${sale.sell}</td>
<td>${sale.profit}</td>
<td>${sale.status}</td>

<td>

<button onclick="deleteSale(${index})">
Delete
</button>

</td>

</tr>

`;

});

}
function deleteSale(index){

if(
!confirm(
"Delete this sale?"
)
){
return;
}

sales.splice(index,1);

localStorage.setItem(
"sales",
JSON.stringify(sales)
);

renderSales();

updateDashboard();

}

function loadInvoiceCustomers(){

let dropdown =
document.getElementById(
"invoiceCustomerFilter"
);

if(!dropdown) return;

dropdown.innerHTML =
'<option value="">Select Customer</option>';

customers.forEach(customer=>{

dropdown.innerHTML +=

`<option value="${customer.name}">
${customer.name}
</option>`;

});

}

function generateCustomerInvoice(){

let customer =
document.getElementById(
"invoiceCustomerFilter"
).value;

let fromDate =
document.getElementById(
"invoiceFromDate"
).value;

let toDate =
document.getElementById(
"invoiceToDate"
).value;

let table =
document.getElementById(
"invoiceDetailsTable"
);

table.innerHTML = "";
let totalUSD = 0;
let totalGBP = 0;
let totalPKR = 0;
let totalEUR = 0;
let total = 0;

let totalQty = 0;

let serial = 1;

let selectedCustomer =
customers.find(
c => c.name === customer
);

if(selectedCustomer){

document.getElementById(
"invoiceCustomerName"
).innerText =
selectedCustomer.name;

document.getElementById(
"invoiceCustomerPhone"
).innerText =
selectedCustomer.phone;

document.getElementById(
"invoiceCustomerEmail"
).innerText =
selectedCustomer.email;

}

let filteredSales =
sales.filter(sale =>

sale.customer === customer &&

sale.date >= fromDate &&

sale.date <= toDate

);

filteredSales.forEach(sale=>{

let rowTotal =
sale.qty * sale.sell;

total += rowTotal;

if(sale.currency === "USD"){
totalUSD += rowTotal;
}

if(sale.currency === "GBP"){
totalGBP += rowTotal;
}

if(sale.currency === "PKR"){
totalPKR += rowTotal;
}

if(sale.currency === "EUR"){
totalEUR += rowTotal;
}

total += rowTotal;

totalQty += Number(
sale.qty
);

table.innerHTML += `
<tr>
<td>${serial++}</td>
<td>${sale.product}</td>
<td>${sale.qty}</td>
<td>${sale.currency}</td>
<td>${sale.sell}</td>
<td>${rowTotal}</td>
</tr>
`;

});

document.getElementById(
"invoiceGrandTotal"
).innerHTML =

"USD: $" + totalUSD.toFixed(2) + "<br>" +

"GBP: £" + totalGBP.toFixed(2) + "<br>" +

"PKR: Rs " + totalPKR.toFixed(2) + "<br>" +

"EUR: €" + totalEUR.toFixed(2);

document.getElementById(
"invoiceTotalQty"
).innerText =
totalQty;

document.getElementById(
"invoicePeriodFrom"
).innerText =
fromDate;

document.getElementById(
"invoicePeriodTo"
).innerText =
toDate;

document.getElementById(
"invoiceGeneratedDate"
).innerText =
new Date().toLocaleDateString();

document.getElementById(
"invoiceNumberDisplay"
).innerText =
"INV-" + Date.now();

let customerSales =
sales.filter(
sale =>
sale.customer === customer
);

if(customerSales.length > 0){

document.getElementById(
"invoicePaymentStatus"
).innerText =

customerSales[
customerSales.length - 1
].status;

}

let statusElement =
document.getElementById(
"invoicePaymentStatus"
);

if(customerSales.length > 0){

if(
customerSales[
customerSales.length - 1
].status === "Paid"
){

statusElement.style.color =
"green";

}
else{

statusElement.style.color =
"red";

}

}
else{

statusElement.innerText =
"No Sales";

statusElement.style.color =
"black";

}

}

function downloadInvoicePDF(){

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

let customer =
document.getElementById(
"invoiceCustomerName"
).innerText;

let phone =
document.getElementById(
"invoiceCustomerPhone"
).innerText;

let email =
document.getElementById(
"invoiceCustomerEmail"
).innerText;

let total =
document.getElementById(
"invoiceGrandTotal"
).innerText;

let status =
document.getElementById(
"invoicePaymentStatus"
).innerText;

let fromDate =
document.getElementById(
"invoiceFromDate"
).value;

let toDate =
document.getElementById(
"invoiceToDate"
).value;

/* BLUE HEADER */

doc.setFillColor(
18,
52,
120
);

doc.rect(
0,
0,
210,
25,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.setFontSize(18);

doc.text(
"INVENTORY & INVOICE MANAGEMENT SYSTEM",
15,
16
);

doc.setTextColor(
0,
0,
0
);

/* TITLE */

doc.setFontSize(16);

doc.text(
"SALES INVOICE",
15,
40
);

/* DATE RANGE */

doc.setFontSize(11);

doc.text(
"Period: " +
fromDate +
" to " +
toDate,
15,
48
);

/* CUSTOMER BOX */

doc.setFillColor(
240,
240,
240
);

doc.rect(
15,
55,
180,
35,
"F"
);

doc.text(
"Customer Name: " + customer,
20,
65
);

doc.text(
"Phone: " + phone,
20,
75
);

doc.text(
"Email: " + email,
20,
85
);

/* TABLE HEADER */

let y = 105;

doc.setFillColor(
18,
52,
120
);

doc.rect(
15,
y-6,
180,
10,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.text(
"Product",
20,
y
);

doc.text(
"Qty",
110,
y
);

doc.text(
"Price",
140,
y
);

doc.text(
"Total",
170,
y
);

doc.setTextColor(
0,
0,
0
);

y += 10;

/* PRODUCTS */

let rows =
document.querySelectorAll(
"#invoiceDetailsTable tr"
);

rows.forEach(row=>{

let cells =
row.querySelectorAll("td");

if(cells.length >= 5){

doc.text(
cells[1].innerText,
20,
y
);

doc.text(
cells[2].innerText,
110,
y
);

doc.text(
cells[3].innerText,
140,
y
);

doc.text(
cells[4].innerText,
170,
y
);

doc.line(
15,
y+3,
195,
y+3
);

y += 10;

}

});

/* SUMMARY */

y += 10;

doc.setFillColor(
240,
240,
240
);

doc.rect(
15,
y-5,
180,
25,
"F"
);

doc.text(
"Grand Total: " + total,
20,
y+5
);

doc.text(
"Payment Status: " + status,
20,
y+15
);

/* FOOTER */

doc.setFontSize(10);

doc.text(
"Generated by Inventory & Invoice Management System",
15,
285
);

let fileName =

customer +

"_" +

fromDate +

"_to_" +

toDate +

".pdf";

doc.save(
fileName
);

}

function downloadReportPDF(){

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

let fromDate =
document.getElementById(
"reportFromDate"
).value;

let toDate =
document.getElementById(
"reportToDate"
).value;

let customer =
document.getElementById(
"reportCustomer"
).value || "All Customers";

let totalInvoices =
document.getElementById(
"reportInvoices"
).innerText;

let totalRevenue =
document.getElementById(
"reportRevenue"
).innerText;

let totalProfit =
document.getElementById(
"reportProfit"
).innerText;


/* HEADER */

doc.setFillColor(
19,
55,
125
);

doc.rect(
0,
0,
210,
28,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.setFontSize(18);

doc.text(
"INVENTORY & INVOICE MANAGEMENT SYSTEM",
14,
17
);

doc.setTextColor(
0,
0,
0
);


/* TITLE */

doc.setFontSize(20);

doc.text(
"SALES REPORT",
14,
42
);

doc.setFontSize(11);

doc.text(
"Period: " +
fromDate +
" to " +
toDate,
14,
52
);

doc.text(
"Customer: " +
customer,
14,
60
);


/* SUMMARY BOX */

doc.setFillColor(
245,
245,
245
);

doc.rect(
14,
70,
180,
35,
"F"
);

doc.text(
"Total Orders: " +
totalInvoices,
20,
82
);

doc.text(
"Revenue:  " +
totalRevenue,
20,
92
);

doc.text(
"Profit:  " +
totalProfit,
20,
102
);


/* TABLE HEADER */

let y = 120;

doc.setFillColor(
19,
55,
125
);

doc.rect(
14,
y,
180,
10,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.text(
"Type",
18,
127
);

doc.text(
"Date",
45,
127
);

doc.text(
"Customer",
80,
127
);

doc.text(
"Revenue",
130,
127
);

doc.text(
"Profit",
160,
127
);

doc.setTextColor(
0,
0,
0
);

y += 15;


/* TABLE DATA */

let rows =
document.querySelectorAll(
"#reportTable tr"
);

rows.forEach(row=>{

let cells =
row.querySelectorAll("td");

if(cells.length >= 5){

doc.text(
cells[0].innerText,
18,
y
);

doc.text(
cells[1].innerText,
45,
y
);

doc.text(
cells[2].innerText,
80,
y
);

doc.text(
cells[3].innerText,
130,
y
);

doc.text(
cells[4].innerText,
160,
y
);

y += 10;

}

});


/* FOOTER */

y += 10;

doc.setDrawColor(
19,
55,
125
);

doc.line(
14,
y,
194,
y
);

y += 10;

doc.text(
"Generated: " +
new Date().toLocaleDateString(),
14,
y
);


/* SAVE FILE */

let fileName =

"Sales_Report_" +

fromDate +

"_to_" +

toDate +

".pdf";

doc.save(
fileName
);

}

/* =====================================================
INITIAL LOAD
===================================================== */

renderProducts();

renderCustomers();

renderInvoices();

updateDashboard();

loadCustomerDropdown();

console.log("Customers Array:", customers);
loadSalesCustomers();
loadReportCustomers();
loadInvoiceCustomers();

console.log("Report Dropdown:",
document.getElementById("reportCustomer"));

console.log("Sales Dropdown:",
document.getElementById("saleCustomer"));

loadReportCustomers();

loadSalesCustomers();

loadSalesProducts();

loadInvoiceCustomers();


renderSales();
