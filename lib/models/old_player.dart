import 'old_user.dart';

class Player extends User{
  late String picPath;
  late String picName;

  Player({
    required cellNumber,
    required username,
    required password,
    required sectionName,
    required isMale,
    this.picPath = '',
    this.picName = '',

    joinedStores,
    onlineUsers,
    begRequests,
    peopleWhoKnowYou,
    owners,
    conversations,
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
      'Pic Path': picPath,
      'Pic Name': picName,
      
    };
    map.addAll(retrievePortion());
    return map;
  }

  @override
  factory Player.fromJson(dynamic json){
    return Player(
      picPath: json['Pic Path'], 
      picName: json['Pic Name'], 
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
      isMale: json['Gender']=='Male',
    );
  }

  @override 
  String findImageLocation(){
    return picPath;
  }

  @override
  bool isOnwer(){
    return false;
  }
}