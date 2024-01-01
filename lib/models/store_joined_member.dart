import 'dart:math';

class StoreJoinedMember{
  String storeJoinedMemberId;
  String storeFK;
  String userId;
  String? threeCharacters;
  String imageLocaiton;

  StoreJoinedMember({
    required this.storeJoinedMemberId,
    required this.storeFK,
    required this.userId,
    this.threeCharacters,
    required this.imageLocaiton,
  });

  Map<String, dynamic> toJson(){
    generatePostId();
    return {
      'Store Joined Member Id': storeJoinedMemberId,
      'Store FK': storeFK,
      'User Id': userId,
      '3 Characters': threeCharacters,
      'Image Locaiton': imageLocaiton,
    };
  }

  factory StoreJoinedMember.fromJson(dynamic json){
    return StoreJoinedMember(
      storeJoinedMemberId: json['Store Joined Member Id'],
      storeFK: json['Store FK'],
      userId: json['User Id'],
      threeCharacters: json['3 Characters'],
      imageLocaiton: json['Image Location'],
    );
  }

  void generatePostId(){
    if(threeCharacters != null){
      return;
    }
    String lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    String memberThreeDigits = '';

    for(int i = 0; i < 3;i++){
      Random random = Random();
      memberThreeDigits += lettersAndNumbers[random.nextInt(lettersAndNumbers.length)];
    }

    threeCharacters =  memberThreeDigits;
        
  }
}