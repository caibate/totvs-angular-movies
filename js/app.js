angular.module('movieApp', [
	'ngRoute',
	'ngCookies',
	'movieApp.services',
	'movieApp.controllers'
])

.config(['$routeProvider', function ($routeProvider) {
	
	$routeProvider.when('/filme', {
		templateUrl: 'html/filme.html',
		controller: 'FilmeController'
	})

	.when('/filme/:id', {
		templateUrl: 'html/filme_view.html',
		controller: 'FilmeController'
	})

	.when('/filme/edit/:id', {
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

	.when('/usuario', {
		templateUrl: 'html/usuario.html',
		controller: 'UsuarioController'
	})

	.when('/usuario/:id', {
		templateUrl: 'html/usuario_edit.html',
		controller: 'UsuarioController'
	})

	.otherwise({ redirectTo: '/filme' });
}])
