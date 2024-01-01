import 'found_store_without_competition.dart';
import 'utilities.dart';

class FoundStoreWithCompetition extends FoundStoreWithoutCompetition{

  Duration commingIn;
  // Documents of this object has a sub collection of FoundStoreGrandPrices

  FoundStoreWithCompetition({
    required foundStoreFK,
    required storeNameInfoFK,
    required foundStoreId,
    required storeName,
    required sectionName,
    required storeImageLocation,
    required storeSectionName,
    isForPost,
    required this.commingIn,
    
  }):super(
    foundStoreFK: foundStoreFK,
    storeNameInfoFK:storeNameInfoFK,
    storeName: storeName,
    sectionName: sectionName,
    foundStoreType: FoundStoreType.storeWithNoCompetitionToCome,
    isForPost: isForPost,
    
    storeImageLocation: storeImageLocation,
    
    
  );

  @override
  Map<String, dynamic> toJson(){
    Map<String, dynamic> json = super.toJson();

    json.addAll( {
      'Competition Start In': commingIn,
      
    });

    return json;
  }

  factory FoundStoreWithCompetition.fromJson(dynamic json){

    return FoundStoreWithCompetition(
      foundStoreFK: json['Found Store FK'],
      foundStoreId: json['Found Store Id'], 
      storeName: json['Found Store Name'], 
      sectionName: json['Section Name'],
      isForPost: json['Is For Post'],
      storeNameInfoFK: json['Store Name Info FK'],
      storeSectionName: json['Found Store Section Name'],
      storeImageLocation: json['Found Store Image'],
      commingIn: json['Competition Start In'],
    );
  }

}