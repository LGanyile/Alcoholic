import 'found_store.dart';
import 'utilities.dart';

class FoundStoreWithWinner extends FoundStore{

  String wonPriceSummaryFK;

  FoundStoreWithWinner({
    required foundStoreFK,
    required storeNameInfoFK,
    required storeName,
    required sectionName,
    required this.wonPriceSummaryFK,
    isForPost,
  }):super(
    foundStoreFK: foundStoreFK,
    storeNameInfoFK: storeNameInfoFK,
    storeName: storeName,
    sectionName: sectionName,
    foundStoreType: FoundStoreType.storeWithWinner,
    isForPost: isForPost,
  );

  @override
  Map<String, dynamic> toJson(){
    Map<String, dynamic> json = super.toJson();

    json.addAll( {
      'Won Price Summary FK': wonPriceSummaryFK,
    });

    return json;
  }

  factory FoundStoreWithWinner.fromJson(dynamic json){

    return FoundStoreWithWinner(
      foundStoreFK: json['Found Store FK'],
      storeNameInfoFK: json['Store Name Info FK'], 
      storeName: json['Found Store Name'], 
      sectionName: json['Section Name'],
      wonPriceSummaryFK: json['Won Price Summary FK'],
      isForPost: json['Is For Post'],
      
    );
  }

  
}