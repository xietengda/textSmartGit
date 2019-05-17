//
//  WSNotification.m
//  WisdomApp
//
//  Created by liangyi on 2019/5/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "WSNotification.h"

@implementation WSNotification

RCT_EXPORT_MODULE();

- (NSDictionary<NSString *, NSString *> *)constantsToExport {
  return @{@"name": @"OCSendToRN", @"ocName": @"OC直接定义的常量"};
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"orientationChange"];
}

- (void)startObserving {
//  for (NSString *notifiName in [self supportedEvents]) {
//    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(OCsendToReactNative:) name:notifiName object:nil];
//  }
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(statusBarOrientationChanged:) name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
}

- (void)stopObserving {
  // 在此移出通知
//  [[NSNotificationCenter defaultCenter] removeObserver:self name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
}

+ (void)OCsendMessageToReactNative:(NSDictionary *)dictionary {
  if ([[dictionary objectForKey:@"notificationName"] isEqualToString:@"orientation"]) {
      //
  }
//  [[NSNotificationCenter defaultCenter] postNotificationName:@"OCSendToRN" object:nil userInfo:dictionary];
}

- (void)OCsendToReactNative:(NSNotification *)notification {
//  [self sendEventWithName:@"OCSendToRN" body:notification.userInfo];
}

- (void)statusBarOrientationChanged:(NSNotification *)noti {
  UIInterfaceOrientation orientation = [[UIApplication sharedApplication] statusBarOrientation];
  if (orientation == UIInterfaceOrientationLandscapeLeft) {
    [self sendEventWithName:@"orientationChange" body:@"orientationLeft"];
  } else if (orientation == UIInterfaceOrientationLandscapeRight) {
    [self sendEventWithName:@"orientationChange" body:@"orientationRight"];
  } else if (orientation == UIInterfaceOrientationPortrait) {
    [self sendEventWithName:@"orientationChange" body:@"orientationPortrait"];
  }
}

@end
