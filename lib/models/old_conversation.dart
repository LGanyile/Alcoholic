import 'old_user.dart';
import 'old_message.dart';

class Conversation{

  User user1; // The Currently Loggen In User.
  List<Message> user1Messages;
  User user2;
  List<Message> user2Messages;
  DateTime? lastActive;

  String? conversationId;

  Conversation({
    required this.user1,
    this.user1Messages = const [],
    required this.user2,
    this.user2Messages = const [],
    this.conversationId,
    this.lastActive,
  });

  Map<String, dynamic> toJson(){
    return {
      'User 1': user1.toJson(),
      'User1 Messages': user1Messages,
      'User 2': user2.toJson(),
      'User2 Messages': user2Messages,
      'Last Active': lastActive.toString(),
      'Conversation Id': conversationId!,
    };
  }

  factory Conversation.fromJson(dynamic json){
    return Conversation(
      user1: json['User 1'], 
      user2: json['User 2'], 
      user1Messages: json['User1 Messages'],
      user2Messages: json['User2 Messages'],
      lastActive: json['Last Active'],
      conversationId: json['Conversation Id'],
      );
  }

  String findLastMessage(){
    if(user1Messages.isEmpty && user2Messages.isEmpty){
      return '';
    }
    else{
      DateTime user1Time, user2Time;

      if(user1Messages.isNotEmpty){
        user1Time = user1Messages[user1Messages.length-1].sentTime;
        if(user2Messages.isNotEmpty){
          user2Time = user2Messages[user2Messages.length-1].sentTime;

          return user1Time.isBefore(user2Time)?user2Messages[user2Messages.length-1].text:
          'You: ${user1Messages[user1Messages.length-1].text}';
        }
        else{
          return 'You: ${user1Messages[user1Messages.length-1].text}';
        }
      }
      else{
        return user2Messages[user2Messages.length-1].text;
      }
      
    }

  }

}