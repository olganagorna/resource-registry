$scope.currentPage = PaginationService.currentPage;
$scope.getPages = function(pageCount) {
    return PaginationService.getPages(pageCount);
};
$scope.switchPage = function(index){
    if($scope.request){
        PaginationService.switchPage(index, constant.usersQuery + '/search?' + buildQuery($scope.request)+ '&')
            .then(function(data){
                $scope.list_users = data.data;
                $scope.currentPage = PaginationService.currentPage;
        });
    }else {
        PaginationService.switchPage(index, constant.usersQuery + '?')
            .then(function(data){
                $scope.list_users = data.data;
                $scope.currentPage = PaginationService.currentPage;
        });
    }
};
$scope.switchPage($scope.currentPage);
$scope.setPage = function(pageLink, pageType){
    PaginationService.setPage(pageLink, pageType, $scope.list_users._meta.pageCount)
        .then(function(data){
            $scope.list_users = data.data;
            $scope.currentPage = PaginationService.currentPage;
    });
};