class StorePostInvolvedUser{
  String storePostFK;
  String userId;
  String username;
  String userImageLocation;
  bool isForPastStorePost;

  StorePostInvolvedUser({
    required this.storePostFK,
    required this.userId,
    required this.username,
    required this.userImageLocation,
    required this.isForPastStorePost,
  });

  Map<String, dynamic> toJson(){
    return {
      'Store Post FK': storePostFK,
      'User Id': userId,
      'Username': username,
      'User Image Location': userImageLocation,
      'Is For Past Store Post': isForPastStorePost,
    };
  }

  factory StorePostInvolvedUser.fromJson(dynamic json){
    return StorePostInvolvedUser(
      storePostFK: json['Store Post FK'], 
      userId: json['User Id'], 
      username: json['Username'], 
      userImageLocation: json['User Image Location'], 
      isForPastStorePost: json['Is For Past Store Post'],
    );
  }
}