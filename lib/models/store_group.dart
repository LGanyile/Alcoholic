class StoreGroup{
  String storeGroupId;
  String storeNameInfoFK;
  String winnerImageLocation;
  String winnerUsername;
  String wonPriceDescription;

  StoreGroup({
    required this.storeGroupId,
    required this.storeNameInfoFK,
    required this.winnerImageLocation,
    required this.winnerUsername,
    required this.wonPriceDescription,
  });

  Map<String, dynamic> toJson(){
    return {
      'Store Group Id': storeGroupId,
      'Store Name Info FK': storeNameInfoFK,
      'Winner Image Location': winnerImageLocation,
      'Winner Username': winnerUsername,
      'Won Price Description': wonPriceDescription,
    };
  }

  factory StoreGroup.fromJson(dynamic json){
    return StoreGroup(
      storeGroupId: json['Store Group Id'],
      storeNameInfoFK: json['Store Name Info FK'],
      winnerUsername: json['Winner Username'],
      winnerImageLocation: json['Winner Image Location'],
      wonPriceDescription: json['Won Price Description'],
    );
  }
}