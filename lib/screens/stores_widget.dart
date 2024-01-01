import 'package:flutter/material.dart';
import '../screens/store_post_view_widget.dart';

import '../dao/store_dao.dart';
import '../models/old_store.dart';

class StoresWidget extends StatefulWidget{

  @override 
  StoresWidgetState createState()=>StoresWidgetState();
}

class StoresWidgetState extends State<StoresWidget>{

  List<Store> allAvailableStores = [];

  @override 
  void initState(){
    super.initState();
    
    allAvailableStores.sort();

  }
  
  @override 
  Widget build(BuildContext context)=>ClipRRect(
    borderRadius: const BorderRadius.only(
      topLeft: Radius.circular(30),
      topRight: Radius.circular(30),
    ),
    child: ListView.builder(
      itemCount: allAvailableStores.length,
      itemBuilder: ((context, index) {
        return StorePostViewWidget(store:allAvailableStores[index]);
      })
    ),
  );
}