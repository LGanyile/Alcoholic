import 'package:flutter/material.dart';

class KnownPeopleWidget extends StatelessWidget{
  @override 
  Widget build(BuildContext context)=>Column(
    children: [
      Row(
        children: [
          const Text('People You Know',

          ),
          IconButton(
            icon: const Icon(Icons.more_horiz),
            onPressed: (){},
          ),
        ],
      ),
      Expanded(
          child: Container(
            decoration: BoxDecoration(
              color: Theme.of(context).secondaryHeaderColor,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(30),
                topRight: Radius.circular(30),
              ),
            ),
            child:Column(
              children: const [
                
                
              ],
            ),
          ),
        ),
    ],
  );
}