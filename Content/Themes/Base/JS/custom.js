$(document).ready(function () {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var $input = $(input);
            var reader = new FileReader();
            reader.onload = function (e) {
                if ($input.parent().find($("#previewHolder")).length != 0) {
                    $input.parent().find($("#previewHolder")).remove();
                }
                var height = $input.parent().find($(".img-height")).val();
                var width = $input.parent().find($(".img-width")).val();

                jQuery('<img/>', {
                    id: 'previewHolder',
                    src: e.target.result,
                    width: width,
                    height: height
                }).prependTo($input.parent());

                $('#previewHolder').show();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("input.image").change(function () {
        readURL(this);
    });


    $(".form-choice-selector").on("change", function (event) {
        var $this = $(this);
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        var containerId = $this.attr('id');
        var templateId = $("#template-id").val();

        if (valueSelected != "") {
            $("#container-" + containerId).html("Hämtar ");

            jQuery("<img/>", {
                class: "loader",
                src: "/Content/Themes/Base/Images/ajax-loader.gif"
            }).appendTo("#container-" + containerId);

            $.ajax({
                url: "/Home/MultipleInputForm/" + templateId + "/" + valueSelected + "/",				
                success: function (result) {
                    $("#container-" + containerId).html(result);
                    console.log(event);
                }
            });
        }
    });

    jQuery("input.date").datepicker({ dateFormat: 'yy-mm-dd' });

    jQuery.validator.addClassRules(".img", {
        accept: "jpe|jpg|jpeg|gif|png|bmp|ico|svg|svgz|tif|tiff|ai|drw|pct|psp|xcf|psd|raw"
    });

    jQuery.validator.addClassRules(".date", {
        date: true
    });

    jQuery.validator.addClassRules(".number", {
        number: true
    });

    jQuery.validator.addClassRules(".pdf", {
        accept: "pdf"
    });

    jQuery.validator.addClassRules(".required", {
        'selectName': { min: 1 }
    });

    $('#template-form').validate({
    });

});
