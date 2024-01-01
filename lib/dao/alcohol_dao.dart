import '../models/alcohol.dart';
import '../models/utilities.dart';
import 'dao.dart';

class AlcoholDAO extends DAO{

  // Path /all_alcohol
  // Invoked each time a new alcohol is available for stores to use/pick/availe.
  static void saveAlcohol(Alcohol alcohol){
    
    DAO.path = '/all_alcohol';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(alcohol.toJson());
  }

  // Path /all_alcohol
  // Read a some alcohol from a DAO.database.
  static List<Alcohol> readAlcoholByType(AlcoholType alcoholType){
    
    DAO.path = '/all_alcohol';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('alcoholType', isEqualTo: alcoholType).get();

    List<Alcohol> list = [];

    DAO.querySnapshot!.then((value) { 
      list = value.docs.map(
      (alcohol)=> Alcohol.fromJson(alcohol)).toList();}
    );

    return list;

  }

  // Path /all_alcohol
  // Read a some alcohol from a DAO.database.
  static List<Alcohol> readAlcoholByName(String alcoholName){
    
    DAO.path = '/all_alcohol';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!
    ).where('fullname', isEqualTo: alcoholName).get();

    return [];
  }

  // Path /available_alcohol
  // Each time a store owner adds an alcohol to his/her 
  // store assuming it does not exist in the available alcohol 
  // collection it get added automatically otherwise it doesn't.
  // Invoked each time a new alcohol is available for stores to use/pick/availe.
  static void saveAvailableAlcohol(Alcohol alcohol){
    
    DAO.path = '/available_alcohol';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(alcohol.toJson());

  }

  // Path /available_alcohol
  // Visible to all users. 
  // Read a some alcohol from a DAO.database.
  static List<Alcohol> readAvailableAlcoholByType(AlcoholType alcoholType){
    
    DAO.path = '/available_alcohol';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('alcoholType', isEqualTo:alcoholType).get();

    return [];
  }

  // Path /available_alcohol
  // Visible to all users.
  // Read a some alcohol from a DAO.database.
  static List<Alcohol> readAvailableAlcoholByName(String alcoholName){
    
    DAO.path = '/available_alcohol';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('fullname', isEqualTo:alcoholName).get();

    return [];
  }
}