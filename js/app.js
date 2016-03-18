angular.module('movieApp', [
	'ngRoute',
	'movieApp.services',
	'movieApp.controllers'
])

.config(['$routeProvider', function ($routeProvider) {
	
	$routeProvider.when('/filme', {
		templateUrl: 'html/filme.html',
		controller: 'FilmeController'
	})

	$routeProvider.when('/filme/:id', {
		templateUrl: 'html/filme_edit.html',
		controller: 'FilmeController'
	})

	.when('/genero', {
		templateUrl: 'html/genero.html',
		controller: 'GeneroController'
	})

	.when('/genero/:id', {
		templateUrl: 'html/genero_edit.html',
		controller: 'GeneroController'
	})

	.when('/classificacao', {
		templateUrl: 'html/classificacao.html',
		controller: 'ClassificacaoController'
	})

	.when('/classificacao/:id', {
		templateUrl: 'html/classificacao_edit.html',
		controller: 'ClassificacaoController'
	})

	.otherwise({ redirectTo: '/filme' });
}])
