import 'old_user.dart';

class Owner extends User{
  String fullName;
  String surname;
  int idNumber;
  String? imageLocation;
  var store;

  Owner({
    required username, 
    required cellNumber,
    required isMale,
    required sectionName,

    joinedStores,
    onlineUsers,
    begRequests,
    peopleWhoKnowYou,
    owners,
    conversations,
    

    required this.fullName,
    required this.surname,
    required password,
    required this.idNumber,
    this.store,
    this.imageLocation,
  }):super(
      username:username, 
      password: password,
      cellNumber: cellNumber,
      isMale: isMale,
      sectionName: sectionName,
      joinedStores:joinedStores,
      onlineUsers:onlineUsers,
      begRequests:begRequests,
      peopleWhoKnowYou: peopleWhoKnowYou,
      owners: owners,
      conversations:conversations,
    );

  @override
  Map<String,dynamic> toJson(){
    Map<String,dynamic> map = {
      'Full Name': fullName,
      'Surname': surname,
      'ID Number': idNumber,
      'Store': store.toJson(),
      
    };
    map.addAll(retrievePortion());
    return map;
  }

  factory Owner.fromJson(dynamic json){
    return Owner(
      fullName: json['Full Name'], 
      surname: json['Surname'], 
      idNumber: json['ID Number'],
      store: json['Store'],
      username: json['Username'],
      password: json['Password'],
      sectionName: json['Section Name'],
      cellNumber: json['Cell Number'],
      joinedStores: json['Joined Store'],
      begRequests: json['Beg Requests'],
      onlineUsers: json['Online Users'],
      peopleWhoKnowYou:json['People Who Know You'],
      conversations:json['Conversations'],
      owners: json['Owners'],
      imageLocation: json['Image Location'],
      isMale: json['Gender']=='Male',
    );
  }

  @override
  bool isOnwer(){
    return true;
  }

  @override 
  String findImageLocation(){
    return imageLocation!;
  }
}