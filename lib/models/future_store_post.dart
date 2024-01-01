import 'store_post.dart';

class FutureStorePost extends StorePost{

  String placeOfCelebrationAddress;
  DateTime celebrationDate;

  // Has a sub collection of store_post_involved_users 
  // This is a list of users who were there 
  // during good time not neccessarily ones alcoholics.
  
  FutureStorePost({
    required storePostId,
    required storeGroupFK,
    required creatorUserId,
    required creatorImageLocation,
    required creatorUsername,
    createdDate,

    required this.placeOfCelebrationAddress,
    required this.celebrationDate,
  }):super(
    storePostId: storePostId,
    storeGroupFK: storeGroupFK,
    creatorUserId: creatorUserId,
    creatorImageLocation: creatorImageLocation,
    creatorUsername: creatorUsername,
    createdDate: createdDate
  );

  @override 
  Map<String, dynamic> toJson(){
    Map<String, dynamic> map = super.toJson();

    map.addAll(
      {
        'Place Of Celebration Address': placeOfCelebrationAddress,
        'Celebration Date': celebrationDate,
      
      }
    );

    return map;
  }

  factory FutureStorePost.fromJson(dynamic json){
    return FutureStorePost(
      storePostId: json['Store Post Id'],
      storeGroupFK: json['Store Group Post FK'],
      placeOfCelebrationAddress: json['Place Of Celebration Address'],
      celebrationDate: json['Celebration Date'],
      creatorUserId: json['Store Post Creator Id'],
      creatorImageLocation: json['Store Post Creator Image Location'],
      creatorUsername: json['Store Post Creator Username'],
      createdDate: json['Store Post Created Date'],
    );
  }


}
