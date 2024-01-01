

import 'graph theory/section_name.dart';
import 'graph theory/utilities.dart';
import 'user.dart';


class Store extends Comparable<Store>{

  String storeId;
  String storeName;
  String storeImageLocation;
  SectionName sectionName;
  User storeOwner;
  // Contains a my_store_alcohol sub collection.
  // Contains a store_joined_members sub collection.

  Store({
    required this.storeId,
    required this.storeOwner,
    required this.storeName,
    required this.storeImageLocation,
    required this.sectionName,
    
  });

    Map<String,dynamic> toJson(){

    return {
      'Store Id': storeId,
      'Store Name': storeName,
      'Store Image Location': storeImageLocation,
      'Store\'s Section/Area': Utilities.asString(sectionName),
      'Store Owner': storeOwner.toJson(),
    };
  }

  factory Store.fromJson(dynamic json){
    return Store(
      storeName: json['Store Name'], 
      storeImageLocation: json['Store Image Location'],
      sectionName: Utilities.toSectionName(json['Store\'s Section/Area']),
      storeId: json['Store Id'],
      storeOwner: User.fromJson(json['Store Owner']),
    );
  }
  
  @override
  int compareTo(Store other) {
    return storeName.compareTo(other.storeName);
  }

  
}