import 'old_grand_price.dart';
import 'dart:math';

import 'old_user.dart';

// Converted Into The Right Form.
class Competition extends Comparable<Competition>{
  DateTime dateTime;
  int maxNoOfGrandPrices;
  List<GrandPrice> grandPrices;
  User? winner;
  List<User> competitors;
  double joiningFee;
  String? competitionId;
  Duration? duration;

  Competition({
    required this.joiningFee,
    required this.dateTime,
    required this.maxNoOfGrandPrices,
    this.grandPrices = const[],
    this.winner,
    this.competitors = const[],
    this.duration,
  });

  Map<String,dynamic> toJson(){
    generateCompetitionId();
    return {
      'Special Date': dateTime.toString(),
      'Joining Fee': joiningFee,
      'No Of Prices': maxNoOfGrandPrices,
      'Grand Prices': grandPrices,
      'Winner': winner!.toJson(),
      'Competitors': competitors,
      'Competitor Id': competitionId,
      'Duration': duration,
      
    };
  }

  factory Competition.fromJson(dynamic json){
    return Competition(
      dateTime: json['Special Date'], 
      maxNoOfGrandPrices: json['No Of Prices'], 
      grandPrices: json['Grand Prices'],
      winner: json['Winner'],
      competitors: json['Competitors'],
      joiningFee: json['Joining Fee'],
      duration: json['Duration'],
      
    );
  }

  void generateCompetitionId(){

    String lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    String competitionId = '';

    for(int i = 0; i < 20;i++){
      Random random = Random();
      competitionId += lettersAndNumbers[random.nextInt(lettersAndNumbers.length)];
    }

    this.competitionId = competitionId;
  }

  bool contains(String cellNumber){
    for(User user in competitors){
      if(user.cellNumber==cellNumber){
        return true;
      }
    }
    return false;
  }

  @override 
  int compareTo(Competition other){
    return dateTime.compareTo(other.dateTime);
  } 
}