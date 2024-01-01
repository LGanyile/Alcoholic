import 'graph theory/location.dart';

class User{

  String userId;
  String username;
  String password;
  String cellNumber;
  String imageLocation;
  Location location;
  bool isMale;
  bool isOwner;
  bool isOnline;
  bool isAdmin;

  User({
    required this.userId,
    required this.username,
    required this.password,
    required this.cellNumber,
    required this.imageLocation,
    required this.location,
    required this.isMale,
    this.isOwner = false,
    this.isOnline = false,
    this.isAdmin = false,
  });

  Map<String,dynamic> toJson(){
    return {
      'User Id': userId,
      'Username': username,
      'Password': password,
      'Cell Number': cellNumber,
      'Image Location': imageLocation,
      'Location': location.toJson(),
      'Gender': isMale?'Male':'Female',
      'Is Owner': isOwner?'Yes':'No',
      'Is Online': isOnline?'Yes':'No',
      'Is Admin': isAdmin?'Yes':'No',
    };
  }

  factory User.fromJson(dynamic json){
    return User( 
      userId: json['User Id'],
      username: json['Username'], 
      password: json['Password'],
      cellNumber: json['Cell Number'],
      imageLocation: json['Image Location'],
      location: Location.fromJson(json['Location']), 
      isMale: json['Gender']=='Male'?true:false, 
      isOwner: json['Is Owner']=='Yes'?true:false,
      isOnline: json['Is Online']=='Yes'?true:false,
      isAdmin: json['Is Admin']=='Yes'?true:false,
    );
  }
}