$(function () {
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
        devcount--;
        $('#myModal1').modal('toggle');
    });

    //localStorage.setItem('myStorage', JSON.stringify(obj));
});
