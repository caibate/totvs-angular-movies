angular.module('movieApp.controllers', [])

.controller('MenuController', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function(rota){
		return rota == $location.path();
	}
}])


.controller('FilmeController', ['$scope', 'ApiService', function ($scope, ApiService) {

	ApiService.getFilmes().success(
		function(retorno){
			$scope.filmes = retorno.Records;
		}
	);

	ApiService.getGeneros().success(
		function(retorno){
			$scope.generos = retorno.Records;
		}
	);
}])

.controller('GeneroController', ['$scope', 'ApiService', '$routeParams', function ($scope, ApiService, $routeParams) {
	
	$scope.showGeneros = function(){
		ApiService.getGeneros().success(function(retorno){
			console.log('Called getGeneros');
			$scope.generos = retorno.Records;
		});
	}

	$scope.showGenero = function(){
		ApiService.getGenero($routeParams.id).success(function(retorno){
			$scope.genero = retorno.Records[0];
		});
	}
}])

.controller('ClassificacaoController', ['$scope', 'ApiService', function ($scope, ApiService) {
	ApiService.getClassificacoes().success(function(retorno){
		$scope.classificacoes = retorno.Records;
	})
}])

.controller('ClassificacaoEditController', ['$scope', 'ApiService', '$routeParams', function ($scope, ApiService, $routeParams) {
	ApiService.getClassificacao($routeParams.id).success(function(retorno){
		$scope.classificacao = retorno.Records[0];
	});
}])
