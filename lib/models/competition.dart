import 'dart:math';

import 'competition_competitors_grid.dart';
import 'competition_grand_prices_grid.dart';
import 'graph theory/section_name.dart';

class Competition{

  String? competitionId;
  String storeFK;
  String storeImageLocation;
  String storeName;
  SectionName storeSectionName;
  CompetitionGrandPricesGrid competitionGrandPricesGrid;
  CompetitionCompetitorsGrid competitionCompetitorsGrid;
  bool isLive;
  
  DateTime dateTime;
  double joiningFee;

  bool isOver;

  Competition({
    this.competitionId,
    required this.storeFK,
    required this.storeImageLocation,
    required this.storeName,
    required this.storeSectionName,
    required this.competitionGrandPricesGrid,
    required this.competitionCompetitorsGrid,
    required this.isLive,
    
    required this.dateTime,
    required this.joiningFee,
    required this.isOver,
  });

  Map<String, dynamic> toJson(){
    generateStoreId();
    return {
      'Competition Id': competitionId,
      'Store FK': storeFK,
      'Store Image Location': storeImageLocation,
      'Store Name': storeName,
      'Store Section Name': storeSectionName,
      'Competition Grand Prices Grid': competitionGrandPricesGrid.toJson(),
      'Competition Competitors Grid': competitionCompetitorsGrid.toJson(),
      'Is Live': isLive,
      'Date Time': dateTime,
      'Joining Fee': joiningFee,
      'Is Over': isOver,
    };
  }

  factory Competition.fromJson(dynamic json){
    return Competition(
      competitionId: json['Competition Id'], 
      storeFK: json['Store FK'],
      storeImageLocation: json['Store Image Location'], 
      storeName: json['Store Name'], 
      storeSectionName: json['Store Section Name'], 
      competitionGrandPricesGrid: CompetitionGrandPricesGrid.fromJson(json['Competition Grand Prices Grid']),
      competitionCompetitorsGrid: CompetitionCompetitorsGrid.fromJson(json['Competition Competitors Grid']),
      isLive: json['Is Live'],
      dateTime: json['Date Time'],
      joiningFee: json['Joining Fee'],
      isOver: json['Is Over'],
    );
  }

  void generateStoreId(){
    if(this.competitionId==null){
      return;
    }
    String lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    String competitionId = '';

    for(int i = 0; i < 20;i++){
      Random random = Random();
      competitionId += lettersAndNumbers[random.nextInt(lettersAndNumbers.length)];
    }

    
    this.competitionId= competitionId;
  }
}