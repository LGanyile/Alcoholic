 import '../models/beg_request.dart';
import '../models/recent_won_price.dart';

import '../models/utilities.dart';
import '../models/won_price_summary.dart';
import 'dao.dart';

class WonPriceDAO{


  //======================================================================================

  // Path '/recent_wins'
  // Used By The Home Screen Containing Recent Won Prices.
  // Invoked Time A User View The Recent Won Prices Screen (Home Screen).
  static List<RecentWonPrice> retrieveRecentWonPricesSummary(WonPricesOrder order){
    
    // Make use of pagination.

    DAO.path = '/recent_wins';
    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();

    List<RecentWonPrice> list = [];

    DAO.querySnapshot!.then((value) { 
      list = value.docs.map(
      (recentWonPrice)=> RecentWonPrice.fromJson(recentWonPrice)).toList();}
    );

    return list;

  }

  // Path '/recent_wins'
  // Invoked Whenever Somebody Wins A Competition.
  static void saveRecentWonPricesSummary(RecentWonPrice recentWonPrice){
     
    DAO.path = '/recent_wins';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(recentWonPrice.toJson());
  }

  // Path '/wonprice_summaries/recentWonPriceId'
  // Used By The The Winner Widget When Beggers Are Not Viewed.
  // Invoked Each Time A Recent Winner's Image Is Clicked.
  static WonPriceSummary retrieveWonPriceSummary(String recentWonPriceId){
     
    DAO.path = '/wonprice_summaries';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(recentWonPriceId);
    
    throw UnimplementedError();
  }

  // Path '/wonprice_summaries'
  // Invoked Whenever Somebody Wins A Competition.
  static void saveWonPricesSummary(WonPriceSummary wonPriceSummary){
     
    DAO.path = '/wonprice_summaries';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(wonPriceSummary.toJson());
    
  }

  // Path '/wonprices_summaries/wonpricesummaryid/beg_request'
  // Used By The The Winner Widget When Beggers Are Viewed.
  // Invoked By A User When Viewing A Winner's Beggers.
  static List<BegRequest> retrieveBegRequests(String wonPriceSummaryId){
     
    DAO.path = '/wonprices_summaries/$wonPriceSummaryId/beg_request';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('wonPriceSummaryFK', isEqualTo: wonPriceSummaryId).get();
    
    return [];
  }

  // Path '/wonprices_summaries/wonpricesummaryid/beg_request'
  // Invoked Whenever Somebody Is Begging A Winner.
  static void saveBegRequests(String wonPriceSummaryId, BegRequest begRequest){
    
    DAO.path = '/wonprices_summaries/$wonPriceSummaryId/beg_request';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(begRequest.toJson());
  }

}