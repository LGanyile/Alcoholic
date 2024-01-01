import 'package:flutter/material.dart';
import '../screens/entrance_widget.dart';
import '../screens/single_post_widget.dart';

import '../dao/store_dao.dart';
import '../main.dart';
import '../models/utilities.dart';
import '../models/old_store.dart';
import 'page_navigation.dart';

class StorePostViewWidget extends StatefulWidget{

  Store store;

  StorePostViewWidget({
    super.key, 
    required this.store,
  });

  @override 
  StorePostViewWidgetState createState()=> StorePostViewWidgetState();
}

class StorePostViewWidgetState extends State<StorePostViewWidget>{

  bool isOpen = false;
  bool hasJoined = false;

  @override 
  void initState(){
    super.initState();

  }

  // This method is called before the build method.
  @override
  void didUpdateWidget(covariant StorePostViewWidget oldWidget) {
    
    super.didUpdateWidget(oldWidget);
    widget.store = MyApplication.sampleForTesting.findStoreById(oldWidget.store.storeId!)!;
  }

  @override 
  Widget build(BuildContext context)=> Column(
    children: [
      // The 3 Elements Namely Store Name, Open/Close Button And The Join/Leave Button.
      Row(
        children: [
          // The Name Of A Store To Be Viewed.
          Container(
            width: MediaQuery.of(context).size.width*0.7,
            padding: const EdgeInsets.only(left: 20, top:20),
            margin: const EdgeInsets.only(right: 10,),
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(20)),
              color: Color.fromARGB(255, 212, 102, 139),
            ),
            child: Text(widget.store.storeName,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          // The Buttom Responsible For Either Openning Or Closing The Store.
          GestureDetector(
            onTap: () => setState(() {
              isOpen = !isOpen;
            }),
            child: Container(
              width: MediaQuery.of(context).size.width*0.45,
              alignment: Alignment.center,
              margin: const EdgeInsets.only(right: 10,),
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(20)),
                color: Colors.lightBlue,
              ),
              child: Text(isOpen?'Close':'Open',
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          // The Button Responsible For Joining Or Leaving The Current Store.
          GestureDetector(
            onTap: (() {
              // Take The User To The Login Page If He Or She Has Not Logged In.
              if(MyApplication.currentUser==null){
                Navigator.of(context).push(
                  CustomPageRoute(
                    child: const EntranceWidget(
                      toPage: ToPage.postsWidget,
                    ),
                  ),
                );
              }
              // Assuming The User Has Logged In.
              else{
                // Remove The User From This Store.
                if(hasJoined){
                  
                  MyApplication.sampleForTesting.leaveStore(widget.store.storeId!, MyApplication.currentUser!.cellNumber);
                  setState(() {
                    hasJoined = !hasJoined;
                  });
                }
                // Add The User From This Store.
                else{
                  MyApplication.sampleForTesting.joinStore(widget.store.storeId!, MyApplication.currentUser!.cellNumber);
                  setState(() {
                    hasJoined = !hasJoined;
                  });
                }
              }
            }),
            child: Container(
              width: MediaQuery.of(context).size.width*0.45,
              alignment: Alignment.center,
              margin: const EdgeInsets.only(right: 10,),
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(20)),
                color: Colors.lightBlue,
              ),
              child: Text(hasJoined?'Leave':'Join',
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
      // The Portion Where All The Posts About This Store Reside.
      isOpen? Expanded(child: SinglePostWidget(store: widget.store)):const SizedBox.shrink(),
    ],
  );


}

