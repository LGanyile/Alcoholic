import 'package:flutter/material.dart';
import '../screens/winner_widget.dart';
import '../models/old_won_price.dart';

class WinnerScreen extends StatefulWidget{

  final WonPrice wonPrice;

  const WinnerScreen({super.key, 
    required this.wonPrice,
  });

  @override 
  WinnerScreenState createState()=>WinnerScreenState();
}

class WinnerScreenState extends State<WinnerScreen>{

  @override 
  Widget build(BuildContext context)=>Scaffold(
    appBar: AppBar(
      leading: IconButton(
        onPressed: ()=>Navigator.of(context).pop(), 
        icon: const Icon(Icons.arrow_back),
      ),
      title: const Text('Winner',
        style: TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.bold,
        ),
      ),
      
    ),
    body: WinnerWidget(wonPrice: widget.wonPrice,)
  );
}