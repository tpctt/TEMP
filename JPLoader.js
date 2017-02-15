require('NSBundle, NSString, NSURL, NSURLRequest, NSURLSession, NSString, NSString, NSString, NSString, ZipArchive, NSError, NSFileManager, NSFileManager, NSFileManager, NSString');



defineClass('JPLoader',['task','session'] , {
            
            downloadAsset:function(){
//                var downloadKey = "https://img.taoqian123.com/jsImage.zip";

                if(!self.assetIsDownload()){
            
                    return true;
                }else{
                    return false;

                }
//                return false;
            
            
            },
            
            ///获取资源地址root path
            getAssetUnzipPath:function(assetUrl){
                var appVersion = NSBundle.mainBundle().infoDictionary().objectForKey("CFBundleShortVersionString") ;

                var scriptDirectory = self.fetchScriptDirectory().toJS()  ;
//                var tempDirectory = scriptDirectory ;
//                var unzipTmpDirectory = NSString.stringWithFormat("%@patch_asset_unzip_%@/", scriptDirectory, appVersion ) ;
                var unzipTmpDirectory = scriptDirectory +'patch_asset_unzip_'+appVersion;
            
                return unzipTmpDirectory;
            },
            ///获取资源的全路径
            getAssetPath:function(fileName){
                var unzipTmpDirectory = self.getAssetUnzipPath();
                return unzipTmpDirectory+fileName;
            },
            ///资源是否下载
            assetIsDownload:function(assetUrl){
                var unzipTmpDirectory = self.getAssetUnzipPath();
            
                var fm = NSFileManager.defaultManager();
                if (!fm.fileExistsAtPath(unzipTmpDirectory)) {
                    return false;
                }
                return true;
            
            },
            ///下载资源
            updateImageFrom_callback: function(assetUrl) {

                var appVersion = NSBundle.mainBundle().infoDictionary().objectForKey("CFBundleShortVersionString") ;
            
                var downloadURL = NSURL.URLWithString(assetUrl) ;
                var request = NSURLRequest.requestWithURL_cachePolicy_timeoutInterval(downloadURL, 1, 20.0) ;

                var slf = __weak(self);

                var session = require('NSURLSession').sharedSession();
                var task = session.dataTaskWithRequest_completionHandler(request, block("void, NSData*, NSURLResponse*, NSError*", function(data, response, error) {
                            slf.didReceivedData(data,response,error);
                                                                                        
                           })) ;
          
                self.setTask(task);
                task.resume();
            
////            console.log(task);
//                console.log(self.task());
            
            
            
            },
            didReceivedData:function(data, response, error){
//            var callback = null;
                if (!error) {
                    console.log("JSPatch_asset: request file success, data length:"+data.length());
                    var assetUrl2 = "";
                    
                    var scriptDirectory = self.fetchScriptDirectory().toJS()  ;
                    var tempDirectory = scriptDirectory ;
                    
                    var downloadTmpPath = NSString.stringWithFormat("%@patch_asset_%@_%@", tempDirectory,appVersion, assetUrl2).toJS() ;
                    var unzipVerifyDirectory = NSString.stringWithFormat("%@patch_asset_unzipTest_%@_%@/",tempDirectory,appVersion, assetUrl2).toJS() ;
                    var unzipTmpDirectory = self.getAssetUnzipPath();
                    
                    
                    var fm = NSFileManager.defaultManager();
                    if (!fm.fileExistsAtPath(scriptDirectory)) {
                        fm.createDirectoryAtPath_withIntermediateDirectories_attributes_error(scriptDirectory, 1, null, null);
                    }

                    
                    require('JPEngine').addExtensions(['JPMemory'])
                    
                    var pError = malloc(sizeof("id"))
                    var saveFlag = data.writeToFile_options_error(downloadTmpPath, 1, pError) ;
                    var error = pval(pError)
                    
                    if (!error) {
                        console.log("success")
                    } else {
                        console.log(error)
                    }
                                     var saveFlag = data.writeToFile_atomically(downloadTmpPath, false) ;
                    
                    
                    if ( !saveFlag) {
                        console.log("JSPatch_asset: fail to save file: "+downloadTmpPath);
                    
                    }
                    
                    var isFailed = NO;
                    
                    var verifyZipArchive = ZipArchive.alloc().init() ;
                    verifyZipArchive.UnzipOpenFile(downloadTmpPath) ;
                    var verifyUnzipSucc = verifyZipArchive.UnzipFileTo_overWrite(unzipTmpDirectory, YES) ;
                    if (verifyUnzipSucc) {
                        console.log("JSPatch_asset: Succ to unzip file");
                    
                    } else {
                        console.log("JSPatch_asset: fail to unzip file");
                        isFailed = YES;
                    
//                        if (callback) {
//                            callback(NSError.errorWithDomain_code_userInfo("org.jspatch", JPUpdateErrorUnzipFailed, null) );
//                        }
            
                        NSFileManager.defaultManager().removeItemAtPath_error(unzipTmpDirectory, null) ;
                    
                    }
                    
                    
                    NSFileManager.defaultManager().removeItemAtPath_error(downloadTmpPath, null) ;
                    NSFileManager.defaultManager().removeItemAtPath_error(unzipVerifyDirectory, null) ;
                    
            
                }
                else {
                    console.log(NSString.stringWithFormat("JSPatch_asset: request error %@", error) );
                
                //                 if  callback(error);
                }

            },
            
            }, { });

