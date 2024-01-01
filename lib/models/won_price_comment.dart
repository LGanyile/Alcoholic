class WonPriceComment{

  String wonPriceCommentId;
  String? wonPriceCommentFK;
  String wonPriceFK;
  String commentText;

  String creatorUserId;
  String creatorImageLocation;
  String creatorUsername;
  DateTime? createdDate = DateTime.now();
  bool? isLiked;

  String storeOriginId;

  WonPriceComment({
    required this.wonPriceCommentId,
    required this.wonPriceFK,
    required this.commentText,
    required this.creatorUserId,
    required this.creatorUsername,
    required this.creatorImageLocation,
    this.wonPriceCommentFK,
    required this.storeOriginId,

  });

  Map<String, dynamic> toJson(){
    return {
      'Won Price Comment Id': wonPriceCommentId,
      'Won Price Comment FK': wonPriceCommentFK,
      'Won Price FK': wonPriceFK,
      'Comment Text': commentText,
      'Creator User Id':creatorUserId,
      'Creator User Name': creatorUsername,
      'Creator Image Location': creatorImageLocation,
      'Store Origin Id': storeOriginId,
    };
  }

  factory WonPriceComment.fromJson(dynamic json){
    return WonPriceComment(
      wonPriceCommentId: json['Won Price Comment Id'],
      wonPriceCommentFK: json['Won Price Comment FK'],
      wonPriceFK: json['Won Price FK'],
      commentText: json['Comment Text'],
      creatorUserId: json['Creator User Id'],
      creatorUsername: json['Creator User Name'],
      creatorImageLocation: json['Creator Image Location'],
      storeOriginId: json['Store Origin Id'],
    );
  }


}