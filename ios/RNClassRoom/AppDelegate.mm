#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTAppSetupUtils.h>
#import "ScriptLoadUtil.h"
#import "ReactController.h""

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>


@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@interface AppDelegate ()
{
  RCTBridge *bridge;
}
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  RCTAppSetupPrepareApp(application);

//  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

//#if RCT_NEW_ARCH_ENABLED
//  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
//  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
//  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
//  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
//  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
//#endif

//  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"RNClassRoom", nil);

//  if (@available(iOS 13.0, *)) {
//    rootView.backgroundColor = [UIColor systemBackgroundColor];
//  } else {
//    rootView.backgroundColor = [UIColor whiteColor];
//  }
  BOOL debugable = [ScriptLoadUtil isDebugable];
  NSURL *jsCodeLocation;
//  if(debugable){
//    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"MultiDenugEntry" fallbackResource:nil];
//  }else{
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"platform.ios" withExtension:@"bundle"];
//  }

  bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                 moduleProvider:nil
                                  launchOptions:launchOptions];
  [ScriptLoadUtil init:bridge];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  dispatch_after(1, dispatch_get_main_queue(), ^{
    UIViewController* vc = [self getRNVC];
    [rootViewController presentViewController:vc animated:YES completion:nil];
  });
  return YES;
}


- (UIViewController*)getRNVC {
  BOOL isBundleLoaded = NO;
  if([ScriptLoadUtil isDebugable]){
    isBundleLoaded = YES;
  }
  NSString* bundleName = @"index.ios.bundle";
  BundleType type = InApp;

  NSString* bundleUrl = @"";
  NSString* moduleName = @"RNClassRoom";
  ReactController* controller = [[ReactController alloc] initWithURL:bundleUrl
                                                                path:bundleName
                                                                type:type
                                                          moduleName:moduleName];
  
  return controller;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif

@end
