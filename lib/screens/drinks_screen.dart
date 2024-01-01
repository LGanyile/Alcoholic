import 'package:flutter/material.dart';

import 'search_widget.dart';
import 'start_screen.dart';

class DrinksScreen extends StatefulWidget{
  @override 
  _DrinksScreenState createState()=>_DrinksScreenState();
}

class _DrinksScreenState extends State<DrinksScreen>{

  @override 
  void initState(){
    super.initState();
    StartScreen.currentIndex = 1;
  }

  @override 
  Widget build(BuildContext context)=>Column(
    children: [
      SearchWidget(),
      const SizedBox(height:20,),
      
    ],
  );
}