
var activePills = function () {
    $('.nav li a').click(function() {

        $('.nav li').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
    });
};

(function() {
	document.getElementsByClassName('status-1').title = 'in process';
	document.getElementsByClassName('status-2').title = 'complete';
})();