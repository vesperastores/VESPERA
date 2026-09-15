const { jsPDF } = window.jspdf;

let labels = [];

function numberToWords(num){
num = parseInt(num)  0;

const ones=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const tens=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

if(num < 20) return ones[num];
if(num < 100) return tens[Math.floor(num/10)] + (num%10 ? " " + ones[num%10] : "");
if(num < 1000) return ones[Math.floor(num/100)] + " hundred" + (num%100 ? " " + numberToWords(num%100) : "");

return num.toString();
}

function addLabel(){

labels.push({
customer: document.getElementById("customerName").value  "Customer",
address: document.getElementById("address").value  "-",
pin: document.getElementById("pincode").value  "-",
phone: document.getElementById("phone").value  "-",
product: document.getElementById("product").value  "Product",
amount: document.getElementById("orderValue").value  "0",
serial: document.getElementById("serial").value  "DS1",
payment: document.querySelector('input[name="payment"]:checked')?.value  "COD"
});
  
document.getElementById("labelCount").innerText =
labels.length + " Labels Added";
  
alert(labels.length + " label added");

document.getElementById("customerName").value = "";
document.getElementById("address").value = "";
document.getElementById("pincode").value = "";
document.getElementById("phone").value = "";
document.getElementById("product").value = "";
document.getElementById("orderValue").value = "";
document.getElementById("serial").value = "";
document.getElementById("district").value = "";

}

function drawLabel(doc, ox, oy, data){

const s = 0.87;

function X(v){ return ox + v * s; }
function Y(v){ return oy + v * s; }
function FS(v){ doc.setFontSize(v * s); }

const amountWords = numberToWords(data.amount);

// BORDER
doc.setLineWidth(.4);
doc.rect(X(3),Y(3),94*s,162*s);

// PAYMENT BOX
doc.setFillColor(0);
doc.roundedRect(X(52),Y(8),40*s,8*s,1,1,"F");

doc.setTextColor(255);
FS(8);
doc.text(
data.payment === "COD" ? "CASH ON DELIVERY" : "PREPAID ORDER",
X(72),
Y(13),
{align:"center"}
);

// PRICE BOX
doc.setTextColor(0);
doc.roundedRect(X(52),Y(18),40*s,18*s,1,1);

doc.setFont("helvetica","bold");
FS(14);
doc.text(`INR ${data.amount}`,X(72),Y(28),{align:"center"});

FS(5);
doc.text(amountWords,X(72),Y(34),{align:"center"});

// ORDER ID
FS(8);
doc.text(`ORDER ID : ${data.serial}`,X(58),Y(40));

doc.line(X(3),Y(45),X(97),Y(45));

// SELLER / BUYER
doc.line(X(50),Y(45),X(50),Y(100));

doc.setFillColor(0);
doc.roundedRect(X(8),Y(50),28*s,7*s,1,1,"F");
doc.roundedRect(X(53),Y(50),25*s,7*s,1,1,"F");

doc.setTextColor(255);
FS(8);
doc.text("FROM (SELLER)",X(11),Y(55));
doc.text("TO (BUYER)",X(58),Y(55));

doc.setTextColor(0);

// SELLER
doc.setFont("helvetica","bold");
FS(14);
doc.text("SUFIYAN",X(8),Y(68));

doc.setFont("helvetica","normal");
FS(7);
doc.text([
"Anapparambil House",
"Arakkal HMC Road",
"Chalissery, Kerala - 679536"
],X(8),Y(77));

doc.setFont("helvetica","bold");
doc.text("PIN : 679536",X(8),Y(91));
doc.text("PH : +91 8281088967",X(8),Y(97));
doc.text("Customer id : 1265200969",X(8),Y(103));

// BUYER
doc.setFont("helvetica","bold");
FS(13);
doc.text(data.customer,X(53),Y(68));

doc.setFont("helvetica","bold");
FS(9);

let buyerLines = doc.splitTextToSize(data.address,28*s);
buyerLines = buyerLines.slice(0,4);

doc.text(buyerLines,X(53),Y(80));

doc.setFont("helvetica","bold");
FS(7);
doc.text(`PIN : ${data.pin}`,X(53),Y(95));
doc.text(`PH : ${data.phone}`,X(53),Y(101));

// PRODUCT HEADER
doc.setFillColor(0);
doc.rect(X(3),Y(105),94*s,9*s,"F");

doc.setTextColor(255);
FS(8);
doc.text("PRODUCT / ITEM",X(8),Y(111));
doc.text("QTY",X(70),Y(111));
doc.text("AMOUNT",X(80),Y(111));

// PRODUCT
doc.setTextColor(0);
FS(10);
doc.text(data.product,X(8),Y(123));
doc.text("1",X(72),Y(123));
doc.text(`INR ${data.amount}`,X(92),Y(123),{align:"right"});

doc.line(X(8),Y(127),X(92),Y(127));

// TOTAL
FS(13);
doc.text("ORDER TOTAL",X(8),Y(138));

FS(16);
doc.text(`INR ${data.am
