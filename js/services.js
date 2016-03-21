angular.module('movieApp.services', [])

.service('ApiService', ['$http', function ($http) {
	var urlBase = 'http://moviemanager.jfollmann.com/api/';

	this.getGeneros = function(){
		return $http.get(urlBase + 'Genero');
	}

	this.getGenero = function(id){
		return $http.get(urlBase + 'Genero/'+ id);
	}

	this.saveGenero = function(genero){
		return $http.post(urlBase + 'Genero', genero);
	}

	this.getFilmes =  function(){
		return $http.get(urlBase + 'Filme');
	}

	this.getFilme =  function(id){
		return $http.get(urlBase + 'Filme/' + id);
	}

	this.saveFilme = function(filme){
		filme.ClassificacaoIndicativaId = filme.ClassificacaoIndicativa.Id;
		filme.GeneroId = filme.Genero.Id;
		console.log(filme);
		return $http.post(urlBase + 'Filme', filme);
	}

	this.deleteFilme = function(id){
		return $http.delete(urlBase + 'Filme/' + id)
	}

	this.getClassificacoes = function(){
		return $http.get(urlBase + 'ClassificacaoIndicativa');
	}

	this.getClassificacao = function(id){
		return $http.get(urlBase + 'ClassificacaoIndicativa/'+ id);
	}

	this.saveClassificacao = function(classificacao){
		return $http.post(urlBase + 'ClassificacaoIndicativa', classificacao);
	}

	this.getUsuarios = function(){
		return $http.get(urlBase + 'Usuario');
	}

	this.getUsuario = function(id){
		return $http.get(urlBase + 'Usuario/' + id);
	}

	this.saveUsuario = function(usuario){
		return $http.post(urlBase + 'Usuario', usuario);
	}

	this.authUsuario = function(auth){
		return $http.post(urlBase + 'Auth', auth);
	}
}])

.service('AuthService', ['$cookieStore', function ($cookieStore) {
	
	this.login = function(usuario){
		$cookieStore.put('movieApp.user', usuario);
	};

	this.logout = function(){
		$cookieStore.remove('movieApp.user');
	}

	this.isLogged = function(){
		var u = $cookieStore.get('movieApp.user');
		return (u) ? true : false;
	}

	this.getUser = function(){
		return $cookieStore.get('movieApp.user');
	}

}])







