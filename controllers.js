'use strict';

app.controller('postController', ['$http', '$scope', function($http, $scope) {

  $scope.message = 'I work';
  var vm = this;

  $http.get('posts.json').then(function(response) {
    vm.posts = response.data;
    console.log(vm.posts);
  });

  $scope.upVote = function(postId) {

    vm.posts[postId - 1].votes++;
  };

  $scope.downVote = function(postId) {

    vm.posts[postId - 1].votes--;
  };

  $scope.submit = function(title, author, image, description) {

    vm.posts.push({
      "id": vm.posts.length + 1,
      "title": title,
      "author": author,
      "image": image,
      "description": description,
      "date": new Date(),
      "votes": 0,
      "comments": []
    });

    $scope.createPost = null;
    $scope.createPost.title = "";
    $scope.createPost.$setUntouched();
    $scope.createPost.$setPristine();
  };

  $scope.addComment =  function(author, content, postId) {

    vm.posts[postId - 1].comments.push({
      'author': author,
      'content': content,
      'date': new Date()
    });
  };
}]);
