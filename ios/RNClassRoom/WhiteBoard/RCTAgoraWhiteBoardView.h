//
//  RCTAgoraWhiteBoardView.h
//  RNClassRoom
//
//  Created by sheen on 2022/4/27.
//

#import <Whiteboard/Whiteboard.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTAgoraWhiteBoardView : WhiteBoardView
@property (nonatomic, copy) NSString* whiteBoardId;
@property (nonatomic, copy) NSString* roomUuid;
@property (nonatomic, copy) NSString* roomToken;
@end

NS_ASSUME_NONNULL_END
