import 'package:flutter/material.dart';

class NoSuchAlcoholWidget extends StatelessWidget{
  
  @override 
  Widget build(BuildContext context)=>const Center(
    child: Text(
      'No Such Alcohol Exist.',
      style: TextStyle(
        fontSize: 50,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}