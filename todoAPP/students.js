
var studentsApp = {
    studentsArray: [],
    fireBaseUrl: "https://hccsport.firebaseio.com/students/"
};

studentsApp.getStudent = function () {
    var that = this;
 
    var request = new XMLHttpRequest();

    request.open('GET', this.fireBaseUrl + '.json', true);
    
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {

            var data = JSON.parse(this.response);
            for (s in data) {
                var student = data[s];
                student.id = s;
               // console.log(student);
                that.studentsArray.push(student);
            }
            $('#informationBox').hide(500);
            that.listStudent();
        }
        else {
           // alert('Something bad happen');
            $('#informationBox').show();
            $('#informationBox').removeClass('alert-info').addClass('alert-danger');
            $('#informationBox').html("<h2>Something went wrong! here is the response : </h2> <p>" + this.response + '</p>');
          
        }
    }

    request.onerror = function () {
        //alert('Something bad happen');
        $('#informationBox').show();
        $('#informationBox').removeClass('alert-info').addClass('alert-danger');
        $('#informationBox').html("<h2>Something went wrong! here is the response : </h2> <p>" + this.response + '</p>');

    }

    request.send();
}

studentsApp.listStudent = function () {
    var list = this.studentsArray;
    for (s in list) {
        studentsApp.addRow(list[s]);
    }
}

studentsApp.addRow = function (student) {
    //console.log(student);
    var table = $('#tableBody tr:first');
    var row_id =student.id ? student.id : student.name+student.house;
    var r = '<tr id="'+row_id+'">';

    r += '<td>' + student.name + '</td>';
    r += '<td>' + student.house + '</td>';
    r += '<td>' + student.year + '</td>';
    r += '<td><button class="btn btn-info" onclick="studentsApp.edit('+student.id+')">Edit</button>'
    r += '<button class="btn btn-danger" onclick="studentsApp.delete(';
    var std_id = "'" + student.id + "'";
    row_id = "'" + row_id + "'";
    r += std_id+','+row_id+')">Del</button></td>';
    r += '</tr>';
    table.before(r);
}

studentsApp.Student = function (name,house,year) {
    this.name = name;
    this.house = house;
    this.year = year;
}

studentsApp.createStudent = function () {
    var name = $('#studentName');
    var house = $('#studentHouse');
    var year = $('#studentYear');
    var student =new  this.Student(name.val(), house.val(), year.val());
    name.val(''); house.val(''); year.val('');
    this.addStudentToFB(student);
}
studentsApp.addStudentToFB = function (student) {

    var that = this;
    var request = new XMLHttpRequest();
    //console.log(student);
    request.open('POST', this.fireBaseUrl + '.json', true);
    
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {
            that.addRow(student);
            $('#studentAddEdit').slideUp(500);

            $('#informationBox').show();
            $('#informationBox').removeClass('alert-danger').addClass('alert-succes');

            $('#informationBox').html('<h2>I just add a new student! : ' +student.name + '</h2>');
            
        }
        else {

        }
    }
    request.onerror = function () {

    }
    
        request.send(JSON.stringify(student));
       

}
studentsApp.delete = function (id, rowId) {
    $('#informationBox').show();
    $('#informationBox').html('<h2>I am deleting a student! with id : ' +id + '</h2>');
    $('#informationBox').removeClass('alert-info').addClass('alert-warning');
    
    var student = {}
   
    for(s in this.studentsArray){
        if (this.studentsArray[s].id == id) {
            student = student[s];
         
        }
    }
    //console.log(student);


    var request = new XMLHttpRequest();

    request.open('DELETE', this.fireBaseUrl + id+'.json', true);

    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {

          
            $('#informationBox').show();
            $('#informationBox').html('<h2>I just deleted a student! with id : ' + id + '</h2>');
            $('#informationBox').removeClass('alert-warning').addClass('alert-danger');
            
            $('#' + rowId).remove();
        }
        else {
            // alert('Something bad happen');
            $('#informationBox').show();
            $('#informationBox').removeClass('alert-info').addClass('alert-danger');
            $('#informationBox').html("<h2>Something went wrong! here is the response : </h2> <p>" + this.response + '</p>');

        }
    }

    request.onerror = function () {
        //alert('Something bad happen');
        $('#informationBox').show();
        $('#informationBox').removeClass('alert-info').addClass('alert-danger');
        $('#informationBox').html("<h2>Something went wrong! here is the response : </h2> <p>" + this.response + '</p>');

    }

    request.send();
}