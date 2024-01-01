import 'dart:math';

import 'old_comment.dart';
import 'old_user.dart';

class Post extends Comparable<Post>{
  String text;
  User owner;
  DateTime? time;
  List<Comment> comments;
  String? postId;
  
  Post({
    required this.owner,
    required this.text,
    this.postId,
    this.time,
    this.comments = const[],
  });

  Map<String, dynamic> toJson(){
    return {
      'Post Owner': owner.toJson(),
      'Post Text': text,
      'Post Time': DateTime.now().toString(),
      'Post Comments': comments,
      'Post Id': generatePostId(),
    };
  }

  factory Post.fromJson(dynamic json){
    return Post(
      owner: json['Post Owner'],
      text: json['Post Text'],
      postId: json['Post Id'],
      time: json['Post Time'],
      comments: json['Post Comments'],
    );
  }

  String generatePostId(){

    String lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    String postId = '';

    for(int i = 0; i < 10;i++){
      Random random = Random();
      postId += lettersAndNumbers[random.nextInt(lettersAndNumbers.length)];
    }

    this.postId = postId;
    return postId;
  }
  
  @override
  int compareTo(Post other) {
    return time!.compareTo(other.time!);
  }
}