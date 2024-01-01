import 'dart:math';

import 'old_user.dart';

class Comment{
  User owner;
  String text;
  DateTime? time;
  String? commentId;

  Comment({
    required this.owner,
    required this.text,
    this.time,
    this.commentId,
  });

  Map<String,dynamic> toJson(){
    return {
      'Comment Owner': owner.toJson(),
      'Comment Text': text,
      'Comment Time': DateTime.now(),
      'Comment Id': generateCommentId(),
    };
  }

  factory Comment.fromJson(dynamic json){
    return Comment(
      owner: json['Comment Owner'], 
      text: json['Comment Text'], 
      time: json['Comment Time'], 
    );
  }

  String generateCommentId(){

    String lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    String commentId = '';

    for(int i = 0; i < 20;i++){
      Random random = Random();
      commentId += lettersAndNumbers[random.nextInt(lettersAndNumbers.length)];
    }

    this.commentId = commentId;
    return commentId;
  }
}
