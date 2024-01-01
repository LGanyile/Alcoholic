import 'package:cloud_firestore/cloud_firestore.dart';

import '../models/graph theory/location.dart';
import 'dao.dart';

class LocationDAO{

  // Path /all_locations
  // Invoked Only By Admins.
  static void saveToAllLocations(Location location){

    DAO.path = '/all_locations';
   
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(location.toJson());
    
  }

  // Path /all_locations
  // Invoked Only By Admins.
  static List<Location> findAllLocations() {

    DAO.path = '/all_locations';
    
    DAO.querySnapshot = 
    DAO.database.collection(DAO.path!).get();

    List<Location> list = [];

    DAO.querySnapshot!.then((value) { 
      list = value.docs.map(
      (location)=> Location.fromJson(location)).toList();}
    );
    
    

    return list;
  }

  // Path /all_locations
  // Invoked Only By Admins.
  static void deleteLocation(String locationId){
    
    DAO.path = '/all_locations';
    
    DAO.deleteQuery = DAO.database.collection(DAO.path!)
    .doc(locationId).delete();

  }

  // Path /available_locations
  /* Automatically Created If There Is A New Store
     To Register Which Is The First One Residing There.
  */
  static void saveToAvailableLocations(Location location){

    DAO.path = '/available_locations';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(location.toJson());

  }

  // Path /available_locations
  static List<Location> findAvailableLocations(){

    DAO.path = '/available_locations';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();

    return [];
  }
}