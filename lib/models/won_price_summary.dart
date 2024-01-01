import 'graph theory/section_name.dart';
import 'graph theory/utilities.dart';
import 'user.dart';

class WonPriceSummary{

  String wonPriceSummaryId;
  User user;
  String storeImageLocation;
  SectionName storeSectionName;
  
  String recentWonPriceFK;
  bool isWonPriceCollected;
  // A Document Of This Type Points To Beg Request Sub Collection

  WonPriceSummary({
    required this.wonPriceSummaryId,
    required this.user,
    required this.recentWonPriceFK,
    required this.storeImageLocation,
    required this.storeSectionName,
    this.isWonPriceCollected = false,
  });

  Map<String,dynamic> toJson(){
    return {
      'Won Price Summary Id': wonPriceSummaryId,
      'Won User': user.toJson(),
      
      'Recent Won Price FK': recentWonPriceFK,
      'Store Image Location': storeImageLocation,
      'Store Section Name': Utilities.asString(storeSectionName),  
      'Is Won Price Collected': isWonPriceCollected,
    };
  }

  factory WonPriceSummary.fromJson(dynamic json){
    return WonPriceSummary( 
      wonPriceSummaryId: json['Won Price Summary Id'], 
      
      user: User.fromJson(json['Won User']),
      recentWonPriceFK: json['Recent Won Price FK'],
      storeImageLocation: json['Store Image Location'],
      storeSectionName: json['Store Section Name'],
      isWonPriceCollected: json['Is Won Price Collected'],
    );
  }

}