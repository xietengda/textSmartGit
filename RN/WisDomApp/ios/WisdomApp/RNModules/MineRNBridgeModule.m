//
//  MineRNBridgeModule.m
//  WisdomApp
//
//  Created by liangyi on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "MineRNBridgeModule.h"
#import "Orientation.h"
#import <React/RCTEventDispatcher.h>

@implementation MineRNBridgeModule

@synthesize bridge = _bridge;

//将当前对象暴露给ReactNative 可以访问
RCT_EXPORT_MODULE();

//对React Native提供调用方法,Callback
RCT_EXPORT_METHOD(resetOrientationStatus:(NSString *)event callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"%@",event);
//  NSString *callbackData = @"Callback数据"; //准备回调回去的数据
//  callback(@[[NSNull null], callbackData]);
  if ([event isEqualToString:@"1"]) {
    // 旋转状态
    // APP  设置屏幕允许旋转
    [Orientation setOrientation:(UIInterfaceOrientationMaskAllButUpsideDown)];
  } else {
    // APP  设置强制竖屏
    [Orientation setOrientation:(UIInterfaceOrientationMaskPortrait)];
  }
  NSString *callbackData = [NSString stringWithFormat:@"RN->原生的数据->成功->%@", event]; //准备回调回去的数据
  callback(@[[NSNull null], callbackData]);
}

//判断竖屏锁定是否开启
RCT_EXPORT_METHOD(bridgeIsProtraitLockOn:(NSString *)event callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"%@",event);
  
  callback(@[[NSNull null], @(YES)]);
}

@end
