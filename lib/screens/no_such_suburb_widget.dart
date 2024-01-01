import 'package:flutter/material.dart';

class NoSuchSuburbWidget extends StatelessWidget{
  
  @override 
  Widget build(BuildContext context)=>const Center(
    child: Text(
      'No Such Suburb Exist.',
      style: TextStyle(
        fontSize: 50,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}