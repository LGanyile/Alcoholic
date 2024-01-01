import 'store_post.dart';

class NormalStorePost extends StorePost{
  
  NormalStorePost({
    required storePostId,
    required storeGroupFK,
    required creatorUserId,
    required creatorImageLocation,
    required creatorUsername,
    createdDate,
  }):super(
    storePostId: storePostId,
    storeGroupFK: storeGroupFK,
    creatorUserId: creatorUserId,
    creatorImageLocation: creatorImageLocation,
    creatorUsername: creatorUsername,
    createdDate: createdDate
  );

  factory NormalStorePost.fromJson(dynamic json){
    return NormalStorePost(
      storePostId: json['Store Post Id'],
      storeGroupFK: json['Store Group Post FK'],
      creatorUserId: json['Store Post Creator Id'],
      creatorImageLocation: json['Store Post Creator Image Location'],
      creatorUsername: json['Store Post Creator Username'],
      createdDate: json['Store Post Created Date'],
    );
  }

}