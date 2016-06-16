(function () {

    angular.module('restApp')
        .factory('ActivePillsService', ActivePillsService);

        ActivePillsService.$inject = ['$scope'];
        function ActivePillsService ($scope) 
        {

			var activePills = function () 
			{
			    $('.nav li a').click(function() 
			    {

			        $('.nav li').removeClass('active');

			        var $parent = $(this).parent();
			        if (!$parent.hasClass('active')) 
			        {
			            $parent.addClass('active');
			        }
			    });
			};

			(function() 
			{	
				console.log($scope.currentUser.role);
				
				if ($scope.currentUser.role === 'admin' || $scope.currentUser.role === 'commissioner') 
				{
					$('.nav li').removeClass('active');
					$('.nav li.user-active').addClass('active');
				}
			})()
		}
})();