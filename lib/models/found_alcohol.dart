import 'graph theory/section_name.dart';
import 'graph theory/utilities.dart';

class FoundAlcohol{
  // Alcohol Id for the one belonging to the 
  // available_alcohol collection not to the
  // one belongi to all_alcohol collection.
  // collection.
  String alcoholFK; 
  String alcoholName;
  String alcoholImageLocation;
  String storeImageLocation;
  String storeName;
  SectionName storeSectionName;
  Duration competitionStartIn;
  DateTime competitionDate;

  FoundAlcohol({
    required this.alcoholFK,
    required this.alcoholName,
    required this.alcoholImageLocation,
    required this.storeImageLocation,
    required this.storeName,
    required this.storeSectionName,
    required this.competitionStartIn,
    required this.competitionDate,
  });

  Map<String, dynamic> toJson(){

    return {
      'Alcohol FK': alcoholFK,
      'Alcohol Name': alcoholName,
      'Alcohol Image Location': alcoholImageLocation,
      'Store Image Location': storeImageLocation,
      'Store Name': storeName,
      'Store Section Name': Utilities.asString(storeSectionName),
      'Competition Start In': competitionStartIn,
      'Competition Date': competitionDate,
    };
  }

  factory FoundAlcohol.fromJson(dynamic json){
    return FoundAlcohol(
      alcoholFK: json['Alcohol FK'],
      alcoholName: json['Alcohol Name'],
      alcoholImageLocation: json['Alcohol Image Location'],
      storeImageLocation: json['Store Name'],
      storeName: json['Store Name'],
      storeSectionName: json['Store Section Name'],
      competitionStartIn: json['Competition Start In'],
      competitionDate: json['Competition Date'],
    );
  }
}