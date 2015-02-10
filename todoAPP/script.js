var spacePort = {
    fireBaseUrl : 'https://hccsport.firebaseio.com/ships/',
    shipArrays: [],
    shipToUpdate:{},
    getShips: function () {
        var that = this;
        var request = new XMLHttpRequest();

        request.open('GET',this.fireBaseUrl+'.json', false);

        request.onload = function () {
            if (this.status >= "200" && this.status < "400") {

                var data = JSON.parse(this.response);
                for (s in data) {
                    var ship = data[s];
                    ship.id = s;
                    console.log(ship);
                    that.shipArrays.push(ship);
                }
                console.log('Array : '+that.shipArrays);
            }
            else {

            }
            
            
            //document.getElementById('result').innerHTML = this.response;
        }

        request.send();

    },

    makeReady :function () {
        this.getShips();
        this.listShip();
    },
    remove: function (index) {
        
        this.shipArrays.splice(index, 1);
    }

}

spacePort.Create = function (name, type, image) {
    this.name = name;
    this.type = type;
    this.image = image;
    
}

spacePort.Land = function () {
    var shipName = $('#newShipName');
    var shipType = $('#newShipType');
    var shipImg = $('#newShipImg');

    var newShip =new this.Create(shipName.val(), shipType.val(), shipImg.val());
    this.sendToFB(newShip);
  
    this.shipArrays.push(newShip);

    shipName.val(''); shipType.val(''); shipImg.val('');
    //console.log(newShip);
    this.listShip();
}

spacePort.listShip = function () {
    $('#spaceList').empty();
    console.log('ships : ' + this.shipArrays.length);
    for (var i = 0 ; i < this.shipArrays.length; i++) {
     
        var ship = this.shipArrays[i];
        console.log('ship -> ' + ship);
        h = '<div  class="col-md-4"><div class="thumbnail"> ';
        h += '<img width="200" height="225"';
        h+= 'src="'+ship.image+'"/>';
        h+=' <div class="caption"><h3>';
        h+=ship.name+'</h3><p>'+ship.type+'</p>';
        h += ' <p><button onclick="spacePort.updateShip(' + i + ')" class="btn btn-primary" href="#">Update</button>';
        h+='<button onclick="spacePort.deleteShip('+i+')"';
        if (ship.type === 'Type 2') {
            h+=' disabled class="btn btn-warning">Delete</button></p>';   
        } else {
            h += 'class="btn btn-warning">Delete</button></p>';
        }
       
        h += '</div></div></div>';
        $('#spaceList').append(h);
    }

   
    
                        
}

spacePort.updateShip = function (index) {
    var ship = this.shipArrays[index];
    $('#updatePanel').modal('hide');
    var shipName = $('#updateShipName');
    var shipType = $('#updateShipType');
    var shipImg = $('#updateShipImg');
    var indexToUpdate = $('#indexToUpdate');
    $('#updateSelectedImg').attr('src', shipImg.val());
    indexToUpdate.val(index);
    shipName.val(ship.name);
    shipImg.val(ship.image);
   
}


spacePort.saveShip = function () {
    var indexToUpdate = $('#indexToUpdate').val();

    var ship = this.shipArrays[indexToUpdate];

    var shipName = $('#updateShipName');
    var shipType = $('#updateShipType');
    var shipImg = $('#updateShipImg');
    var indexToUpdate = $('#indexToUpdate');
    ship.name = shipName.val();
    ship.type = shipType.val();
    ship.image = shipImg.val();
    this.shipToUpdate = ship;
    this.updateOnFB();
    
    $('#updatePanel').modal('hide');
}

spacePort.deleteShip = function (index) {
    var a = confirm('are you sure to delete?');
    if (a) {

        this.removeFromFB(index);
    }
}

spacePort.sendToFB = function (ship) {
    var request = new XMLHttpRequest();

    request.open('POST', this.fireBaseUrl + '.json', false);
    
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {
           
        } else {
            alert('Error');
        }
    }

    request.send(JSON.stringify(ship));
}

spacePort.updateOnFB = function () {
    var request = new XMLHttpRequest();
    var ship = this.shipToUpdate;
    request.open('PUT', this.fireBaseUrl + '/' + ship.id + '.json', false);

    request.onload = function () {
        if (this.status == "200") {
            spacePort.listShip();
         
        } else {
            alert('something went wrong!');
        }
    }

    request.send(JSON.stringify(ship));
}

spacePort.removeFromFB = function (index) {
    var request = new XMLHttpRequest();
    var ship = this.shipArrays[index];
    request.open('DELETE',this.fireBaseUrl+'/'+ship.id+'.json', false);

    request.onload = function () {

        if (this.status == "200") {
            spacePort.remove(index);
            spacePort.listShip();
        } else {
            alert('something went wrong!');
        }
    }
    request.send();
}

//if (this.status >= "200" && this.status < "400") {
//    var data = JSON.parse(this.response)
//    newMEssage.id = data.name
//}

////delete
//if (this.status == "204" && !this.response) {
//    var url = 'ssss/' + id + '.json';
//}