import 'package:flutter/material.dart';
import '../../screens/communications/cartegory_selector_widget.dart';

import 'known_people_widget.dart';
import 'online_people_widget.dart';
import 'store_owners_widget.dart';
import 'claiming_people_widget.dart';

class ChatsScreen extends StatefulWidget{


  @override 
  _ChatsScreenState createState()=>_ChatsScreenState();
}

class _ChatsScreenState extends State<ChatsScreen>{

  int selectedIndex = 0;


  @override 
  void initState(){
    super.initState();
    
  }
  

  void updateSelectedIndex(int index){
    setState(() {
      selectedIndex = index;
    });
  }


  @override 
  Widget build(BuildContext context)=>Scaffold( 
    backgroundColor: Theme.of(context).primaryColor,
    appBar: AppBar(
      elevation: 0,
      leading: IconButton(
        icon: const Icon(Icons.menu),
        iconSize: 30,
        color: Colors.white,
        onPressed: (){},
      ),
      title: const Text(
        'Chats',
        style: TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.bold,
        ),
      ),
      centerTitle: true,
      actions: [
        IconButton(
        icon: const Icon(Icons.more),
        iconSize: 30,
        color: Colors.white,
        onPressed: (){},
      ),
      ],
    ),
    body:Column(
      children: [
        CategorySelectorWidget(
          selectedIndex: selectedIndex,
          onSelectedIndexChange: updateSelectedIndex,
        ),
        viewAppropriateWidget(),
      ],
    ),
  );

  Widget viewAppropriateWidget(){
    switch(selectedIndex){
      case 0:
        return KnownPeopleWidget();
      case 1:
        return OnlinePeopleWidget();
      case 2:
        return StoreOwnersWidget();
      default:
        return ClaimingPeopleWidget();
    }
  }
}