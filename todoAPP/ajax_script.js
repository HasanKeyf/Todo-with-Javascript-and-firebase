
var assigmentObj = {

};

assigmentObj.makeAjaxCall = function (callback,error) {

    var request = new XMLHttpRequest();

    request.open('GET', 'https://nicksmessages.firebaseio.com/.json', true);

    request.onload = function () {

        if (this.status >= "200" && this.status < "400") {

            if (callback && typeof (callback) == 'function') {
                callback(this.response);
            }

            else {
                assigmentObj.divWriter(this.response);
            }
        } else {
            if (error && typeof (error) == 'function') {
                error(this.response);
            } else {
                assigmentObj.divWriter(this.response);
            }
        }

   
    }

    request.onerror = function () {
        if (error && typeof (error) == 'function') {
            error(this.response);
        } else {
            assigmentObj.divWriter(this.response);
        }
    }

    request.send();
}

//assigmentObj.makeAjaxCall(function myfunction(result) {
//    alert(result);
//});

assigmentObj.divWriter = function (data) {
    var target = $('#targetDiv');
    target.text(data);
}

//assigmentObj.makeAjaxCall(assigmentObj.divWriter);

assigmentObj.makeAjaxCall(function myfunction(result) {
    assigmentObj.divWriter(result);
}, function (error) {
    console.log('Error occured! ');
    console.log(JSON.stringify(error));
});