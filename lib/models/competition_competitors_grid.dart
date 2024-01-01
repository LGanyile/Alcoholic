class CompetitionCompetitorsGrid{

  String competitionCompetitorsGridId;
  String competitionFK;
  int numberOfCompetitors;
  int currentlyPointedTokenIndex;
  
  // The order in which participants were visited when this competition was live.
  // This property is used for the sake of viewing competitions which have already played.
  List<int> competitorsOrder; 
  // Documents of this type contain a sub collection of competition tokens.

  Duration duration; 
  final int maxNoOfCompetitors;
  bool? hasStarted;
  bool? hasStopped; 

  CompetitionCompetitorsGrid({
    required this.competitionCompetitorsGridId,
    required this.competitionFK,
    required this.numberOfCompetitors,
    required this.currentlyPointedTokenIndex,
    this.competitorsOrder = const[],

    required this.duration,
    required this.maxNoOfCompetitors,
    this.hasStarted = false,
    this.hasStopped = false,
  });

  Map<String,dynamic> toJson(){
    return {
      'Competition Competitors Grid Id': competitionCompetitorsGridId,
      'Competition FK': competitionFK,
      'Number Of Competitors': numberOfCompetitors,
      'Currently Pointed Token Index': currentlyPointedTokenIndex,
      'Competitors Order': competitorsOrder,
      'Duration': duration,
      'Max No Of Competitors': maxNoOfCompetitors,
      'Has Started': hasStarted,
      'Has Stopped': hasStopped,
    };
  }

  factory CompetitionCompetitorsGrid.fromJson(dynamic json){
    return CompetitionCompetitorsGrid(
      competitionCompetitorsGridId: json['Competition Competitors Grid Id'], 
      competitionFK: json['Competition FK'],
      numberOfCompetitors: json['Number Of Competitors'], 
      currentlyPointedTokenIndex: json['Currently Pointed Token Index'],
      competitorsOrder: json['Competitors Order'],
      duration: json['Duration'],
      maxNoOfCompetitors: json['Max No Of Competitors'],
      hasStarted: json['Has Started'],
      hasStopped: json['Has Stopped'],
    );
  }

}