import 'package:flutter/material.dart';

class NoSuchStoreWidget extends StatelessWidget{
  
  @override 
  Widget build(BuildContext context)=>const Center(
    child: Text(
      'No Such Store Exist.',
      style: TextStyle(
        fontSize: 50,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}