import '../models/graph theory/section_name.dart';
import '../models/normal_store_post.dart';
import '../models/store_joined_member.dart';

import '../models/competition_joined_member.dart';
import '../models/store_post_involved_user.dart';

import '../models/alcohol.dart';
import '../models/competition.dart';
import '../models/future_store_post.dart';
import '../models/past_store_post.dart';
import '../models/store_name_info.dart';

import '../models/store_group.dart';
import '../models/store_post_comment.dart';
import '../models/store.dart';
import '../models/user.dart';
import '../models/utilities.dart';
import 'competition_dao.dart';
import 'dao.dart';
import 'user_dao.dart';


class StoreDAO extends DAO{

  // Path /stores/storeId
  // 1. Only allow a creation of a new store during a registration of a new store owner.
  // Called Each Time A New Store Is Registered.
  void saveStore(Store store){
    
    DAO.path = '/stores/';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(store.toJson());
    
  }

  // Path /stores/storeId
  // Called to view store's information.
  // Only logged in admins and store owners can read store's info.
  Store? retrieveStore(String storeId){
   
    DAO.path = '/stores';

    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(storeId);

    return null;
  }

  // Path /stores/storeId
  // Only admins can delete a store.
  void deleteStore(String storeId){
    
    DAO.path = '/stores/';

    DAO.deleteQuery = DAO.database.collection(DAO.path!)
    .doc(storeId).delete();
  }

  // Path /stores/storeId
  // Only admins and store owners can view all stores.
  List<Store> retrieveAllStores(){

    // Use Pagination
    DAO.path = '/stores';

    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();
    
   List<Store> list = [];

    DAO.querySnapshot!.then((value) { 
      list = value.docs.map(
      (store)=> Store.fromJson(store)).toList();}
    );

    return list;
  }

  // Path /stores/storeId/store_competitions/storeCompetitionId
  // Invoked by a store owner during his or her registration(Screen 1.2).
  void saveStoreCompetition(Competition competition){
    
    DAO.path = '/stores/${competition.storeFK}/store_competitions/';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(competition.toJson());
    
    // Performed After A Competition Is Saved To My Store Competitions.
    CompetitionDAO.saveCompetition(competition);
  }

  // Collection Group Query - Path /store_competitions/ (Has No Unit Test Yet.)
  // Invoked by users to see all competitions from all stores.
  List<Competition> retrieveAllCompetitions(){
    
    DAO.path = '/store_competitions';
    // DAO.querySnapshot = collection_group(DAO.path);
    throw UnimplementedError();
  }

  // Collection Group Query - Path /store_competitions (Has No Unit Test Yet.)
  // Invoked by users to see all comming competitions from all stores.
  List<Competition> retrieveAllCommingCompetitions(){
    DAO.path = '/store_competitions';
    // DAO.querySnapshot = collection_group('DAO.path').where('dateTime', >, DateTime.now())
    throw UnimplementedError();
  }

  // Path /stores/storeId/store_competitions/
  // Invoked by users to see all competitions for a particular store.
  List<Competition> retrieveAllStoreCompetitions(String storeId){
    
    DAO.path = '/stores/$storeId/store_competitions/';

    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();
    throw UnimplementedError();
  }

  // Path /stores/storeId/store_competitions
  // Invoked by users to see all comming competitions for a particular store.
  List<Competition> retrieveAllStoreCommingCompetitions(String storeId){
    
    DAO.path = '/stores/$storeId/store_competitions/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('dateCreate', isGreaterThan: DateTime.now()).get();
    
    throw UnimplementedError();
  }

  //======================================================================================
  // Path /store_names
  // Called Each Time A New Store Is Registered.
  void saveStoreNameInfo(StoreNameInfo storeNameInfo){
    
    DAO.path = '/store_names';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(storeNameInfo.toJson());
    
  }

  // Path /store_names
  // Called Each Time A New Store Is Registered.
  StoreNameInfo? retrieveStoreNameInfo(String storeNameInfoId){
    
    DAO.path = '/store_names/$storeNameInfoId';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(storeNameInfoId);
    
    return null;
  }

   // Path /store_names
  // Called Only The First Time The Stores Tab Is Clicked.
  List<StoreNameInfo> retrieveAllStoreNameInfo(){
    
    // Use Pagination
    DAO.path = '/store_names';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();
   
    return [];
  }

  // Path /store_names
  // Called Only If The Stores Tab Is Clicked And A Search By Store Name Is Initiated.
  List<StoreNameInfo> retrieveStoreNameInfoByName(String storeName){
    
    // Use Pagination
    DAO.path = '/store_names';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storeName', isEqualTo: storeName).get();
    
    return [];
  }

   // Path /store_names
  // Called Only If The Store Tab Is Clicked And A Search By Section Name Is Initiated.
  List<StoreNameInfo> retrieveStoreNameInfoBySuburb(SectionName sectionName){
    
    // Use Pagination
    DAO.path = '/store_names';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('sectionName', isEqualTo: sectionName).get();
    
    return [];
  }

  //======================================================================================

   // Path /store_names/storeNameId/store_groups
  // Automatically called each time a store name is saved.
  void saveStoreGroup(StoreGroup storeGroup){
   
    DAO.path = '/store_names/${storeGroup.storeNameInfoFK}/store_groups';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(storeGroup.toJson());
    
  }

  // Path /store_names/storeNameId/store_groups
  // Invoked if a user opens a store assume they are under the stores tab.
  StoreGroup? retrieveStoreGroup(String storeNameId, String storeGroupId){
    
    DAO.path = '/store_names/$storeNameId/store_groups/';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(storeGroupId);
    
    throw UnimplementedError();
  }

  //======================================================================================

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/normal_store_posts
  // Created Each Time A Winner Creates A Post.
  void saveNormalStorePost(String storeNameInfoId, 
  String storeGroupId,String futurePostId,
  NormalStorePost normalStorePost){

    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/normal_store_posts';
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(normalStorePost.toJson());
    
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/normal_store_posts
  NormalStorePost? retrieveNormalStorePost(String storeNameInfoId, 
  String storeGroupId, String normalPostId){
    
    // Use Pagination Here.
    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/'
               'normal_store_posts';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(normalPostId);

    return null;
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/normal_store_posts
  // Automatically called whenever a store is visited within the stores tab and normal posts is selected.
  List<NormalStorePost> retrieveNormalStorePosts(String storeNameInfoId, 
  String storeGroupId, String normalStorePostId){

    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/'
               'normal_store_posts/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storePostId', isEqualTo: normalStorePostId).get();
    
    return [];
  }

  //======================================================================================

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/normal_store_posts/normalStorePostId/store_post_comments
  // Created Each Time A User Creates A Comment.
  void saveNormalStorePostComment(String storeNameId,
  String storeGroupId, String normalStorePostId,
  StorePostComment normalStorePostComment){
    
    DAO.path = '/store_names/$storeNameId/store_groups/'
               '$storeGroupId/normal_store_posts/$normalStorePostId/'
               'store_comments';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(normalStorePostComment.toJson());
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/normal_store_posts/normalStorePostId/store_post_comments
  // Automatically called whenever a store is visited within the stores tab.
  List<StorePostComment> retrieveNormalStorePostsComment(
  String storeNameId, String storeGroupId, String normalStorePostId){

    // Use Pagination Here.
    DAO.path = '/store_names/$storeNameId/store_groups'
               '/$storeGroupId/normal_store_posts/$normalStorePostId'
               '/store_post_comments';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storePostFK', isEqualTo: normalStorePostId).get();
    
    return [];
  }


  //======================================================================================

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/past_store_posts
  // Created Each Time A User Creates A Post.
  void savePastStorePost(String storeNameInfoId, PastStorePost pastStorePost){
    
    final storeGroupId = pastStorePost.storeGroupFK;
    StoreGroup storeGroup = retrieveStoreGroup(storeNameInfoId, storeGroupId)!;
    
    DAO.path = '/store_names/${storeGroup.storeNameInfoFK}'
               '/store_groups/$storeGroupId/past_store_posts';
    
    // Now Save Past Store Post
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(pastStorePost.toJson());
    
    
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/past_store_posts
  PastStorePost? retrievePastStorePost(String storeNameInfoId, 
  String storeGroupId, String pastStorePostId){

    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/'
               'past_store_posts/';
    
    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(pastStorePostId);

    return null;
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/past_store_posts
  // Automatically called whenever a store is visited within the stores tab and past post is selected.
  List<PastStorePost> retrievePastStorePosts(String storeNameInfoId, String storeGroupId){
    
    // Use Pagination Here.
    
    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/'
               'past_store_posts';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storeGroupFK', isEqualTo: storeGroupId).get();
    
    return [];
  }

   //======================================================================================

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/past_store_posts/pastStorePostId/
  // store_post_involved_users
  // Created Each Time A User Creates A Post.
  void savePastStorePostInvolvedUser(String storeNameInfoId, 
  String storeGroupId, String pastStorePostId,
  StorePostInvolvedUser involvedUser){
    
    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/past_store_posts'
               '/$pastStorePostId/store_post_involved_users';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(involvedUser.toJson());
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/past_store_posts/pastStorePostId/
  // store_post_involved_users
  // Created Each Time A Future Post Is Viewed.
  List<StorePostInvolvedUser> findPastStorePostInvolvedUsers(
  String storeNameInfoId, String storeGroupId,String pastPostId){
    
    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/past_store_posts'
               '/$pastPostId/store_post_involved_users';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storePostFK', isEqualTo: pastPostId).get();

    return [];
  }

  //======================================================================================

  // Path /store_names/storeNameId/store_groups/storeGroupId/
  // past_store_posts/pastStorePostId/store_post_comments
  // Created Each Time A User Creates A Comment.
  void savePastStorePostComment(String storeNameId,
  String storeGroupId, String pastStorePostId, 
  StorePostComment storePostComment){
    
    DAO.path = '/store_names/$storeNameId/store_groups/'
               '$storeGroupId/past_store_posts/$pastStorePostId/'
               'store_comments';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(storePostComment.toJson());
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/past_store_posts/pastStorePostId/store_post_comments
  // Automatically called whenever a store is visited within the stores tab.
  List<StorePostComment> retrievePastStorePostsComment(
  String storeNameId, String storeGroupId, String pastStorePostId){

    // Use Pagination Here.
    DAO.path = '/store_names/$storeNameId/store_groups'
               '/$storeGroupId/past_store_posts/$pastStorePostId'
               '/store_post_comments';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storePostFK', isEqualTo: pastStorePostId).get();
    
    return [];
  }

  //======================================================================================

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/future_store_posts
  // Created Each Time A Winner Creates A Post.
  void saveFutureStorePost(String storeNameInfoId, 
  String storeGroupId,String futurePostId,
  FutureStorePost futureStorePost){

    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/future_store_posts';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(futureStorePost.toJson());
    
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/future_store_posts
  FutureStorePost? retrieveFutureStorePost(String storeNameInfoId, 
  String storeGroupId, String futureStorePostId){
    
    // Use Pagination Here.
    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/'
               'future_store_posts';

    DAO.retrievedDocument = DAO.database.collection(DAO.path!)
    .doc(futureStorePostId);
    
    return null;
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/future_store_posts
  // Automatically called whenever a store is visited within the stores tab and futre posts is selected.
  List<FutureStorePost> retrieveFutureStorePosts(String storeNameInfoId, 
  String storeGroupId, String futureStorePostId){

    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/'
               'future_store_posts/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storePostId', isEqualTo: futureStorePostId).get();
    
    return [];
  }

  //======================================================================================

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/future_store_posts/futureStorePostId/
  // store_post_involved_users
  // Created Each Time A User Creates A Post.
  void saveFutureStorePostInvolvedUser(String storeNameInfoId, 
  String storeGroupId, String futureStorePostId,
  StorePostInvolvedUser involvedUser){
    
    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/future_store_posts'
               '/$futureStorePostId/store_post_involved_users';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(involvedUser.toJson());
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/future_store_posts/futureStorePostId/
  // store_post_involved_users
  // Created Each Time A Future Post Is Viewed.
  List<StorePostInvolvedUser> findFutureStorePostInvolvedUsers(
  String storeNameInfoId, String storeGroupId,String futurePostId){
    
    DAO.path = '/store_names/$storeNameInfoId'
               '/store_groups/$storeGroupId/future_store_posts'
               '/$futurePostId/store_post_involved_users';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storePostFK', isEqualTo: futurePostId).get();

    return [];
  }

  //======================================================================================

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/future_store_posts/futureStorePostId/store_post_comments
  // Created Each Time A User Creates A Comment.
  void saveFutureStorePostComment(String storeNameId,
  String storeGroupId, String futureStorePostId,
  StorePostComment futureStorePostComment){
    
    DAO.path = '/store_names/$storeNameId/store_groups/'
               '$storeGroupId/future_store_posts/$futureStorePostId/'
               'store_comments';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(futureStorePostComment.toJson());
  }

  // Path /store_names/storeNameId/store_groups/
  // storeGroupId/future_store_posts/futureStorePostId/store_post_comments
  // Automatically called whenever a store is visited within the stores tab.
  List<StorePostComment> retrieveFutureStorePostsComment(
  String storeNameId, String storeGroupId, String futureStorePostId){

    // Use Pagination Here.
    DAO.path = '/store_names/$storeNameId/store_groups'
               '/$storeGroupId/future_store_posts/$futureStorePostId'
               '/store_post_comments';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!)
    .where('storePostFK', isEqualTo: futureStorePostId).get();
    
    return [];
  }

  //======================================================================================
  
  // Path /stores/storeId/store_joined_members/userId
  // Only called when a user is joining a store.
  static StoreJoinStatus joinStore(StoreJoinedMember storeJoinedMember){
    
    User? user = UserDAO.readUser(storeJoinedMember.userId);

    if(user != null){
      if(!hasJoinedStore(storeJoinedMember.storeFK, storeJoinedMember.userId)){
        DAO.path = '/stores/$storeJoinedMember.userId/store_joined_members/';
        
        // Save store joined member to Store Joined Member Collection.
        DAO.saveQuery = DAO.database.collection(DAO.path!)
       .add(storeJoinedMember.toJson());

        return StoreJoinStatus.approved;
      }
      else{
        return StoreJoinStatus.alreadyJoined;
      }
    }
    else{
      return StoreJoinStatus.needToLoginOrRegister;
    }
  }

  // Path /stores/storeId/store_joined_members/userId
  // Only called when a user is leaving a store.
  static void leaveStore(String userId, String storeId){
    
    DAO.path = '/stores/$storeId/store_joined_members/';

    DAO.deleteQuery = DAO.database.collection(DAO.path!)
    .doc(userId).delete();
        
    
  }

  // Path /stores/storeId/store_joined_members
  // Invoked when a user want to view some store's customers.
  static List<StoreJoinedMember> findJoinedMembers(String storeId){

    DAO.path = '/stores/$storeId/store_joined_members/';
    
    DAO.querySnapshot = DAO.database.collection(DAO.path!).get();

    return [];
  }

  static bool hasJoinedStore(String storeId, String userId){

    List<StoreJoinedMember> members = findJoinedMembers(storeId);
    for(StoreJoinedMember user in members){
      if(user.userId==userId){
        return true;
      }
    }

    return false;
  }

  //======================================================================================

  // Path /stores/storeId/store_alcohol
  // Invoked when a user saves a store's alcohol.
  static void saveStoreAlcohol(String storeId, Alcohol alcohol){

    DAO.path = '/stores/$storeId/store_alcohol';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(alcohol.toJson());
  }
  
  // Path /stores/storeId/store_alcohol
  // Invoked when a user views a store's alcohol.
  static List<Alcohol> findStoreAlcohol(String storeId){

    DAO.path = '/stores/$storeId/store_alcohol';
    
    DAO.querySnapshot = DAO.database.collection('DAO.path').get();

    return [];
  }

  // Path /stores/storeId/store_competitions/competitionId/competition_joined_members
  static void saveCompetitionJoinedMember(
    String storeId, String competitionId,
    CompetitionJoinedMember competitionJoinedMember){
    
    DAO.path = '/stores/$storeId/store_competitions/$competitionId/competition_joined_members';
    
    DAO.saveQuery = DAO.database.collection(DAO.path!)
    .add(competitionJoinedMember.toJson());

    // Finally save the new member to another collection.
    CompetitionDAO.saveCompetitionJoinedMember(competitionId,competitionJoinedMember);
    
  }

  static void updateStoreImageLocation(String storeId, String storeImageLocation){
    // Cloud Function
  }

  static void updateStoreName(String storeId, String storeName){
    // Cloud Function
  }

  static void updateStoreSectionName(String storeId, SectionName sectionName){
    // Cloud Function
  }
  
}