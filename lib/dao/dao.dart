import 'package:cloud_firestore/cloud_firestore.dart';

class DAO{

  static final database = FirebaseFirestore.instance;
  static String? path;

  static Future<QuerySnapshot<Map<String, dynamic>>>? querySnapshot;
  static DocumentReference<Map<String,dynamic>>? retrievedDocument;
  static Future<DocumentReference<Map<String,dynamic>>>? saveQuery;
  static Future<void>? deleteQuery;
  

  // DAO.querySnapshot = DAO.database.collection(DAO.path).get().then((snapshot)=>{
  //  snapshot.docs.foreach(doc=>{Users.fromJson(doc)})
  // });

  /***************SAVE QUERY****************/
  // DAO.querySnapshot = DAO.database.collection(DAO.path).add({});
  
  /***************DELETE QUERY****************/
  // DAO.querySnapshot = DAO.database.collection(DAO.path).doc(docId).delete();
  
  /***************NESTED OBJECTS****************/
  // We are allowed to use the period(.) operator in a string whithin the where clouse. For example where('storeOwner.sectionName').
  
  /***************AND QUERY - REMEMBER COMPOSITE INDEXES****************/
  // DAO.querySnapshot = DAO.database.collection(DAO.path)
  //.where('grade', isLessThan:12)
  //.where('age', isGreaterThan:18)
  //.get();
}