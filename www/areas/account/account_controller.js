
angular.module('account.controller', [])
  .controller('AccountCtrl', ['$scope', '$state','$ionicActionSheet','$cordovaCamera','$ionicPlatform','$ionicPopup',
    function ($scope, $state,$ionicActionSheet,$cordovaCamera,$ionicPlatform,$ionicPopup) {

    $scope.$on('$ionicView.enter', function (e) {
    });

    if(localStorage["touxiang"]){
      var image = document.getElementById('touxiang');
      image.src = "data:image/jpeg;base64," + localStorage["touxiang"];
    }

    // 选择上传方式
    $scope.func_showAction=function(){
      var hideSheet = $ionicActionSheet.show({
        titleText: "<b>上传方式</b>",
        buttons: [
          { text: "拍照" },
          { text: "从手机相册选择" }
        ],
        buttonClicked: function(index) {
          switch (index){
            case 0:$scope.func_uploadByCamera();
              break;
            case 1:$scope.func_uploadByPhoto();
              break;
            default:
              break;
          }
          return true;
        },
        cancelText: "取消",
        cancel: function() {
          //hideSheet();
          hideSheet.hide();
        }
        //destructiveText: "删除",
        //destructiveButtonClicked:function(){
        //}
      });

    }

    // 照相机
    $scope.func_uploadByCamera=function(){
      var options = {
        //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
        quality: 100,                                            //相片质量0-100
        destinationType: Camera.DestinationType.DATA_URL,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
        sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        allowEdit: true,                                        //在选择之前允许修改截图
        targetWidth: 100,                                        //照片宽度
        targetHeight: 100,
        encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1//照片高度
        mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
        cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true                                   //保存进手机相册
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('touxiang');
        image.src = "data:image/jpeg;base64," + imageData;
        localStorage["touxiang"]=imageData;
      }, function(err) {
        // error
        //CommonJs.AlertPopup(err.message);
      });
    };

    // 手机相册
    $scope.func_uploadByPhoto=function(){
      var options = {
        //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
        quality: 100,                                            //相片质量0-100
        destinationType: Camera.DestinationType.DATA_URL,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        allowEdit: true,                                        //在选择之前允许修改截图
        targetWidth: 100,                                        //照片宽度
        targetHeight: 100,
        encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1//照片高度
        mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
        cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true                                   //保存进手机相册
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('touxiang');
        image.src = "data:image/jpeg;base64," + imageData;
        localStorage["touxiang"]=imageData;
      }, function(err) {
        // error
        //CommonJs.AlertPopup(err.message);
      });
    };

      // 打电话
    $scope.callPhone=function(number){
        $window.location.href="tel:"+number;
      };


      $scope.func_exitApp=function(){
        var confirmPopup = $ionicPopup.confirm({
          title: '提示',
          template: '确认退出?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            ionic.Platform.exitApp();
          } else {

          }
        });
      }

  }]);
