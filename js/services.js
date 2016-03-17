angular.module('movieApp.services', [])

.service('ApiService', ['$http', function ($http) {
	var urlBase = 'http://moviemanager.jfollmann.com/api/';

	this.getGeneros = function(){
		return $http.get(urlBase + 'Genero');
	}

	this.getGenero = function(id){
		return $http.get(urlBase + 'Genero/'+ id);
	}

	this.getFilmes =  function(){
		return $http.get(urlBase + 'Filme');
	}

	this.getClassificacoes = function(){
		return $http.get(urlBase + 'ClassificacaoIndicativa');
	}

	this.getClassificacao = function(id){
		return $http.get(urlBase + 'ClassificacaoIndicativa/'+ id);
	}
}])