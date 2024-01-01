import '../models/graph theory/section_name.dart';
import '../models/user.dart';
import 'dao.dart';

class UserDAO{

  // Path /users
  // Invoked each time a new user is registered.
  static void saveUser(User user){
    
    DAO.path = '/users';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(user.toJson());
  }

  // Path /users
  // Read a user from a DAO.database.
  static User? readUser(String userId){
    
    DAO.path = '/users';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(userId);
    
    return null;
  }

  static void updateBegRequest(String begRequestId, bool? isAccepted){
    // Cloud Function
  }

  static void updateUsername(String userId, String username){
    // Cloud function
  }

  static void updateUserPassword(String userId, String password){
    // Cloud function
  }

  static void updateUserCellNumber(String userId, String cellNumber){
    // Cloud function
  }

  static void updateUserSectionName(String userId, SectionName sectionName){
    // Cloud function
  }

  static void updateUserImageLocation(String userId, String imageLocation){
    // Cloud function
  }

  static void updateIsOnline(String userId, bool isOnline){
    // Cloud function
  }

  
}