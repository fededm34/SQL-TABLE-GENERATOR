
clearResults()
let tableName;
let index = 0;
let fieldList = []
const tipiDiDatiMySQL = [
    'DECIMAL',
    'DOUBLE',
    'FLOAT',
    'VARCHAR',
    'CHAR',
    'INT',
    'TEXT',
    'DATE',
    'TIME',
    'DATETIME',
    'TIMESTAMP',
    'BOOLEAN',
];

const select = document.getElementById("fieldType");
for(let i=0;i< tipiDiDatiMySQL.length;i++){
    const opzione = document.createElement("option");
    opzione.value = i;
    opzione.text = tipiDiDatiMySQL[i];
    select.add(opzione);
}


function getTableName(){
    var name = document.getElementById("tableName").value;
    if(name==""){
        tableName = "Default"
        return;
    }
    var regex = /^[a-zA-Z][a-zA-Z0-9_]{0,63}$/;
    if(!regex.test(name)){
        swal("Errore nel nome del campo", "Ricorda che per essere valido il campo deve seguire queste regole:\n1. Massimo 64 caratteri\n2. Solo lettere numeri e underscore (_)\n3. Deve iniziare con una lettera");
    }else{
        tableName = name
    }
}

getTableName()

function setDimension(){
    if(document.getElementById("fieldType").value < 5 && document.getElementById("fieldType").value > 2){
        document.getElementById("dimension1").removeAttribute('disabled');
        document.getElementById("dimension2").setAttribute('disabled', '');
    }else if(document.getElementById("fieldType").value >= 5){
        document.getElementById("dimension1").setAttribute('disabled', '');
        document.getElementById("dimension2").setAttribute('disabled', '');
    }else{
        document.getElementById("dimension1").removeAttribute('disabled');
        document.getElementById("dimension2").removeAttribute('disabled');
    }
}

function getField(){
    let field = {
        fieldName: "",
        fieldType: 0,
        fieldLength: [],
        primaryKey: false,
        notNull: false,
        unique: false
    }
    //NOME CAMPO
    var nomeCampo = document.getElementById("fieldName");
    var regex = /^[a-zA-Z][a-zA-Z0-9_]{0,63}$/;
    if(!regex.test(nomeCampo.value)){
        swal("Errore nel nome del campo", "Ricorda che per essere valido il campo deve seguire queste regole:\n1. Massimo 64 caratteri\n2. Solo lettere numeri e underscore (_)\n3. Deve iniziare con una lettera");
        return
    }else{
        for(var i=0;i<fieldList.length;i++){
            if(fieldList[i].fieldName == nomeCampo.value){
                swal("Errore nel nome del campo", "Hai già dato questo nome ad un altro campo!");
                return
            }
        }
        field.fieldName = nomeCampo.value;
    }
    //TIPO
    var tipoCampo = document.getElementById("fieldType");
    field.fieldType = tipiDiDatiMySQL[tipoCampo.value];
    //LUNGHEZZA
    regex = /^[0-9]$/;
    if(tipoCampo.value < 5 && tipoCampo.value > 2){
        field.fieldLength[0] = document.getElementById("dimension1").value;
    }else if(tipoCampo.value <= 2){
        field.fieldLength[0] = document.getElementById("dimension1").value;
        field.fieldLength[1] = document.getElementById("dimension2").value;
    }
    //EXTRA
    if(document.getElementById("primaryKey").checked){
        for(var i=0;i<fieldList.length;i++){
            if(fieldList[i].primaryKey){
                swal("Errore", "Puoi impostare solo una chiave primaria!");
                return
            }
        }
        field.primaryKey = true;
        field.unique = false;
        if(document.getElementById("notNull").checked){
            field.notNull = true;
        }
        field.notNull = true;
        fieldList[fieldList.length] = field;
        return;
    }
    if(document.getElementById("unique").checked){
        field.unique = true;
    }
    if(document.getElementById("notNull").checked){
        field.notNull = true;
    }
    fieldList[fieldList.length] = field;
}

function printSQL(){
    let finalSQL = "";
    for(var i = 0;i<fieldList.length;i++){
        let nome = fieldList[i].fieldName;
        let tipo = fieldList[i].fieldType;
        let grandezza = (fieldList[i].fieldLength.length == 2 ? ("(" + fieldList[i].fieldLength[0].toString() + ","+fieldList[i].fieldLength[1].toString() + ")"): fieldList[i].fieldLength.length == 1 ?  "(" + fieldList[i].fieldLength[0]  + ")" : "");
        let extra = (fieldList[i].primaryKey ? " PRIMARY KEY" : "") + (fieldList[i].unique ? " UNIQUE" : "") + (fieldList[i].notNull ? " NOT NULL" : "");
        finalSQL += "\n" + nome + " " + tipo + grandezza + extra + (i!=fieldList.length-1?",":"");
    }
    document.getElementById("result").value = "CREATE TABLE " + tableName + " (" + finalSQL + "\n);";
}


function clearResults(){
    document.getElementById("result").value = "";
}


function download(){
    var sqlContent = document.getElementById("result").value;
    var blob = new Blob([sqlContent], { type: 'application/sql' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'table.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//FUNZIONE GENERA STRINGA
function generaStringa(lun) {
let stringa = '';
const caratteri = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

for (let i = 0; i < lun; i++) {
const indice = Math.floor(Math.random() * caratteri.length);
stringa += caratteri.charAt(indice);
}

return stringa;
}
//FUNZIONE GENERA NUMERO
function generaNumero(min, max, float = false) {
let numero;

if (float) {
numero = Math.random() * (max - min) + min;
} else {
numero = Math.floor(Math.random() * (max - min + 1)) + min;
}

return numero;
}
//FUNZIONE GENERA DATA
function generaData(passato) {
let data = new Date();

if (passato) {
data.setDate(data.getDate() - Math.floor(Math.random() * 365));
} else {
data.setDate(data.getDate() + Math.floor(Math.random() * 365));
}

return data;
}


function popola(){
	let table = getElementById("result").value;
	if(table==""){
		swal("Errore nella popolazione del campo", "Non hai ancora generato la tabella");
		return;
	}
	
	
}