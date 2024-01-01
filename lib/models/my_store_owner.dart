import 'user.dart';

class MyStoreOwner{
  String userFK;
  User storeOwner;

  MyStoreOwner({
    required this.userFK,
    required this.storeOwner,
  });

  Map<String, dynamic> toJson(){
    return {
      'User FK': userFK,
      'Store Owner': storeOwner.toJson(),
    };
  }

  factory MyStoreOwner.fromJson(dynamic json){
    return MyStoreOwner(
      userFK: json['User FK'], 
      storeOwner: User.fromJson(json['Store Owner']),
    );
  }


}