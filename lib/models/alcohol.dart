import 'utilities.dart';

class Alcohol{

  String fullname;
  String volume;
  String alcoholPercent;
  String imageLocation;
  double price;
  AlcoholType alcoholType;

  Alcohol({
    required this.fullname,
    required this.volume,
    required this.alcoholPercent,
    required this.imageLocation,
    required this.price,
    required this.alcoholType,
  });

  Map<String,dynamic> toJson(){
    return {
      'Full Name': fullname,
      'Volume': volume,
      'Alcohol Percent': alcoholPercent,
      'Image Location': imageLocation,
      'Price': price,
      'Type': alcoholType,
    };
  }

  factory Alcohol.fromJson(dynamic json){
    return Alcohol(
      fullname: json['Full Name'], 
      volume: json['Volume'], 
      alcoholPercent: json['Alcohol Percent'],
      imageLocation: json['Image Location'],
      price: json['Price'],
      alcoholType: json['Type'],
    );
  }
}