angular.module('movieApp.controllers', [])

.controller('MenuController', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function(rota){
		return $location.path().startsWith(rota);
	}
}])


.controller('FilmeController', ['$scope', 'ApiService', '$routeParams', '$rootScope', '$location', function ($scope, ApiService, $routeParams, $rootScope, $location) {
	$scope.successMessage = '';
	$scope.errorMessage = '';

	ApiService.getGeneros().success(
		function(retorno){
			$scope.generos = retorno.Records;
		}
	);

	$scope.showFilmes = function(){
		if($rootScope.successMessage){
			$scope.successMessage = $rootScope.successMessage;
			$rootScope.successMessage = null;
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

.controller('GeneroController', ['$scope', 'ApiService', '$routeParams', '$rootScope', '$location', function ($scope, ApiService, $routeParams, $rootScope, $location) {
	$scope.successMessage = '';
	$scope.errorMessage = '';

	$scope.showGeneros = function(){
		if($rootScope.successMessage){
			$scope.successMessage = $rootScope.successMessage;
			$rootScope.successMessage = null;
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

.controller('ClassificacaoController', ['$scope', 'ApiService', '$routeParams', '$rootScope', '$location', function ($scope, ApiService, $routeParams, $rootScope, $location) {
	$scope.successMessage = '';
	$scope.errorMessage = '';

	$scope.showClassificacoes = function(){
		if($rootScope.successMessage){
			$scope.successMessage = $rootScope.successMessage;
			$rootScope.successMessage = null;
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