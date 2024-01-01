class CompetitionGrandPricesGrid{

  String competitionPricesGridId;
  String competitionFK;
  int numberOfGrandPrices;
  int currentlyPointedTokenIndex;
  // The order in which grand prices were visited when this competition was live.
  // This property is used for the sake of viewing competitons which have already played.
  List<int> grandPricesOrder; 
  // Documents of this type contain a sub collection of competition tokens.

  Duration duration; 
  bool? hasStarted;
  bool? hasStopped; 

  CompetitionGrandPricesGrid({
    required this.competitionPricesGridId,
    required this.competitionFK,
    required this.numberOfGrandPrices,
    required this.currentlyPointedTokenIndex,
    this.grandPricesOrder = const[],
    required this.duration,
    this.hasStarted = false,
    this.hasStopped = false,
    
  });

  Map<String,dynamic> toJson(){
    return {
      'Competition Prices Grid Id': competitionPricesGridId,
      'Competition FK': competitionFK,
      'Number Of Grand Prices': numberOfGrandPrices,
      'Currently Pointed Token Index': currentlyPointedTokenIndex,
      'Grand Prices Order': grandPricesOrder,
      'Duration': duration,
      'Has Started': hasStarted,
      'Has Stopped': hasStopped,
    };
  }

  factory CompetitionGrandPricesGrid.fromJson(dynamic json){
    return CompetitionGrandPricesGrid(
      competitionPricesGridId: json['Competition Prices Grid Id'], 
      competitionFK: json['Competition FK'],
      numberOfGrandPrices: json['Number Of Grand Prices'], 
      currentlyPointedTokenIndex: json['Currently Pointed Token Index'],
      grandPricesOrder: json['Grand Prices Order'],
      duration: json['Duration'],
      hasStarted: json['Has Started'],
      hasStopped: json['Has Stopped'],
    );
  }

}