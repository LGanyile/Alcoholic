import 'beg_request_summary.dart';
import 'user.dart';

class BegRequest extends BegRequestSummary{
  String begRequestSummmaryId;
  String wonPriceSummaryFK;
  DateTime dateCreated;
  

  BegRequest({
    required this.begRequestSummmaryId,
    required this.wonPriceSummaryFK,
    begger,
    beggingText,
    begRequestSummaryId,
    required this.dateCreated,
    isAccepted,
  }):super(
    begRequestSummaryId: begRequestSummaryId,
    begger: begger,
    beggingText: beggingText,
    isAccepted: isAccepted,
  );

  @override
  Map<String,dynamic> toJson(){
    Map<String, dynamic> map = super.toJson();
    map.addAll({
      'Won Price Summary FK': wonPriceSummaryFK,
      'Date Created': '${dateCreated.hour}:${dateCreated.minute}',
      
    });
    return map;
  }

  factory BegRequest.fromJson(dynamic json){
    return BegRequest(
      begRequestSummmaryId: json['Beg Request Summmary Id'],
      wonPriceSummaryFK: json['Won Price Summary FK'],
      begger: User.fromJson(json['Begger']),
      beggingText: json['Begging Text'],
      dateCreated: json['Date Created'],
      isAccepted: json['Is Accepted'],
    );
  }


}