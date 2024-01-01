import 'user.dart';

class RecentWonPrice{

  String recentWonPriceId;
  User user;
  String grandPriceImage;
  String grandPriceDescription;
  

  RecentWonPrice({
    required this.recentWonPriceId,
    required this.user,
    required this.grandPriceImage,
    required this.grandPriceDescription,
  });


  Map<String,dynamic> toJson(){
    return {
      'Recent Won Price Id': recentWonPriceId,
      'Winner': user.toJson(),
      'Grand Price Image': grandPriceImage,
      'Grand Price Description': grandPriceDescription,
    };
  }

  factory RecentWonPrice.fromJson(dynamic json){
    return RecentWonPrice(
      recentWonPriceId: json['Recent Won Price Id'],
      user: User.fromJson(json['Winner']),
      grandPriceImage: json['Grand Price Image'], 
      grandPriceDescription: json['Grand Price Description'],
    );
  }
}