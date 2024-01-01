import 'dart:math';

import 'alcohol.dart';
import 'graph theory/utilities.dart';
import 'graph theory/section_name.dart';
import 'old_post.dart';
import 'old_competition.dart';
import 'old_user.dart';
import 'old_won_price.dart';

// Last Won Member Is Tracked Using A Method As Opposed To An Attribute.
class Store extends Comparable<Store>{
  String? storeId;
  String storeName;
  String picPath;
  String picName;
  String address;
  SectionName sectionName;
  List<Competition> competitions;
  List<Post> posts;
  Map<User, String> joinedMembers;
  List<Alcohol> availableAlcohol;

  Store({
    required this.storeName,
    required this.picPath,
    required this.picName,
    required this.address,
    required this.sectionName,
    this.competitions = const[],
    this.posts = const[],
    this.storeId,
    this.joinedMembers = const{},
    this.availableAlcohol = const [],
  });

    Map<String,dynamic> toJson(){
    return {
      'Store Name': storeName,
      'Store Pic Path': picPath,
      'Store Pic Name': picName,
      'Store Address': address,
      'Store Competitions': competitions,
      'Store Posts': posts,
      'Store Id': generateStoreId(),
      'Store\'s Last Won Price': findLastWonPrice()!.toJson(),
      'Store Joined Members': joinedMembers,
      'Store\'s Section/Area': Utilities.asString(sectionName),
      'Store\'s Alcohol': availableAlcohol,
    };
  }

  factory Store.fromJson(dynamic json){
    return Store(
      storeName: json['Store Name'], 
      picPath: json['Store Pic Path'], 
      picName: json['Store Pic Name'], 
      address: json['Store Address'],
      sectionName: json['Store\'s Section/Area'],
      competitions: json['Store Competitions'],
      posts: json['Store Posts'],
      storeId: json['Store Id'],
      joinedMembers: json['Store Joined Members'],
      availableAlcohol: json['Store\'s Alcohol'],
    );
  }

  String generateStoreId(){

    String lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    String storeId = '';

    for(int i = 0; i < 20;i++){
      Random random = Random();
      storeId += lettersAndNumbers[random.nextInt(lettersAndNumbers.length)];
    }

    this.storeId = storeId;
    return storeId;
  }
  
  @override
  int compareTo(Store other) {
    return storeName.compareTo(other.storeName);
  }

  bool hasJoined(String cellNumber){
    for(User user in joinedMembers.keys){
      if(user.cellNumber==cellNumber){
        return true;
      }
    }

    return false;
  }

  WonPrice? findLastWonPrice(){
    return null;
  }

  Competition? findNextCloseCompetition(DateTime after){
    competitions.sort();

    Competition? competition;
    int competitionIndex = 0;
    while(competitions[competitionIndex].dateTime.isBefore(after)){
      competition = competitions[competitionIndex++];
    }
    return competition;
  }

  

}