import 'package:flutter/material.dart';

class OnlinePeopleWidget extends StatelessWidget{
  @override 
  Widget build(BuildContext context)=>Row(
    children: [
      Text('Online People',

      ),
      IconButton(
        icon: Icon(Icons.more_horiz),
        onPressed: (){},
      ),
    ],
  );
}