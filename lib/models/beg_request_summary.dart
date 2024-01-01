import 'user.dart';

class BegRequestSummary{
  String begRequestSummaryId;
  User begger;
  String beggingText;
  bool? isAccepted;

  BegRequestSummary({
    required this.begRequestSummaryId,
    required this.begger,
    required this.beggingText,
    this.isAccepted,
  });

  Map<String,dynamic> toJson(){
    return {
      'Beg Request Summary Id': begRequestSummaryId,
      'Begger': begger.toJson(),
      'Begging Text': beggingText,
      'Is Accepted': isAccepted,  
    };
  }

  factory BegRequestSummary.fromJson(dynamic json){
    return BegRequestSummary(
      begRequestSummaryId: json['Beg Request Summary Id'],
      begger: User.fromJson(json['Begger']),
      beggingText: json['Begging Text'],
      isAccepted: json['Is Accepted'],
    );
  }

}