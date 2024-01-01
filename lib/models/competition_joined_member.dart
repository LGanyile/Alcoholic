class CompetitionJoinedMember{
  String competitionJoinedMemberId;
  String competitionFK;
  String threeCharacters;
  String imageLocaiton;

  CompetitionJoinedMember({
    required this.competitionJoinedMemberId,
    required this.competitionFK,
    required this.threeCharacters,
    required this.imageLocaiton,
  });

  Map<String, dynamic> toJson(){
    return {
      'Competition Joined Member Id': competitionJoinedMemberId,
      'Competition FK': competitionFK,
      '3 Characters': threeCharacters,
      'Image Locaiton': imageLocaiton,
    };
  }

  factory CompetitionJoinedMember.fromJson(dynamic json){
    return CompetitionJoinedMember(
      competitionJoinedMemberId: json['Competition Joined Member Id'],
      competitionFK: json['Competition FK'],
      threeCharacters: json['3 Characters'],
      imageLocaiton: json['Image Location'],
    );
  }
}