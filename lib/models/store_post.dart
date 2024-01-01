abstract class StorePost{
  
  String storePostId;
  String storeGroupFK;
  String creatorUserId;
  String creatorImageLocation;
  String creatorUsername;
  DateTime? createdDate = DateTime.now();

  StorePost({
    required this.storePostId,
    required this.storeGroupFK,
    required this.creatorUserId,
    required this.creatorImageLocation,
    required this.creatorUsername,
    this.createdDate,
  });

  Map<String, dynamic> toJson(){
    return {
      'Store Post Id': storePostId,
      'Store Group Post FK': storeGroupFK,
      'Store Post Creator Id': creatorUserId,
      'Store Post Creator Image Location': creatorImageLocation,
      'Store Post Creator Username': creatorUsername,
      'Store Post Created Date': createdDate,
    };
  }
}
