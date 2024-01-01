class Conversation{

  String conversationId;
  String user1Id;
   // Has a sub collection of messages containing messages written by both users.
  String user2Id;
  
  

  Conversation({
    required this.conversationId,
    required this.user1Id,
    required this.user2Id,
  });

  Map<String, dynamic> toJson(){
    return {
      'Conversation Id': conversationId,
      'User1 Id': user1Id,
      'User2 Id': user2Id,
    };
  }

  factory Conversation.fromJson(dynamic json){
    return Conversation(
      conversationId: json['Conversation Id'],
      user1Id: json['User1 Id'], 
      user2Id: json['User2 Id'],
    );
  }
  
}