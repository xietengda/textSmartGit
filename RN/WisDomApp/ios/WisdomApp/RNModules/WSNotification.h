//
//  WSNotification.h
//  WisdomApp
//
//  Created by liangyi on 2019/5/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface WSNotification : RCTEventEmitter <RCTBridgeModule>

+ (void)OCsendMessageToReactNative:(NSDictionary *)dictionary;

@end

NS_ASSUME_NONNULL_END
