angular.module('search.controller', [])
  .controller('SearchCtrl', ['$scope', '$ionicHistory', '$state', '$ionicModal', function ($scope, $ionicHistory, $state, $ionicModal) {

    $scope.$on('$ionicView.enter', function (e) {

    });


    $scope.func_openModal = function (templeHtml) {

      // 筛选条件modal窗口
      $ionicModal.fromTemplateUrl(templeHtml, {
        scope: $scope,
        animation: "slide-in-up"
      }).then(function (modal) {
        modal.show();
        $scope.modal = modal;
      });


      $scope.closeModal = function () {
        $scope.modal.hide();
        $scope.modal.remove();
      };

      //当我们用到模型时，清除它！
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // 当隐藏的模型时执行动作
      $scope.$on('modal.hide', function () {
        // 执行动作
      });
      // 当移动模型时执行动作
      $scope.$on('modal.removed', function () {
        // 执行动作
      });

    };

    // 返回前一个页面
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  }]);
