$(function () {
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

    $().click(function() {

    });

    String.prototype.replaceAll = function(pattern, replacement) {
        return this.replace(new RegExp(pattern, "g"), replacement);
    };

    //localStorage.setItem('myStorage', JSON.stringify(obj));
});
