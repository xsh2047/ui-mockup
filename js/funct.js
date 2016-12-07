$(function () {
    //For Login
    $("#request-change").click(function(){
        email = $("#email-reset").val();
        $("#myModal .modal-body").html("<h2>Password reset has been sent to <b>" + email + "</b></h2>");
        $("#request-change").remove();
    });


    $("#login-btn").click(function(){
        email = $('#login-email').val();
        pass = $('#login-pass').val();
        if( email === 'admin@admin.com' && pass === 'adminpass'){
            window.location.replace("index.html");
        }else {
            $('header').append('<div class="alert alert-warning alert-dismissible"> \
                                      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> \
                                      <strong>Error!</strong> Incorrect Username or Password. \
                                    </div>');

        }
    });
    //For Device
    var devcount = 6;

    $( "#add-device" ).click(function() {
        devcount++;
        name = $('input#device-name').val();
        latitude = $('select#sel1').val();
        longitude = $('select#sel2').val();

        style = 'style=" top:' + latitude + 'em; left:' + longitude + 'em;"';
        device = '<div class="device dev' + devcount + '" data-toggle="tooltip" data-placement="top" title="' + name + '"' + style + ' > <a href="report.html"><span class="glyphicon glyphicon-map-marker"></span></a></div>';
        $('#map').append(device);
        $('.dev' + devcount).tooltip('show');
        $('#myModal').modal('toggle');
    });

    $( "#edit-btn" ).click(function() {
        var s = $("<select id=\"selectDevice\" name=\"device\" class=\"form-control\" style=\"margin-bottom : 1em;\"/>");
        for(var i = 1; i <= devcount; i++) {
            name = $('.dev' + i)[0].attributes[4].value;
            //Do a check for the name
            $("<option />", {value: 'dev' + i, text: name}).appendTo(s);
        }
        $('#selectDevice').remove();
        $('#myModal1 div.modal-body').prepend(s);
    });

    $( "#edit-device" ).click(function() {
        rm = $('#selectDevice').val();
        $('.' + rm).remove();
        name = $('input#device-name1').val();
        latitude = $('select#sel3').val();
        longitude = $('select#sel4').val();

        style = 'style=" top:' + latitude + 'em; left:' + longitude + 'em;"';
        device = '<div class="device dev' + devcount + '" data-toggle="tooltip" data-placement="top" title="' + name + '"' + style + ' > <a href="report.html"><span class="glyphicon glyphicon-map-marker"></span></a></div>';
        $('#map').append(device);
        $('.dev' + devcount).tooltip('show');
        $('#myModal1').modal('toggle');
    });

    $( "#remove-device" ).click(function() {
        rm = $('#selectDevice').val();
        $('.' + rm).remove();
        $('#myModal1').modal('toggle');
    });

    //For Rentals
    var rownum = 3;
    $('#rental-add').click(function() {
        rownum++;
        description = $('input#desc-rental').val();
        loc = $('input#loc-rental').val();
        cost = $('input#cost-rental').val();
        date = $('input#date-rental').val();
        date = date.replaceAll('-', '/');
        row = "<tr> <th scope='row'>" + rownum + "</th> <td>" + description + "</td> <td>"+ loc +"</td> <td>$"+ cost +"</td> <td>" + date + "</td> </tr>"
        $('table tbody').append(row);
        $('#myModal').modal('toggle');
    });

    $('#edit-rentals').click(function() {
        rentals = $('table tbody tr');
        var s = $("<select id=\"selectRental\" name=\"rental\" class=\"form-control\" style=\"margin-bottom : 1em;\"/>");
        rentals.each(function(index){
            $("<option />", {value: index + 1, text: $(this).children().first().text()}).appendTo(s);
        });
        $('#selectRental').remove();
        $('#myModal1 div.modal-body').prepend(s);
    });

    $('#save-rental').click(function() {
        selection = $('#selectRental').val();
        rental = $('table tbody tr:nth-child(' + selection + ')');
        rental.children().not(':first').remove();
        description = $('input#desc-rental1').val();
        loc = $('input#loc-rental1').val();
        cost = $('input#cost-rental1').val();
        date = $('input#date-rental1').val();
        date = date.replaceAll('-', '/');
        row = "<td>" + description + "</td> <td>"+ loc +"</td> <td>$"+ cost +"</td> <td>" + date + "</td>"
        rental.append(row);
        $('#myModal1').modal('toggle');
    });

    $('#remove-rental').click(function() {
        selection = $('#selectRental').val();
        $('table tbody tr:nth-child(' + selection + ')').remove();
        $('#myModal1').modal('toggle');
    });

    //For Crops
    col = 1;
    var cropSel;
    $('#add-crop').click(function() {
        col_sel = col % 2;
        name = $('input#name-crop').val();
        content = $('input#content-crop').val();
        price = $('input#price-crop').val();

        crop = ' \
        <div class="card horizontal"> \
          <div class="card-image">  \
            <img class="crop-img" src="img/crop.png"> \
          </div> \
          <div class="card-stacked"> \
            <div class="card-content"> \
                <h3 class="crop-cost">$'+ price +'</h3> \
                <h1>'+ name +'</h1> \
                <p>'+ content +'</p> \
            </div> \
            <div class="card-action"> \
              <a href="#" data-toggle="modal" data-target="#myModal3" class="edit-crop">Edit</a> \
            </div> \
          </div> \
        </div>'

        if(col_sel == 1){
            $('#col1').append(crop);
        }else{
            $('#col2').append(crop);
        }
        $('.edit-crop').click(function() {
            cropSel = $(this).parents().eq(3);
        });
        col++;
        $('#myModal2').modal('toggle');
    });

    $('.content').on('click', '.edit-crop', function(){
        cropSel = $(this).parents().eq(2);
    });

    $('#save-crop').click(function() {
        name = $('input#name-crop1').val();
        content = $('input#content-crop1').val();
        price = $('input#price-crop1').val();

        cropContent =' \
            <h3 class="crop-cost">$'+ price +'</h3> \
            <h1>'+ name +'</h1> \
            <p>'+ content +'</p> \
        '
        cropSel.children().children()[1].innerHTML = cropContent;
        $('#myModal3').modal('toggle');
    });

    $('#remove-crop').click(function() {
        cropSel.remove();
    });

    String.prototype.replaceAll = function(pattern, replacement) {
        return this.replace(new RegExp(pattern, "g"), replacement);
    };

    //localStorage.setItem('myStorage', JSON.stringify(obj));
});
