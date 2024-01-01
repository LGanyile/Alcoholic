import 'package:flutter/material.dart';
import '/main.dart';

import 'no_such_suburb_widget.dart';
import 'store_name_search_widget.dart';

class SuburbSearchWidget extends StatefulWidget{
  final String suburbName;

  const SuburbSearchWidget({super.key, 
    required this.suburbName,
  });



  @override 
  SuburbSearchWidgetState createState()=>SuburbSearchWidgetState();
}

class SuburbSearchWidgetState extends State<SuburbSearchWidget>{

  List<String> storesNames = [];

  @override 
  void initState(){
    super.initState();
    storesNames = MyApplication.sampleForTesting. findStoresMatchingSuburb(widget.suburbName);
  }
  
  @override 
  Widget build(BuildContext context)=>storesNames.isEmpty?
  NoSuchSuburbWidget():SingleChildScrollView(
    child: ListView.builder(
      itemCount: storesNames.length,
      itemBuilder: ((context, index) {
        return Column(
          children: [
            StoreNameSearchWidget(storeName:storesNames[index]),
            const Divider(height: 10,)
          ]
        );
      })
    ),
  );
}