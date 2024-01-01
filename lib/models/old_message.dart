import 'old_user.dart';

class Message{
  String text;
  DateTime sentTime;
  bool isRead;
  bool isLiked;
  User sender;

  Message({
    required this.sender,
    required this.text,
    required this.sentTime,
    this.isRead = false,
    this.isLiked = false,
  });

  Map<String, dynamic> toJson(){
    return {
      'Text': text,
      'Sent Time': sentTime.toString(),
      'Is Read': isRead,
      'Is Liked': isLiked,
      'Sender': sender.toJson(),
    };
  }

  factory Message.fromJson(dynamic json){
    return Message(
      sender: json['Sender'],
      sentTime: json['Sent Time'],
      text: json['Text'],
      isRead: json['Is Read'],
      isLiked: json['Is Liked'],
    );
  }
}