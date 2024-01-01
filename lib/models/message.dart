class Message{
  String messageId;
  String conversationFK;
  String senderId;
  String receiverId;
  String text;
  DateTime sentTime;
  bool isRead;
  bool isLiked;
  

  Message({
    required this.messageId,
    required this.conversationFK,
    required this.senderId,
    required this.receiverId,
    required this.text,
    required this.sentTime,
    this.isRead = false,
    this.isLiked = false,
  });

  Map<String, dynamic> toJson(){
    return {
      'Message Id': messageId,
      'Conversation FK': conversationFK,
      'Sender Id': senderId,
      'Receiver Id': receiverId,
      'Text': text,
      'Sent Time': sentTime.toString(),
      'Is Read': isRead,
      'Is Liked': isLiked,
      
    };
  }

  factory Message.fromJson(dynamic json){
    return Message(
      messageId: json['Message Id'],
      conversationFK: json['Conversation FK'],
      senderId: json['Sender Id'],
      receiverId: json['Receiver Id'],
      sentTime: json['Sent Time'],
      text: json['Text'],
      isRead: json['Is Read'],
      isLiked: json['Is Liked'],
    );
  }
}