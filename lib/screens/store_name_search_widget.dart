import 'package:flutter/material.dart';
import '/main.dart';

import 'on_play_widget.dart';
import 'on_wait_widget.dart';
import '../screens/winner_widget.dart';
import 'no_such_store_widget.dart';
import '../models/old_competition.dart';
import '../models/old_store.dart';

class StoreNameSearchWidget extends StatefulWidget{

  
  String storeName;
  bool displayPostWidgets;

  StoreNameSearchWidget({
    super.key, 
    required this.storeName,
    this.displayPostWidgets = true,
  });

  @override 
  StoreNameSearchWidgetState createState()=>StoreNameSearchWidgetState();

}

class StoreNameSearchWidgetState extends State<StoreNameSearchWidget>{
  
  Store? store;

  StoreWidgetState(){
    
    store = MyApplication.sampleForTesting.findStoreByName(widget.storeName);
  }

  void setStoreName(String storeName){
    setState(() {
      widget.storeName = storeName;
    });
  }

  int _findSpecialDateIndex(){

    
    if(store==null){
      return -1;
    }

    

    for(int i = 0; i < store!.competitions.length;i++){
      if(store!.competitions[i].dateTime.year==DateTime.now().year &&
      store!.competitions[i].dateTime.month==DateTime.now().month &&
      store!.competitions[i].dateTime.day==DateTime.now().day){
        return i;
      }
    }
    return -1;
  }

  @override 
  Widget build(BuildContext context)=> 
  !MyApplication.sampleForTesting.storeExist(widget.storeName)?
  NoSuchStoreWidget():displayApproriatePage();
  
  Widget displayApproriatePage(){

    Competition competition = store!.competitions[
    _findSpecialDateIndex()];

    DateTime justNow = DateTime.now();

    // The Was A Competition/Draw But It Time Has Passed.
    // Now Show The Last Won Price.
    // Assuming There Is Only One Competition On A Given Day.
    if(justNow.isAfter(competition.dateTime.add(competition.duration!))){
      return WinnerWidget(wonPrice: store!.findLastWonPrice()!);
    }

    // The Draw/Competition Is Currently Playing.
    else if(justNow.isAfter(competition.dateTime) && 
    justNow.isBefore(competition.dateTime.add(competition.duration!)) ){
      
      return OnPlayWidget(store:store!);
    }
    // The searched store name exist and the draw is about to begin.
    // A countdown clock needs to be display until the draw begins,
    // in which chase it will disappear.
    else{
      return OnWaitWidget(store:store!);
    }
  }

}