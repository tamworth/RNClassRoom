//
//  RCTAgoraWhiteBoardViewManager.m
//  RNClassRoom
//
//  Created by sheen on 2022/4/27.
//

#import "RCTAgoraWhiteBoardViewManager.h"
#import "RCTAgoraWhiteBoardView.h"

@implementation RCTAgoraWhiteBoardViewManager
RCT_EXPORT_MODULE(RCTWhiteBoardView)

- (UIView *)view
{
  return [[RCTAgoraWhiteBoardView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(whiteBoardId, NSString)
//RCT_EXPORT_VIEW_PROPERTY(roomToken, NSString)
RCT_EXPORT_VIEW_PROPERTY(roomUuid, NSString)
RCT_EXPORT_VIEW_PROPERTY(roomToken, NSString)




@end
