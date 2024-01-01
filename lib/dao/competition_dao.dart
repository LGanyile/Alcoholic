import '../models/competition.dart';

import '../models/competition_competitors_grid.dart';
import '../models/competition_grand_price_token.dart';
import '../models/competition_grand_prices_grid.dart';
import '../models/competition_competitor_token.dart';
import '../models/competition_joined_member.dart';
import 'dao.dart';

class CompetitionDAO extends DAO{

  //===========================================================================
  // Path /competitions
  // Automatically invoked by a program when a competition is created(Screen 10.2.1).
  static void saveCompetition(Competition competition){
    
    DAO.path = '/competitions';
    
     DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(competition.toJson());

  }

  // Path /competitions
  // Invoked whenever one needs to view the competition(Screen 6.1.1).
  static Competition? retrieveCompetition(String competitionId){
    
    DAO.path = '/competitions/$competitionId';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(competitionId);

    throw UnimplementedError();
  }

  // Automatically called each time a grand price pointer is updated.
  static void updatePointedGrandPrice(String competitionId, int newPointedGrandPriceIndex){
    
    // Cloud Function.
    // add to an order of grand prices only if the competition is live.
  }

  // Automatically called each time a grand price pointer is updated.
  static void updatePointedCompetitor(String competitionId, int newPointedCompetitorIndex){
   
   // Cloud Function.
    // add to an order of visitors only if the competition is live.
  }


  // Now The Competition Has A Winner.
  static void updateCompetitionWinner(String competitionId, String competitionCompetitorId){
    // Cloud Function.
  }

  // Path /competitions
  // Invoked by an admin to get rid of the inconvenient competitions.
  static void deleteCompetition(String competitionId){
    
    DAO.path = '/competitions/$competitionId';
    
    DAO.deleteQuery = DAO.database.collection(DAO.path!)
    .doc(competitionId).delete();

    throw UnimplementedError();
  }


  // Path /competitions/competitionId/grand_prices_grid/
  // Automatically invoked after a competition is saved by a store owner(Screen 2.2.1).
  static void saveCompetitionPricesGrid(String competitionId,CompetitionGrandPricesGrid competitionPriceGrid){
      
    DAO.path = '/competitions/$competitionId/grand_prices_grid';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(competitionPriceGrid.toJson());
    
  }

  // Path /competitions/competitionId/grand_prices_grid/grandPriceGridId
  // Invoked whenever a competition is viewed(Screen 6.1.1)
  static CompetitionGrandPricesGrid retrieveCompetitionPricesGrid(String competitionId, String competitionGrandPricesGridId){
    
    DAO.path = '/competitions/$competitionId/grand_prices_grid';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(competitionGrandPricesGridId);
    
    throw UnimplementedError();
  }

  // Path /competitions/competitionId/competitors_grid/competitorGridId
  // Automatically invoked after a competition is saved by a store owner(Screen 2.2.1.1).
  static void saveCompetitionCompatitorsGrid(String competitionId,CompetitionCompetitorsGrid competitionCompatitorsGrid){
      
      DAO.path = '/competitions/$competitionId/competitors_grid/';
      
      DAO.saveQuery = DAO.database.collection(DAO.path!)
      .add(competitionCompatitorsGrid.toJson());
  }

  // Path /competitions/competitionId/competitors_grid/competitorGridId
  // Invoked only once during the process of picking a winner(Screen 2.2.1.1).
  static CompetitionCompetitorsGrid retrieveCompetitionCompetitorsGrid(String competitionId, String competitionCompetitorsGridId){
    
    DAO.path = '/competitions/$competitionId/competitors_grid/';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(competitionCompetitorsGridId);
    
    throw UnimplementedError();
  }

  
  // Path /competitions/competitionId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Automatically invoked when a competition grand price grid is created.
  static void saveCompetitionGrandPriceToken(String competitionId,String grandPriceGridId, CompetitionGrandPriceToken competitionGrandPriceToken){
    
    DAO.path = '/competitions/$competitionId/grand_prices_grid/$grandPriceGridId/grand_price_tokens';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(competitionGrandPriceToken.toJson());
  }

  // Path /competitions/competitionId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Invoked when the competitions is about to begin.
  // Used To Populate The Screen That Shows All Grand Prices.
  static List<CompetitionGrandPriceToken> retrieveCompetitionGrandPriceTokens(String competitionId, String competitionGrandPriceGridId){
    
    DAO.path = '/competitions/$competitionId'
    '/grand_prices_grid/$competitionGrandPriceGridId'
    '/grand_price_tokens';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('competitionCompetitorsGridFK', isEqualTo: 
    competitionGrandPriceGridId).get();

    List<CompetitionGrandPriceToken> list = [];

    DAO.querySnapshot!.then((value) { 
      list = value.docs.map(
      (token)=> CompetitionGrandPriceToken.fromJson(token)).toList();}
    );

    return list;

  }

  // Path /competitions/competitionId/competitors_grid/competitorsGridId/competitors_tokens/competitorTokenId
  // Invoked when the competitions is about to begin.
  // Automatically invoked when a competition competitor grid is created.
  static void saveCompetitionCompetitorToken(String competitionId,String competitorsGridId, CompetitionCompetitorToken competitionCompetitorToken){
    
    DAO.path = '/competitions/$competitionId/competitors_grid/'
    '$competitorsGridId/competitors_tokens';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(competitionCompetitorToken.toJson());
  }

  // Path /competitions/competitionId/competitors_grid/competitorsGridId/competitors_tokens/grandPriceTokenId
  // Used To Populate The Screen That Shows All Competitors.
  static List<CompetitionCompetitorToken> retrieveCompetitionCompetitorTokens(String competitionId, String competitorsGridId){
    
    DAO.path = '/competitions/$competitionId/competitors_grid/'
    '$competitorsGridId/competitors_tokens';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('competitionCompetitorsGridFK', isEqualTo:
    competitorsGridId).get();

    return [];
  }

  //===========================================================================

  // Path - /competitions/competitionId/competition_joined_members
  static void saveCompetitionJoinedMember(String competitionId,CompetitionJoinedMember competitionJoinedMember){
    
    DAO.path = '/competitions/$competitionId/competition_joined_members';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(competitionJoinedMember.toJson());
    
  }

  // Path - /competitions/competitionId/competition_joined_members
  static CompetitionJoinedMember? retrieveCompetitionJoinedMemeber(String competitionId, String competitionJoinedMemberId){

    DAO.path = '/competitions/$competitionId/competition_joined_members';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(competitionJoinedMemberId);
    
    return null;

  }

  // Path /competitions/competitionId/competition_joined_members
  // Check If A Particular User Has Entered The Competition.
  static bool contains(String competitionId, String competitorId){

      return retrieveCompetitionJoinedMemeber(competitionId, competitorId) != null;
    
  }

  

  static void updateIsLive(String competitionId, bool isLive){
    // Cloud Function.
  }

  static void updateCompetitionDate(String competitionId, DateTime dateTime){
    // Cloud Function.
  }

  static void updateIsOver(String competitionId, bool isOver){
    // Cloud Function.
  }

}