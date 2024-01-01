import 'dart:math';

import 'old_user.dart';
import 'old_won_price.dart';

class BegRequest{
  String description;
  User begger;
  WonPrice wonPrice;
  bool? isAlive = true;
  bool? isAccepted;
  String? begRequestId;
  DateTime? dateCreated;

  BegRequest({
    required this.description,
    required this.begger,
    required this.wonPrice,
    this.begRequestId,
    this.isAccepted,
    this.isAlive=true,
    this.dateCreated,
  });

  Map<String,dynamic> toJson(){
    generateCommentId();
    dateCreated = DateTime.now();
    return {
      'Description': description,
      'Begger': begger.toJson(),
      'Won Price': wonPrice.toJson(),
      'Is Alive': isAlive,
      'Is Accepted': isAccepted,
      'Request Date': dateCreated,
      'Request Id': begRequestId,
    };
  }

  factory BegRequest.fromJson(dynamic json){
    return BegRequest(
      description: json['Description'], 
      begger: json['Begger'], 
      wonPrice: json['Won Price'],
      isAlive: json['Is Alive'],
      isAccepted: json['Is Accepted'],
      dateCreated: json['Request Date'],
      begRequestId: json['Request Id'],
    );
  }

  void generateCommentId(){

    String lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    String id = '';

    for(int i = 0; i < 20;i++){
      Random random = Random();
      id += lettersAndNumbers[random.nextInt(lettersAndNumbers.length)];
    }

    begRequestId = id;
    
  }

}