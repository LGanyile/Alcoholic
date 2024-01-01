class CompetitionGrandPriceToken{

  String grandPriceTokenId;
  String? competitionGrandPricesGridFK;
  int tokenIndex;
  bool isPointed;
  String grandPriceImageLocation;
  bool hasManyAlcohol;

  CompetitionGrandPriceToken({
    required this.grandPriceTokenId,
    this.competitionGrandPricesGridFK,
    required this.tokenIndex,
    required this.isPointed,
    required this.grandPriceImageLocation,
    required this.hasManyAlcohol,
  });

  Map<String, dynamic> toJson(){
    return {
      'Grand Price Token Id': grandPriceTokenId,
      'Competition Grand Prices Grid FK': competitionGrandPricesGridFK,
      'Token Index': tokenIndex,
      'Is Pointed': isPointed,
      'Grand Price Image Location': grandPriceImageLocation,
      'Has Many Alcohol': hasManyAlcohol,
    };
  }

  factory CompetitionGrandPriceToken.fromJson(dynamic json){
    return CompetitionGrandPriceToken(
      grandPriceTokenId: json['Grand Price Token Id'],
      competitionGrandPricesGridFK: json['Competition Grand Prices Grid FK'],
      tokenIndex: json['Token Index'],
      isPointed: json['Is Pointed'],
      grandPriceImageLocation: json['Grand Price Image Location'],
      hasManyAlcohol: json['Has Many Alcohol'],
    );
  }

}

