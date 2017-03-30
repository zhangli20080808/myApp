// 商品列表功能
angular.module('goodsList.controller', ['goodsList.service'])
  .controller('GoodsListCtrl', function ($scope, $window, GoodsListFty, $stateParams,$ionicLoading,$ionicHistory) {

    //
    // console.log($stateParams);//Object {typeNumber: "10001"}
    // console.log($stateParams.typeNumber);//10001


    console.log(1);
    var promise2 = GoodsListFty.testPromise();
    promise2.then(
      //成功的回调
      function (data) {
        console.log(2);
        return data;
        //  然后把我们的数据绑定到$scope上
      },
      //失败的回调
      function (reason) {
        console.log(3)
      }
    //  可以不用层层嵌套  我们return到后面
    ).then(function (data) {
      console.log(8)
    }).then(function () {
      console.log(9)
    })
    console.log(4);
    //在我们进入视图页面的时候，调用我们的刷新方法
    $scope.$on('$ionicView.beforeEnter', function (e) {
      $scope.func_refreshGoodsList();

    });

    // 商品列表数据  因为很多地方要用，我们抽取出来
    $scope.obj_goodsListData =[];
    $scope.pms_isMoreItemsAvailable=true;
    // 分页查询对象 保存一些分页信息和查询条件
    $scope.obj_pagingInfo = {
      amountMax: "",
      amountMin: "",
      billNum: "",
      createUser: "",
      dateFrom: "",
      dateTo: "",
      deptID: "",
      deptName: "",
      keyWord: "",
      loginName: "",
      billType: "",
      //第一页
      pageNum: 1,
      //每页10条
      pageSize: 10,
      //是否排序
      sortFlag: "0",
      //升序还是降序
      sortType: "desc",
      //分类到商品详细页面canshu  通过$stateParams传给我们的对象，变成文本字符穿，再传给我们的后台
      typeNumber:""
    };


    // 刷新获取最新的数据
    $scope.func_refreshGoodsList = function () {

      //根据商品编号 查询信息  传入分页信息中
      $scope.obj_pagingInfo.typeNumber = $stateParams.typeNumber;


      //我们需要把这些分页信息都传给后台 －－》message 变为字符串
      var message = JSON.stringify( $scope.obj_pagingInfo);
      console.log(message)

      var promise = GoodsListFty.refreshGoodsList(message);
      promise.then(
        //成功的回调
        function (data) {
          // console.log(data)
          $scope.obj_goodsListData = data;
          //  然后把我们的数据绑定到$scope上
        },
        //失败的回调
        function (reason) {
          console.log("这是失败的回调函数")
        }
      ).finally(function () {
        // 停止广播infiniteScroll
            $scope.$broadcast('scroll.refreshComplete');
            setTimeout(function(){
              $ionicLoading.hide();
            },5000)
      });


    };

    // 获取更多数据列表  上拉加载更多数据效果

    $scope.func_loadMoreGoodsList = function () {

      //增加分页信息
      $scope.obj_pagingInfo.pageNum ++;
      console.log($scope.obj_pagingInfo.pageNum);

      //根据商品编号 查询信息  传入分页信息中
      $scope.obj_pagingInfo.typeNumber = $stateParams.typeNumber;


      //我们需要把这些分页信息都传给后台 －－》message 变为字符串
       var message = JSON.stringify( $scope.obj_pagingInfo);
       // console.log(message);

      var promise = GoodsListFty.loadMoreGoodsList(message);
      promise.then(
        //成功的回调
        function (data) {
          console.log(data)
          //用jquery中的each方法对新数据进行遍历，将每一条数据添加到obj_goodsListData数组中
          $.each(data,function (index,item) {
            $scope.obj_goodsListData.push(item)
          });

          //  然后把我们的数据绑定到$scope上
        },
        //失败的回调
        function (reason) {
          console.log("这是失败的回调函数")
        }
      ).finally(function () {
        // 停止广播infiniteScroll
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };





    // 返回前一个页面
    $scope.goBack=function(){
      $ionicHistory.goBack();
    }

  })




