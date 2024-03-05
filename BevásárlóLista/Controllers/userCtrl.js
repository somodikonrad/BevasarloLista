app.controller('userCtrl', function($scope, ngNotify, $rootScope, $location){
    $scope.user = {};

    $scope.registration = function(){
        if ($scope.user.name == null || $scope.user.email == null || $scope.user.password == null || $scope.user.confirm == null){
            ngNotify.set('Nem adtál meg minden adatot!', 'error');
        }else{
            if ($scope.user.password != $scope.user.confirm){
                ngNotify.set('A megadott jelszavak nem egyeznek!', 'error');
            }else{
                let data = {
                    table: 'users',
                    email: $scope.user.email,
                    name: $scope.user.name,
                    password:  CryptoJS.SHA1($scope.user.password).toString()
                }

                axios.post($rootScope.serverUrl + '/db/registration', data).then(res => {
                    ngNotify.set(res.data[0].msg, 'error');
                });
            }
        }
    }

    $scope.login = function(){
        if ( $scope.user.email == null || $scope.user.password == null){
            ngNotify.set('Nem adtál meg minden adatot!', 'error');
        }else{
            let data = {
                table: 'users',
                email: $scope.user.email,
                password: CryptoJS.SHA1($scope.user.password).toString()
            }

            axios.post($rootScope.serverUrl + '/db/login', data).then(res => {
                if (res.data[0].token == ""){
                    ngNotify.set('Hibás belépési adatok!', 'error');
                }else{
                    sessionStorage.setItem(JSON.stringify(res.data[0]));
                    $rootScope.isLoggedIn = true;
                    ngNotify.set('Sikeres belépés!', 'success');
                    $location.path('/list');
                } 
            });
        }
    }

    $scope.logout = function(){
        sessionStorage.removeItem('OrarendApp');
        $rootScope.isLoggedIn = false;
    }
});