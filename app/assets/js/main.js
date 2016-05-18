(function ($) {
	"use strict";

    jQuery(document).ready(function($){


        $(".embed-responsive iframe").addClass("embed-responsive-item");
        $(".carousel-inner .item:first-child").addClass("active");
        
        $('[data-toggle="tooltip"]').tooltip();
        
        /* Fixed at top menu */
        $(".subbar_area").sticky({
            topSpacing:0
        });
        
        


        /* Select All Checkbox */
        $("#selectall").change(function () {
            $(".grey-checkbox input:checkbox").prop('checked', $(this).prop("checked"));
        });
        
        
        /* Changes color in select fields */
        $('#shop-category').css('color','#aaaaaa');
           $('#shop-category').change(function() {
              var current = $('#shop-category').val();
              if (current != 'null') {
                  $('#shop-category').css('color','#263b50');
              } else {
                  $('#shop-category').css('color','#aaaaaa');
              }
           });

        $('#shop-type').css('color','#aaaaaa');
           $('#shop-type').change(function() {
              var current = $('#shop-type').val();
              if (current != 'null') {
                  $('#shop-type').css('color','#263b50');
              } else {
                  $('#shop-type').css('color','#aaaaaa');
              }
           });

        
        
        

    });


    jQuery(window).load(function(){
        

        /* List table sort columns */
        $('.sortable').on('click', function (e) {
            e.preventDefault();
            $(this).toggle2classes("down", "up");
        });

        $.fn.toggle2classes = function(class1, class2){
            if( !class1 || !class2 )
                return this;

            return this.each(function(){
                var $elm = $(this);

                if( $elm.hasClass(class1) || $elm.hasClass(class2) )
                    $elm.toggleClass(class1 +' '+ class2);

                else
                    $elm.addClass(class1);
            });
        }; 
        
        
        
        /* Svg Color Changes */    
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    });


}(jQuery));	