import 'graph theory/section_name.dart';
import 'old_beg_request.dart';
import 'old_conversation.dart';
import 'old_owner.dart';
import 'old_store.dart';

abstract class User{

  String username;
  String password;
  String cellNumber;
  late int userId;
  bool isMale;
  SectionName sectionName;

  List<Store> joinedStores;

  List<User> onlineUsers;
  List<BegRequest> begRequests;
  List<User> peopleWhoKnowYou;
  List<Owner> owners;
  List<Conversation> conversations;
  List<User> alcoholics;


  User({
    required this.username,
    required this.password,
    required this.cellNumber,
    required this.isMale,
    required this.sectionName,
    this.conversations = const[],
    this.begRequests = const[],
    this.owners = const [],
    this.peopleWhoKnowYou = const[],
    this.alcoholics = const[],
    
    this.joinedStores = const[],
    this.onlineUsers = const[],
  });

  Map<String,dynamic> toJson();

  Map<String,dynamic> retrievePortion(){
    return {
      'Username': username,
      'Password': password,
      'Cell Number': cellNumber,
      'Section Name': sectionName,
      'Gender': isMale?'Male':'Female',
      'Joined Stores':joinedStores,
      'Beg Requests':begRequests,
      'Online Users':onlineUsers,
      'People Who Know You':peopleWhoKnowYou,
      'Alcoholics': alcoholics,
      'Conversations':conversations,
      'Owners': owners,
      'Image Location': findImageLocation(),
    };
  }

  String findImageLocation();
  bool isOnwer();

}