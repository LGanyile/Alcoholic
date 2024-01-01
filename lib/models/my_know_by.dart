import 'user.dart';

class MyKnownBy{
  String userFK;
  User anotherUser;
  bool? isKnown;

  MyKnownBy({
    required this.userFK,
    required this.anotherUser,
    this.isKnown,
  });

  Map<String, dynamic> toJson(){
    return {
      'User FK': userFK,
      'Another User': anotherUser.toJson(),
      'Is Known': isKnown,
    };
  }

  factory MyKnownBy.fromJson(dynamic json){
    return MyKnownBy(
      userFK: json['User FK'], 
      anotherUser: User.fromJson(json['Another User']),
      isKnown: json['Is Known'],
    );
  }


}