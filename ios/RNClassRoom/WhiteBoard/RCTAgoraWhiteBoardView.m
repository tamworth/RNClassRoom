//
//  RCTAgoraWhiteBoardView.m
//  RNClassRoom
//
//  Created by sheen on 2022/4/27.
//

#import "RCTAgoraWhiteBoardView.h"

@interface RCTAgoraWhiteBoardView()
@property (nonatomic, strong) WhiteSDK* sdk;
@property (nonatomic, strong) WhiteRoomConfig* roomConfig;
@end

@implementation RCTAgoraWhiteBoardView

- (void)setWhiteBoardId:(NSString *)whiteBoardId {
  _whiteBoardId = whiteBoardId;
}

- (void)setRoomUuid:(NSString *)roomUuid {
  _roomUuid = roomUuid;
}

- (void)setRoomToken:(NSString *)roomToken {
  _roomToken = roomToken;
}

- (void)initSDKIfNeed {
  if(_sdk) {
    return;
  }
  NSAssert(self.superview != nil && self.whiteBoardId.length > 0, @"init wb sdk fatal error");
  WhiteSdkConfiguration *config = [[WhiteSdkConfiguration alloc] initWithApp:self.whiteBoardId];
  config.renderEngine = WhiteSdkRenderEngineCanvas;
//  config.enableSyncedStore = YES;
  config.useMultiViews = NO;//self.useMultiViews;
  
  //如果不需要拦截图片API，则不需要开启，页面内容较为复杂时，可能会有性能问题
//  config.enableInterrupterAPI = YES;
  config.log = YES;
  config.region = WhiteRegionCN;
  config.enableIFramePlugin = YES;
  //自定义 netless 协议，所有 ppt 请求，都由 https 更改为 kPPTScheme，需要配合 NETURLSchemeHandler 进行操作
//  if (@available(iOS 11.0, *)) {
//      WhitePptParams *pptParams = [[WhitePptParams alloc] init];
//      pptParams.scheme = kPPTScheme;
//      config.pptParams = pptParams;
//  }
  
  //打开用户头像显示信息
  config.userCursor = YES;
  
  _sdk = [[WhiteSDK alloc] initWithWhiteBoardView:self
                                           config:config
                           commonCallbackDelegate:nil];
}

- (void)initRoomConfigIfNeed {
  if (_roomConfig) {
    return;
  }
  NSAssert((self.roomUuid.length > 0 && self.roomToken.length > 0), @"init room fatal error!");
  _roomConfig = [[WhiteRoomConfig alloc] initWithUUID:self.roomUuid
                                            roomToken:self.roomToken
                                                  uid:@"sheen2"
                                          userPayload:@{@"cursorName" : @"sheen"}];
  // 配置，橡皮擦是否能删除图片。默认为 false，能够删除图片。
//         roomConfig.disableEraseImage = YES;
  // 设置最大最小缩放比例，不设置成 0，会导致画面极小时，出现一些问题。默认不是 0
  WhiteCameraBound *bound = [WhiteCameraBound defaultMinContentModeScale:0 maxContentModeScale:10];
  _roomConfig.cameraBound = bound;
  _roomConfig.region = WhiteRegionCN;
}

- (void)joinRoomIfNeed {
  [self initSDKIfNeed];
  [self initRoomConfigIfNeed];
  
  [self.sdk joinRoomWithConfig:self.roomConfig
                     callbacks:nil
             completionHandler:^(BOOL success, WhiteRoom * _Nullable room, NSError * _Nullable error) {
    NSLog(@"join room %@", room);
  }];
}

- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  [self joinRoomIfNeed];
}

@end
