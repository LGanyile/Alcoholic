import 'package:flutter/material.dart';

class ClaimingPeopleWidget extends StatelessWidget{
  @override 
  Widget build(BuildContext context)=>Row(
    children: [
      Text('People Claiming To Know You.',

      ),
      IconButton(
        icon: Icon(Icons.more_horiz),
        onPressed: (){},
      ),
    ],
  );
}