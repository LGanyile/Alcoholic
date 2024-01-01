import 'user.dart';

class MyAlcoholic{
  String userFK;
  User alcoholic;

  MyAlcoholic({
    required this.userFK,
    required this.alcoholic,
  });

  Map<String, dynamic> toJson(){
    return {
      'User FK': userFK,
      'Alcoholic': alcoholic.toJson(),
    };
  }

  factory MyAlcoholic.fromJson(dynamic json){
    return MyAlcoholic(
      userFK: json['User FK'], 
      alcoholic: User.fromJson(json['Alcoholic']),
    );
  }


}