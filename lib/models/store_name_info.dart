
import 'graph theory/section_name.dart';

class StoreNameInfo{
  String storeNameInfoId; // Must be the same as the storeId for some store.
  String storeFK;
  String storeName;
  SectionName sectionName;

  StoreNameInfo({
    required this.storeNameInfoId,
    required this.storeFK,
    required this.storeName,
    required this.sectionName,
  });

  Map<String, dynamic> toJson(){
    return {
      'Store Name Info Id': storeNameInfoId,
      'Store FK': storeFK,
      'Store Name': storeName,
      'Section Name': sectionName,
    };
  }

  factory StoreNameInfo.fromJson(dynamic json){
    return StoreNameInfo(
      storeNameInfoId: json['Store Name Info Id'], 
      storeFK: json['Store FK'],
      storeName: json['Store Name'],
      sectionName: json['Section Name']
    );
  }

}

