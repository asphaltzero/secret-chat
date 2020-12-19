let area_pubkey = document.getElementById('area_pubkey');
let area_privkey = document.getElementById('area_privkey');
let button_key = document.getElementById('button_key');
let pair;
let nonce = nacl.util.decodeBase64('bStzqdjxeJX/T05ar9w7r+3UA8ViBP6b');
function createNewKeys() {
    pair = nacl.box.keyPair();
    area_pubkey.value = nacl.util.encodeBase64(pair.publicKey);
    area_privkey.value = nacl.util.encodeBase64(pair.secretKey);
}
button_key.addEventListener('click', createNewKeys);

let server_adr = document.getElementById('server_adr');
let button_server_con = document.getElementById('server_con');
let button_server_dis = document.getElementById('server_dis');
let websock;
function connectToServer() {
    websock = new WebSocket('ws://' + server_adr.value);
    // WARN
    websock.onmessage = function(event) {
        console.log('input:', event);
        console.log('input2:', event.data);
        console.log(event.data);
        readData(event.data);
    };
}
websock = new WebSocket('ws://' + server_adr.value);
// WARN
websock.onmessage = function(event) {
    console.log(event.data);
    readData(event.data);
};
button_server_con.addEventListener('click', connectToServer);
class Contact {
    constructor() {
        this.name;
        this.pubkey;
    }
}
let active_contact = new Contact();
let msgs = document.getElementById('msgs');
let con_name = document.getElementById('con_name');
let con_pubkey = document.getElementById('con_pubkey');
let con_table = document.getElementById('con_table');
let button_con_add = document.getElementById('con_add');
button_con_add.addEventListener('click', addContact);
function addContact() {
    active_contact.name = con_name.value;
    active_contact.pubkey = nacl.util.decodeBase64(con_pubkey.value);
    console.log('active_contact_pubkey');
    console.log(active_contact.pubkey);
    var newRow = con_table.insertRow(1);
    var newCell1 = newRow.insertCell(0);
    var newText1 = document.createTextNode(con_name.value);
    newCell1.appendChild(newText1);
    var newCell2 = newRow.insertCell(1);
    var newText2 = document.createTextNode(con_pubkey.value);
    newCell2.appendChild(newText2);
}
let prev_data;
let dbl = false;
function readData(data) {
    if (dbl) {
        dbl = !dbl;
        return;
    }
    dbl = !dbl;
    if (prev_data === data) return;
    prev_data = data;
    console.log('readData');
    const fr = new FileReader();
    let edata;
    let udata;
    fr.readAsArrayBuffer(data);
    fr.onload = () => {
        console.log(fr.result);
        data = new Uint8Array(fr.result);
        console.log('+msg');
        console.log(data);
        console.log(nonce);
        console.log(active_contact.pubkey);
        console.log(pair.secretKey);
        edata = nacl.box.open(data, nonce, active_contact.pubkey, pair.secretKey);
        udata = nacl.util.encodeUTF8(edata);
        msgs.value +='[' + active_contact.name + '][' + new Date().toLocaleString() + ']:' + udata + '\n';
    }
}

let message_field = document.getElementById('msg_field');
let button_send = document.getElementById('btn_send');
button_send.addEventListener('click', sndMsg);
function sndMsg() {
    console.log('send');
    let bytestr = nacl.util.decodeUTF8(message_field.value);
    console.log(bytestr);
    let msgbox = nacl.box(bytestr, nonce, active_contact.pubkey, pair.secretKey);
    console.log(bytestr);
    console.log(msgbox);
    websock = new WebSocket('ws://' + server_adr.value);
    websock.onopen = () => websock.send(msgbox);
    //msgs.value += '[Я][' + new Date().toLocaleString() + ']:' + message_field.value + '\n';
    message_field.value = '';
}
