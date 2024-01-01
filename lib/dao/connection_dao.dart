import '../models/message.dart';
import '../models/my_alcoholic.dart';
import '../models/my_know_by.dart';
import '../models/my_store_owner.dart';

import '../models/beg_request_summary.dart';
import '../models/conversation.dart';
import 'dao.dart';


class ConnectionDAO extends DAO{

  // Path /users/userId/conversations
  // Invoked once the first time a conversation is established between two users.
  static void createConversation(Conversation conversation){
    
    DAO.path = '/users/${conversation.user1Id}/conversations/';
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(conversation.toJson());
    
    DAO.path = '/users/${conversation.user2Id}/conversations/';
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(conversation.toJson());
  
  }

  // Path /users/userId/conversations/conversationId/messages
  // Invoked each time a user is sending a message.
  static void addMessage(Message message){
    
    DAO.path = '/users/${message.senderId}/conversations/'
    '${message.conversationFK}/messages';
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(message.toJson());

    DAO.path = '/users/${message.receiverId}/conversations/'
    '${message.conversationFK}/messages';
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(message.toJson());
  }

   // Path /users/userId/conversations/conversationId
   // Invoked whenever a user view a conversation.
  static Conversation? findConversation(String userId, String conversationId){
    
    DAO.path = '/users/$userId/conversations/';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(conversationId);

    return null;
  }

  // Path /users/userId/people_who_know_you
  // Invoked each time some user says knows the other user.
  static void saveMyKnownBy(MyKnownBy myKnownBy){
    
    DAO.path = '/users/${myKnownBy.userFK}/people_who_know_you/';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(myKnownBy.toJson());

  }

  // Path /users/userId/people_who_know_you
  //Invoked each time people who know the current user are viewed.
  static List<MyKnownBy> findMyKnownBy(String currentUserId){
    
    DAO.path = '/users/$currentUserId/people_who_know_you/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('userFK', isEqualTo: currentUserId).get();
    
    List<MyKnownBy> list = [];

    DAO.querySnapshot!.then((value) { 
      list = value.docs.map(
      (myKnownBy)=> MyKnownBy.fromJson(myKnownBy)).toList();}
    );

    return list;
  }

  // Path /users/userId/people_who_know_you
  /* Invoked each time a current user confirms that he/she knows the other user.
     After this method is invoked successfully the other user should be added to
     the current user's alcoholics.
  */
  static void removeMyKnownBy(String currentUserId, String otherUserId){
    
    DAO.path = '/users/$currentUserId/people_who_know_you/';
    
    DAO.deleteQuery = DAO.database.collection(DAO.path!)
    .doc(otherUserId).delete();
    
  }

  // Path /users/userId/my_alcoholics
  //Invoked after each time a current user confirms that he/she knows the other user.
  static void saveMyAlcoholic(MyAlcoholic myAlcoholic){
    
    DAO.path = '/users/${myAlcoholic.userFK}/my_alcoholics/';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(myAlcoholic.toJson());
  }

  // Path /users/userId/my_alcoholics
  //Invoked each time alcoholics for the current user are viewed.
  static List<MyAlcoholic> findMyAlcoholics(String currentUserId){
    
    DAO.path = '/users/$currentUserId/my_alcoholics/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('userFK', isEqualTo: currentUserId).get();
    
    return [];
  }

  // Path /users/userId/my_alcoholics
  // Invoked each time a user views online alcoholics or a new one get offline/online.
  static List<MyAlcoholic> findOnlineAlcoholics(String currentUserId){
    
    DAO.path = '/users/$currentUserId/my_alcoholics/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('userFK', isEqualTo: currentUserId).get();

    return [];
  }

  // Path /users/userId/my_alcoholics
  // Invoked to check whether there is a relationship between these two users after a login.
  static bool isMyAlcoholic(String currentUserId, String logginInUserId){
    
    DAO.path = '/users/$currentUserId/my_alcoholics/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('userFK', isEqualTo: currentUserId)
    .where('alcoholic.userId', isEqualTo: logginInUserId).get();

    return true;
  }

  // Path /users/userId/my_stores_owners
  //Invoked each time a user becomes a store member.
  static void saveMyStoreOwner(MyStoreOwner myStoreOwner){
    
    DAO.path = '/users/${myStoreOwner.userFK}/my_stores_owners/';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(myStoreOwner.toJson());

  }

  // Path /users/userId/my_stores_owners
  //Invoked each time store owners for the current user are viewed.
  static List<MyStoreOwner> findMyStoresOwners(String currentUserId){
    
    DAO.path = '/users/$currentUserId/my_stores_owners/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('userFK', isEqualTo: currentUserId).get();
    
    return [];
  }

  // Path /users/userId/my_stores_owners
  // Automaticaly invoked whenever a user leaves a store.
  static void removeMyStoreOwner(String currentUserId, String storeOwnerId){
    
    DAO.path = '/users/$currentUserId/my_stores_owners/';
    
    DAO.deleteQuery = DAO.database.collection(DAO.path!)
    .doc(storeOwnerId).delete();
  
  }

  // Path '/users/userId/beg_requests_summaries'
  // Invoked Whenever Somebody Is Begging A Winner.
  static void saveBegRequestSummary(String currentUserId, BegRequestSummary begRequestSummary){
    
    DAO.path = '/users/$currentUserId/beg_requests_summaries/';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(begRequestSummary.toJson());
  }

  // Path '/users/userId/beg_requests_summaries'
  /*Read beg requests from a DB, put it into a begRequests list, and return .*/
  static List<BegRequestSummary> readAllBegRequestsSummary(String currentUserId){
    
    DAO.path = '/users/$currentUserId/beg_requests_summaries/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('begger.userId', isEqualTo: currentUserId).get();
    
    return [];
  }

  // Accept A Beg Request.
  static void acceptBegRequest(String begRequestId){
    
    // Update the beg request by accepting it.
    // Call the cloud function updateBegRequest(begRequestId, true);

  }

  // Reject A Beg Request.
  static void rejectBegRequest(String begRequestId){

    // Update the beg request by rejecting it.
    // Call the cloud function updateBegRequest(begRequestId, false);

  }

}