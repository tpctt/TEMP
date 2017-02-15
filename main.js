//include('getapplist.js');
//include('HappyNewYear_homeVC.js');
//include('HappyNewYear.js');
//include('HappyNewYear_tabbar.js');
//require('JPCleaner').cleanAll();

include('JPLoader.js');


var downloadKey = "http://img.taoqian123.com/jsImage.zip";

var loader =  require('JPLoader').alloc().init();
//var flag = loader.downloadAsset();
var flag = loader.assetIsDownload();
//require('JPCleaner').cleanAll();

if(flag){
//    require('JPCleaner').cleanAll();
    
//    loader.updateImageFrom_callback(downloadKey,null);
    console.log("JSPatch_asset: had download");

}else{
    console.log("JSPatch_asset: updateImageFrom_callback");

    require('JPCleaner').cleanAll();
    loader.updateImageFrom_callback(downloadKey);

}
