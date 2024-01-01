import 'graph theory/section_name.dart';
import 'utilities.dart';

class FoundStore{

  String storeNameInfoFK;
  String foundStoreFK;
  String storeName;
  SectionName sectionName;
  FoundStoreType foundStoreType;
  bool isForPost;
  

  FoundStore({
    required this.foundStoreFK,
    required this.storeNameInfoFK,
    required this.storeName,
    required this.sectionName,
    required this.foundStoreType,
    this.isForPost = false,
  });

  Map<String, dynamic> toJson(){
    return {
      'Found Store FK': foundStoreFK,
      'Store Name Info FK': storeNameInfoFK,
      'Found Store Name': storeName,
      'Section Name': sectionName,
      'Found Store Type': foundStoreType,
      'Is For Post': isForPost,
      
    };
  }

}