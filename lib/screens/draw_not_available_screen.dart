import 'package:flutter/material.dart';

class DrawNotAvailableScreen extends StatelessWidget{
  
  @override 
  Widget build(BuildContext context)=>const Center(
    child: Text(
      'No Draw Available At The Moment.',
      style: TextStyle(
        fontSize: 50,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}