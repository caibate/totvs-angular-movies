angular.module('movieApp.controllers', [])

.controller('MenuController', ['$scope', '$location', 'ApiService', 'AuthService', function ($scope, $location, ApiService, AuthService) {
	$scope.isActive = function(rota){
		return $location.path().startsWith(rota);
	}

	$scope.login = function(){
		ApiService.authUsuario($scope.auth).success(function(retorno){
			if(retorno.Error.HasError)
				alert(retorno.Error.Message);
			else{
				$scope.user = retorno.UserData;
				AuthService.login($scope.user);
			}
		})
	}

	$scope.logout = function(){
		AuthService.logout();
		$scope.user = null;
		$scope.auth = {};
	}

	$scope.isLogged = function(){
		return AuthService.isLogged();
	}

	$scope.initLogin = function(){
		var u = AuthService.getUser();
		$scope.user = u;
	}
}])


.controller('FilmeController', ['$scope', 'ApiService', '$routeParams', '$rootScope', '$location', 'AuthService', function ($scope, ApiService, $routeParams, $rootScope, $location, AuthService) {
	$scope.successMessage = '';
	$scope.errorMessage = '';

	ApiService.getGeneros().success(
		function(retorno){
			$scope.generos = retorno.Records;
		}
	);

	$scope.isLogged = function(){
		return AuthService.isLogged();
	}

	$scope.showFilmes = function(){
		if($rootScope.successMessage){
			$scope.successMessage = $rootScope.successMessage;
			$rootScope.successMessage = null;
			$('.alert-success').slideDown(1000, function(){
				setInterval(function(){
					$('.alert-success').fadeOut(1000)
				}, 2000);
			});
		}

		ApiService.getFilmes().success(
			function(retorno){
				$scope.filmes = retorno.Records;
			}
		);
	}

	$scope.showFilme = function(){
		if(!isNaN($routeParams.id))
			ApiService.getFilme($routeParams.id).success(function(retorno){
				$scope.filme = retorno.Record;
			})

		ApiService.getClassificacoes().success(function(retorno){
			$scope.classificacoes = retorno.Records;
		})	
	}

	$scope.editFilme = function(){
		if(!AuthService.isLogged())
			$location.path('/filme');
		
		$scope.showFilme();
	}

	$scope.save = function(){
		$scope.errorMessage = '';
		ApiService.saveFilme($scope.filme).success(function(retorno){
			if(retorno.Error.HasError)
				$scope.errorMessage = retorno.Error.Message;
			else {
				$rootScope.successMessage = 'Filme salvo com sucesso';
				$location.path('/filme');
			}
		}).error(function(a, b, c, d){
			$scope.errorMessage = d;
		})
	}

	$scope.delete = function(){
		ApiService.deleteFilme($scope.filme.Id).success(function(retorno){
			if(retorno.Error.HasError)
				$scope.errorMessage = retorno.Error.Message;
			else {
				$rootScope.successMessage = 'Filme excluido com sucesso';
				$location.path('/filme');
			}
		})
	}

}])

.controller('GeneroController', ['$scope', 'ApiService', '$routeParams', '$rootScope', '$location', 'AuthService', function ($scope, ApiService, $routeParams, $rootScope, $location, AuthService) {
	$scope.successMessage = '';
	$scope.errorMessage = '';

	if(!AuthService.isLogged())
		$location.path("/filme");

	$scope.showGeneros = function(){
		if($rootScope.successMessage){
			$scope.successMessage = $rootScope.successMessage;
			$rootScope.successMessage = null;
			$('.alert-success').slideDown(1000, function(){
				setInterval(function(){
					$('.alert-success').fadeOut(1000)
				}, 2000);
			});
		}
		
		ApiService.getGeneros().success(function(retorno){
			$scope.generos = retorno.Records;
		});
	}

	$scope.showGenero = function(){
		if(!isNaN($routeParams.id))
			ApiService.getGenero($routeParams.id).success(function(retorno){
				$scope.genero = retorno.Record;
			});
	}

	$scope.save = function(){
		ApiService.saveGenero($scope.genero).success(function(retorno){
			if(retorno.Error.HasError)
				$scope.errorMessage = retorno.Error.Message;
			else {
				$rootScope.successMessage = 'Genero salvo com sucesso';
				$location.path('/genero');
			}
		})
	}

}])

.controller('ClassificacaoController', ['$scope', 'ApiService', '$routeParams', '$rootScope', '$location', 'AuthService', function ($scope, ApiService, $routeParams, $rootScope, $location, AuthService) {
	$scope.successMessage = '';
	$scope.errorMessage = '';
	
	if(!AuthService.isLogged())
		$location.path("/filme");

	$scope.showClassificacoes = function(){
		if($rootScope.successMessage){
			$scope.successMessage = $rootScope.successMessage;
			$rootScope.successMessage = null;
			$('.alert-success').slideDown(1000, function(){
				setInterval(function(){
					$('.alert-success').fadeOut(1000)
				}, 2000);
			});
		}

		ApiService.getClassificacoes().success(function(retorno){
			$scope.classificacoes = retorno.Records;
		})		
	}

	$scope.showClassificacao = function(){
		if(!isNaN($routeParams.id))
			ApiService.getClassificacao($routeParams.id).success(function(retorno){
				$scope.classificacao = retorno.Record;
			});	
	}

	$scope.save = function(){
		ApiService.saveClassificacao($scope.classificacao).success(function(retorno){
			if(retorno.Error.HasError)
				$scope.errorMessage = retorno.Error.Message;
			else {
				$rootScope.successMessage = 'Classificacao salva com sucesso';
				$location.path('/classificacao');
			}
		})
	}
}])

.controller('UsuarioController', ['$scope', 'ApiService', '$routeParams', '$rootScope', '$location', 'AuthService', function ($scope, ApiService, $routeParams, $rootScope, $location, AuthService) {
	$scope.successMessage = '';
	$scope.errorMessage = '';

	if(!AuthService.isLogged())
		$location.path("/filme");

	$scope.showUsuarios = function(){
		if($rootScope.successMessage){
			$scope.successMessage = $rootScope.successMessage;
			$rootScope.successMessage = null;
			$('.alert-success').slideDown(1000, function(){
				setInterval(function(){
					$('.alert-success').fadeOut(1000)
				}, 2000);
			});
		}

		ApiService.getUsuarios().success(function(retorno){
			$scope.usuarios = retorno.Records;
		})
	}

	$scope.showUsuario = function(){
		if(!isNaN($routeParams.id))
			ApiService.getUsuario($routeParams.id).success(function(retorno){
				$scope.usuario = retorno.Record;
			})
	}

	$scope.save = function(){
		ApiService.saveUsuario($scope.usuario).success(function(retorno){
			if(retorno.Error.HasError)
				$scope.errorMessage = retorno.Error.Message;
			else {
				$rootScope.successMessage = 'Usuario salvo com sucesso';
				$location.path('/usuario');
			}
		})
	}

}])
