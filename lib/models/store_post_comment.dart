class StorePostComment{
  
  String storePostCommentId;
  String storePostFK;
  String storePostCommentText;
  String creatorUserId;
  String creatorImageLocation;
  String creatorUsername;
  DateTime? createdDate = DateTime.now();
  bool? isLiked;
  
  Map<DateTime, StorePostComment> commentsOnComment;

  StorePostComment({
    required this.storePostCommentId,
    required this.storePostFK,
    required this.storePostCommentText,
    required this.creatorUserId,
    required this.creatorImageLocation,
    required this.creatorUsername,
    this.createdDate,
    this.isLiked,
    this.commentsOnComment = const{},
  });

  Map<String, dynamic> toJson(){
    return {
      'Store Post Comment Id': storePostCommentId,
      'Store Post FK': storePostFK,
      'Store Post  Comment Text': storePostCommentText,
      'Comment Creator Id': creatorUserId,
      'Comment Creator Image Location': creatorImageLocation,
      'Comment Creator Username': creatorUsername,
      'Comment Created Date': createdDate,
      'Is Liked': isLiked,
      'Comments On Comment': commentsOnComment,
    };
  }

  factory StorePostComment.fromJson(dynamic json){
    return StorePostComment(
      storePostCommentId: json['Store Post Comment Id'],
      storePostFK: json['Store Post FK'],
      storePostCommentText: json['Store Post Comment Text'],
      creatorUserId: json['Comment Creator Id'],
      creatorImageLocation: json['Comment Creator Image Location'],
      creatorUsername: json['Comment Creator Username'],
      createdDate: json['Comment Created Date'],
      isLiked: json['Is Liked'],
      commentsOnComment: json['Comments On Comment'],
    );
  }
}

