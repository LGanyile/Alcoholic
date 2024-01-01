import 'package:flutter/material.dart';

class StoreOwnersWidget extends StatelessWidget{
  @override 
  Widget build(BuildContext context)=>Row(
    children: [
      Text('People Whom Own Store(s)',

      ),
      IconButton(
        icon: Icon(Icons.more_horiz),
        onPressed: (){},
      ),
    ],
  );
}