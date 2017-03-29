//第一个页面的额控制器
angular.module('guidePage.controller',[])

.controller('GuidePageCtrl',function ($scope,$state) {

  // 引导页slide初始化
  var guideSlide = new Swiper('#guideSlide', {
    //分页符
    pagination: '.swiper-pagination',
    onSlideChangeEnd: function (swiper) {
      var index = guideSlide.activeIndex + 1;
      if (index == 2 || index == 3) {
        var item = $("#tips-" + index);
        if (item.hasClass("hidden")) {
          item.removeClass("hidden");
          item.addClass("guide-show");
        }
      }
    }
  });

  // 给开始体验按钮加点击事件

  $scope.goHome = function () {
    $state.go('tab.home')
  }
  // document.getElementById("close").addEventListener('click', function(event) {
  //   localStorage["isFirst"]=false;
  //   $state.go("home");
  // }, false);
});
