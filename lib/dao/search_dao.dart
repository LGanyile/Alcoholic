import '../models/found_alcohol.dart';
import '../models/found_store.dart';
import '../models/found_store_grand_price.dart';
import '../models/found_store_with_competition.dart';
import '../models/found_store_with_winner.dart';
import '../models/found_store_without_competition.dart';
import '../models/graph theory/section_name.dart';
import '../models/store_name_info.dart';
import 'dao.dart';

class SearchDAO{

   //======================================================================================

  // Path '/found_alcohol'
  // Invoked Each Time A Competition Is Creted Is Saved.
  static void saveFoundAlcohol(FoundAlcohol foundAlcohol){
    
    DAO.path = '/found_alcohol';

    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(foundAlcohol.toJson());
  }

  // Path '/found_alcohol'
  // Invoked By Default During The Search Of An Alcohol If It Name Is Not Given.
  static List<FoundAlcohol> retrieveAllFoundAlcohol(){
    
    // Pagination needs to be applied here.
    DAO.path = '/found_alcohol';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();

    List<FoundAlcohol> list = [];

    DAO.querySnapshot!.then((value) { 
      list = value.docs.map(
      (foundAlcohol)=> FoundAlcohol.fromJson(foundAlcohol)).toList();}
    );

    return list;

  }

  // Path '/found_alcohol'
  // Used By The Search Screen When Searching For Certain Alcohol.
  // Invoked By A User When Searching For Some Alcohol By Name.
  static List<FoundAlcohol> retrieveFoundAlcohol(String alcoholName){
    
    DAO.path = '/found_alcohol';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('alcoholName', isEqualTo: alcoholName).get();

    return [];
  }

   //======================================================================================

  // Path '/found_stores_with_winner'
  // Invoked Each Time There Is A Winner
  static void saveFoundStoreWithWinner(FoundStoreWithWinner foundStoreWithWinner){
    
    DAO.path = '/found_stores_with_winner';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(foundStoreWithWinner.toJson());
  }

  // Path '/found_stores_with_winner'
  static List<FoundStoreWithWinner> retrieveFoundStoresWithWinner(String suburb){

    return [];
  }

  // Path '/found_stores_with_winner'
  static List<FoundStoreWithWinner> findFoundStoresWithWinner(String storeName){

    return [];
  }

  // Path '/found_stores_with_competition'
  // Invoked Each Time A Competition Is Created.
  static void saveFoundStoreWithCompetition(FoundStoreWithCompetition foundStoreWithCompetition){
    
    DAO.path = '/found_stores_with_competition';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(foundStoreWithCompetition.toJson());
  }

  // Path '/found_stores_with_competition'
  static List<FoundStoreWithCompetition> retrieveFoundStoresWithCompetition(String suburb){

    return [];
  }

  // Path '/found_stores_with_competition'
  static List<FoundStoreWithCompetition> findFoundStoresWithCompetition(String storeName){

    return [];
  }

  // Path '/found_stores_without_competition'
  /* Automatically Invoked If It Is Time For A Competition To Begin.*/
  static void saveFoundStoreWithoutCompetition(FoundStoreWithoutCompetition foundStoreWithoutCompetition){
    
    DAO.path = '/found_stores_without_competition';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(foundStoreWithoutCompetition.toJson());

  }

  // Path '/found_stores_without_competition'
  static List<FoundStoreWithoutCompetition> retrieveFoundStoresWithoutCompetition(String suburb){

    return [];
  }

  // Path '/found_stores_without_competition'
  static List<FoundStoreWithoutCompetition> findFoundStoresWithoutCompetition(String storeName){

    return [];
  }

  // Collection Group Query - Path /found_stores
  // Invoked By Default During The Search Of A Store Or Suburb If It Name Is Not Given.
  static List<FoundStore> retrieveAllFoundStore(){
    
    /*
    Make sure you always checking from the client side which sort of data you getting.
     */
    // Pagination needs to be applied here.
    DAO.path = '/found_stores';
    // DAO.querySnapshot = collection_group('DAO.path')

    return [];
  }

  // Collection Group Query - Path /found_stores
  // Invoked When The Search Of Stores By Name Is Triggered.
  static List<FoundStore> retrieveFoundStoreByName(String storeName){
    /* Use Collection Group Query With 'Store Name' As 
    A Document Property And Use Three Collections Namely, 
    found_stores_with_competition, found_stores_without_competition and
    found_stores_with_winners. Make sure you always checking from the 
    client side whether the sort of data you getting is exactly what you 
    expected.
    */

    DAO.path = '/found_stores';
    // DAO.querySnapshot = collection_group(DAO.path).where('storeName', '==', storeName);

    return [];
  }

  // Collection Group Query - Path /found_stores
  // Invoked When The Search Of Stores By Suburb Is Triggered.
  static List<FoundStore> retrieveFoundStoreBySuburb(String suburb){
    /* Use Collection Group Query With 'Suburb Name' As 
    A Document Property And Use Three Collections Namely, 
    found_stores_with_competition, found_stores_without_competition and
    found_stores_with_winners. Make sure you always checking from the 
    client side whether the sort of data you getting is exactly what you 
    expected.
    */

    DAO.path = '/found_stores';
    // DAO.querySnapshot = collection_group(DAO.path).where('sectionName', '==', sectionName);

    return [];
  }

  static bool storeExist(String storeName){
    return retrieveFoundStoreByName(storeName).isNotEmpty;
  }
  
  //======================================================================================

  // Path /stores_names_info
  static StoreNameInfo? findStoreNameInfo(String storeNameInfoId){

    DAO.path = '/stores_names_info';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storeNameInfo', isEqualTo: storeNameInfoId).get();

    return null;
  }

  // Path /stores_names_info
  static List<StoreNameInfo> findAllStoreNameInfo(){
    
    // Pagination needs to be applied here.
    DAO.path = '/stores_names_info';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();

    return [];
  }

  // Path /stores_names_info
  static List<StoreNameInfo> findSuburbStoreNameInfo(SectionName sectionName){
    
    DAO.path = '/stores_names_info';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('sectionName', isEqualTo: sectionName).get();

    return [];
  }


  //======================================================================================

  // Path '/found_stores_with_competition/foundStoreId/found_store_grand_prices'
  // Invoked Each Time A Grand Price Is Saved.
  void saveFoundStoreGrandPrice(String foundStoreId, FoundStoreGrandPrice foundStoreGrandPrice){
    
    DAO.path = '/found_stores_with_competition/$foundStoreId/found_store_grand_prices';
    
     DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(foundStoreGrandPrice.toJson());
  }

  // Path '/found_stores_with_competition/foundStoreId/found_store_grand_prices'
  // Invoked After A Store Without Competition Is Found.
  List<FoundStoreGrandPrice> retrieveFoundStoreGrandPrice(String foundStoreId){
    
    DAO.path = '/found_stores_with_competition/$foundStoreId/found_store_grand_prices';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('owningStoreFK', isEqualTo: foundStoreId).get();

    return [];
  }

  // Automatically Invoked Everyday.
  static void deleteFoundAlcoholByDate(DateTime beforeDate){
    // Cloud Function
  }

  /* Automatically Invoked After 24 Hours If And Only If Somebody Has 
  Won And There Are Comming Competition(s) To Be Entered For The Store.*/
  static void deleteFoundStoreWithWinner(String foundStoreId){
    // Cloud Function
  }


  /* Automatically Invoked If It Is Time For A Competition To Begin.*/
  static void deleteFoundStoreWithCompetition(String foundStoreId){
    // Cloud Function
  }

  /* Automatically Invoked After The Competition Has Completed.*/
  static void deleteFoundStoreWithoutCompetition(String foundStoreId){
    // Cloud Function
  }

  //======================================================================================
  
}