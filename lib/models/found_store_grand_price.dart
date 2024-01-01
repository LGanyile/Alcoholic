class FoundStoreGrandPrice{
  String owningStoreFK; 
  String grandPriceFK;
  String foundStoreGrandPriceId; 
  List<String> alcoholImageLocations;
  String grandPriceDescription;

  FoundStoreGrandPrice({
    required this.owningStoreFK,
    required this.foundStoreGrandPriceId,
    required this.grandPriceFK,
    required this.alcoholImageLocations,
    required this.grandPriceDescription,
  });

  Map<String, dynamic> toJson(){
    return {
      'Found Store Grand Price Id': foundStoreGrandPriceId,
      'Owning Store FK': owningStoreFK,
      'Grand Price FK': grandPriceFK,
      'Alcohol Image Locations': convertImageLocationsToMap(),
      'Grand Price Description': grandPriceDescription,
    };
  }

  factory FoundStoreGrandPrice.fromJson(dynamic json){
    return FoundStoreGrandPrice(
      owningStoreFK: json['Owning Store FK'], 
      foundStoreGrandPriceId: json['Found Store Grand Price Id'], 
      grandPriceFK: json['Grand Price FK'],
      alcoholImageLocations: json['Alcohol Image Locations'].values as List<String>,
      grandPriceDescription: json['Grand Price Description'],
    );
  }

  Map<int, String> convertImageLocationsToMap() {

    Map<int, String> map = {}; 

    for (int imageIndex = 0; imageIndex < alcoholImageLocations.length;imageIndex) { 
      map.addAll({imageIndex:alcoholImageLocations[imageIndex]});
    } 
    return map;
  }

}