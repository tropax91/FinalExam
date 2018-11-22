var occupantName = "";
var occupantId;
var occupantRole;
var occupantbuildingId;
var occupantusername = "";
var occupantpassword = "";


function Beboer (name, id, role, buildingnr, username, password){
    this.occupantName = name;
    this.occupantId = id;
    this.occupantRole = role;
    this.occupantbuildingId = buildingnr;
    this.occupantusername = username;
    this.occupantpassword = password;
}

