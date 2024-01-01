import 'store_post.dart';

class PastStorePost extends StorePost{
  
  String whatWereYouDrinkingVideoClipLocation; // 5 seconds video
  String whereWereYouPicOrVideoLocation; // 5 seconds video or pic
  String whatMusicWereYouListeningToClipLocation; // 10-15 seconds track.
  String whatHappenedTextOrVoiceRecordDescription; // voice record takes a max of 35 seconds.

  // Has a sub collection of store_post_involved_users 
  // This is a list of users who were there 
  // during good time not neccessarily ones alcoholics.

  PastStorePost({
    required storePostId,
    required storeGroupFK,
    required creatorUserId,
    required creatorImageLocation,
    required creatorUsername,
    createdDate,

    required this.whatWereYouDrinkingVideoClipLocation,
    required this.whereWereYouPicOrVideoLocation,
    required this.whatMusicWereYouListeningToClipLocation,
    required this.whatHappenedTextOrVoiceRecordDescription,
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
      
      'What Were You Drinking Video Clip Location': whatWereYouDrinkingVideoClipLocation,
      'Where Were You Pic Or Video Location': whereWereYouPicOrVideoLocation,
      'What Music Were You Listening To Clip Location': whatMusicWereYouListeningToClipLocation,
      'What Happened Text Or Voice Record Description': whatHappenedTextOrVoiceRecordDescription,
      
      }
    );

    return map;
  }

  factory PastStorePost.fromJson(dynamic json){
    return PastStorePost(
      storePostId: json['Store Post Id'],
      storeGroupFK: json['Store Group Post FK'],
      whatWereYouDrinkingVideoClipLocation: json['What Were You Drinking Video Clip Location'],
      whereWereYouPicOrVideoLocation: json['Where Were You Pic Or Video Location'],
      whatMusicWereYouListeningToClipLocation: json['What Music Were You Listening To Clip Location'],
      whatHappenedTextOrVoiceRecordDescription: json['What Happened Text Or Voice Record Description'],
      creatorUserId: json['Store Post Creator Id'],
      creatorImageLocation: json['Store Post Creator Image Location'],
      creatorUsername: json['Store Post Creator Username'],
      createdDate: json['Store Post Created Date'],
    );
  }


}
