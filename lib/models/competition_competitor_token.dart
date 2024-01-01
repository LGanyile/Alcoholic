class CompetitionCompetitorToken{

  String competitionCompetitorTokenId;
  String? competitionCompetitorsGridFK;
  int tokenIndex;
  bool isPointed;
  String competitionCompetitorImageLocation;
  String generatedUsername;
  

  CompetitionCompetitorToken({
    required this.competitionCompetitorTokenId,
    this.competitionCompetitorsGridFK,
    required this.tokenIndex,
    required this.isPointed,
    required this.competitionCompetitorImageLocation,
    required this.generatedUsername,
  });

  Map<String, dynamic> toJson(){
    return {
      'Competition Competitor Token Id': competitionCompetitorTokenId,
      'Competition Competitors Grid FK': competitionCompetitorsGridFK,
      'Token Index': tokenIndex,
      'Is Pointed': isPointed,
      'Competition Competitor Image Location': competitionCompetitorImageLocation,
      'User Name [Generated]': generatedUsername,
    };
  }

  factory CompetitionCompetitorToken.fromJson(dynamic json){
    return CompetitionCompetitorToken(
      competitionCompetitorTokenId: json['Competition Competitor Token Id'],
      competitionCompetitorsGridFK: json['Competition Competitor Grid FK'],
      tokenIndex: json['Token Index'],
      isPointed: json['Is Pointed'],
      competitionCompetitorImageLocation: json['Competition Competitor Image Location'],
      generatedUsername: json['User Name [Generated]']
    );
  }

}