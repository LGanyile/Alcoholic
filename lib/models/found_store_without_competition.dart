import '../models/found_store.dart';

import 'utilities.dart';

class FoundStoreWithoutCompetition extends FoundStore{

  String storeImageLocation;

  FoundStoreWithoutCompetition({
    required foundStoreFK,
    required storeNameInfoFK,
    required storeName,
    required sectionName,
    foundStoreType = FoundStoreType.storeWithCompetitionToCome,
    isForPost,

    required this.storeImageLocation

  }):super(
    foundStoreFK: foundStoreFK,
    storeNameInfoFK:storeNameInfoFK,
    storeName: storeName,
    sectionName: sectionName,
    foundStoreType: FoundStoreType.storeWithCompetitionToCome,
    isForPost: isForPost,
    
  );

  @override
  Map<String, dynamic> toJson(){
    Map<String, dynamic> json = super.toJson();

    json.addAll( {
      'Found Store Image': storeImageLocation,
    });

    return json;
  }

  factory FoundStoreWithoutCompetition.fromJson(dynamic json){

    return FoundStoreWithoutCompetition(
      foundStoreFK: json['Found Store FK'],
      storeNameInfoFK: json['Store Name Info FK'],
      storeName: json['Found Store Name'], 
      isForPost: json['Is For Post'],
      sectionName: json['Section Name'],
      storeImageLocation: json['Found Store Image'],
      
    );
  }
}