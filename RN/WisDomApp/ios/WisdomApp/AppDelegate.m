/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "Orientation.h"
#import "MineRNBridgeModule.h"
#import "WSNotification.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <AVFoundation/AVFoundation.h>   //先导入框架

@implementation AppDelegate
{
  UIBackgroundTaskIdentifier _bgTaskId;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"WisdomApp"
                                            initialProperties:nil];
  NSString *currentLanguage = [[NSLocale preferredLanguages] firstObject];
  [[UIDatePicker appearance] setLocale:[[NSLocale alloc]initWithLocaleIdentifier:currentLanguage]];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];  // allow
  
  // APP  设置强制竖屏
  [Orientation setOrientation:(UIInterfaceOrientationMaskPortrait)];
  
//  [MineRNBridgeModule registerStatusBarOrientationChangedNotifaction];
  
  [WSNotification OCsendMessageToReactNative:@{@"notificationName": @"orientation"}];
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
  // ios 8.x or older
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
  {
    return [RCTLinkingManager application:application openURL:url
                        sourceApplication:sourceApplication annotation:annotation];
  }
  
  // ios 9.0+
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<NSString*, id> *)options
  {
    return [RCTLinkingManager application:application openURL:url options:options];
  }

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

-(void)applicationWillResignActive:(UIApplication *)application
{
  //开启后台处理多媒体事件
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  AVAudioSession *session=[AVAudioSession sharedInstance];
  [session setActive:YES error:nil];
  //后台播放
  [session setCategory:AVAudioSessionCategoryPlayback error:nil];
  //这样做，可以在按home键进入后台后 ，播放一段时间，几分钟吧。但是不能持续播放网络歌曲，若需要持续播放网络歌曲，还需要申请后台任务id，具体做法是：
  _bgTaskId=[AppDelegate backgroundPlayerID:_bgTaskId];
  //其中的_bgTaskId是后台任务UIBackgroundTaskIdentifier _bgTaskId;在appdelegate.m中定义的全局变量
}

+(UIBackgroundTaskIdentifier)backgroundPlayerID:(UIBackgroundTaskIdentifier)backTaskId
{
  //设置并激活音频会话类别
  AVAudioSession *session=[AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayback error:nil];
  [session setActive:YES error:nil];
  //允许应用程序接收远程控制
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  //设置后台任务ID
  UIBackgroundTaskIdentifier newTaskId=UIBackgroundTaskInvalid;
  newTaskId=[[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:nil];
  if(newTaskId!=UIBackgroundTaskInvalid&&backTaskId!=UIBackgroundTaskInvalid)
  {
    [[UIApplication sharedApplication] endBackgroundTask:backTaskId];
  }
  return newTaskId;
}

@end
