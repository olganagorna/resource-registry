(function () {
	'use strict';

	angular
		.module('restApp')
    	.controller('communityAddCtrl', communityAddCtrl);

    communityAddCtrl.$inject = ['$scope', '$http', '$routeParams'];
  	function communityAddCtrl($scope, $http, $routeParams) {
  		var  comAdd = this;

	  	comAdd.addCommunity = function() {
	  		var dataMain = {
		        com_name: comAdd.community.name,
		        com_num: comAdd.community.num,
		        com_adds: comAdd.community.additions
	    	};
	      	(function() {
		        var post = $http.post('rest.php/communities/addcomm', JSON.stringify(dataMain))
		        	.then(successHandler)
		        	.catch(errorHandler);
		        function successHandler(result) {
		        	alert('Ви успішно додали нову громаду');
		        	window.location = "/resource/community";
		        }
		        function errorHandler(result){
		        	if(result.data.message.includes('13 characters')){
                        alert('введіть у форматі 123:45:67:890');
                    } else alert(result.data.message);	
	        	}
	    	})();
	    }
  	}
})();