app.controller('userCtrl', function($scope, $rootScope, $location, ngNotify){
    $scope.user = {};

    $scope.register = function(){
        if ($scope.user.name == null || $scope.user.email == null || $scope.user.passwd == null || $scope.user.confirm == null){
            ngNotify.set('Nem adtál meg minden adatot!!', 'error');
        }else{
            if ($scope.user.passwd != $scope.user.confirm){
                ngNotify.set('A megadott jelszavak nem egyeznek!', 'error');
            }else{
                if (!$scope.user.passwd.match($rootScope.passwdRegExp)){
                 ngNotify.set('A megadott jelszó nem megfelelő erősségű!', 'error');
                }else{
                    let data = {
                        email: $scope.user.email
                    }
                    axios.post($rootScope.serverUrl + '/db/emailcheck', data).then(res =>{
                        if (res.data.length > 0){
                            ngNotify.set('Ez az e-mail cím már regisztrálva van!', 'error');
                        }else{
                            data = {
                                name: $scope.user.name,
                                email: $scope.user.email,
                                passwd: CryptoJS.SHA1($scope.user.passwd).toString()
                            }
                            axios.post($rootScope.serverUrl + '/db/registration', data).then(res=>{
                                if(res.data.affectedRows == 1){
                                    ngNotify.set('Sikeres regisztráció!', 'success');
                                    $location.path('/login');
                                }else{
                                    ngNotify.set('Hiba történt a regisztráció során!', 'error');
                                }
                            });
                        }
                    });
                }
            }
        }
    }

    $scope.login = function(){
        if ($scope.user.email == null || $scope.user.passwd == null){
            ngNotify.set('Nem adtál meg minden adatot!!', 'error');
        }else{
            data = {
                email: $scope.user.email,
                passwd: CryptoJS.SHA1($scope.user.passwd).toString()
            }
            axios.post($rootScope.serverUrl + '/db/logincheck', data).then(res=>{
                if(res.data.token == ""){
                    ngNotify.set('Hibás belépési adatok!', 'error');
                }else{
                    sessionStorage.setItem('weatherApp', JSON.stringify(res.data.token));
                    ngNotify.set('Sikeres belépés', 'succes');
                    $rootScope.isLoggedIn = true;
                    $location.path('/newdata');
                }
            });
        }
    }
});