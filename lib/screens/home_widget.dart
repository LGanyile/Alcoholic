import 'dart:math';

import 'package:flutter/material.dart';
import '../main.dart';
import '../models/old_won_price.dart';

import '../models/utilities.dart';
import '../models/old_grand_price.dart';
import '../models/old_user.dart';
import 'page_navigation.dart';
import 'start_screen.dart';
import 'winner_screen.dart';

class HomeWidget extends StatefulWidget{

  @override 
  _HomeWidgetState createState()=>_HomeWidgetState();
}

class _HomeWidgetState extends State<HomeWidget>{

  // It preferable to specify a town on which a user stays.
  // It also prefered to update this list each this new winners are added to the database.
  List<WonPrice> wonPrices = [];
  

  _HomeWidgetState();

  @override 
  void initState(){
    super.initState();
    if(wonPrices.isEmpty){
      
      wonPrices = MyApplication.sampleForTesting.findRecentWonPrices(
      Random().nextBool()?WonPricesOrder.price:WonPricesOrder.location,
      MyApplication.currentUser != null?MyApplication.currentUser!.sectionName:null);

    }
    StartScreen.currentIndex = 0;
  }

  void wonPriceChanged(value){
    setState(() {
      if(value=='Location'){
        
        wonPrices = MyApplication.sampleForTesting.findRecentWonPrices(
        WonPricesOrder.location,MyApplication.currentUser != null?
        MyApplication.currentUser!.sectionName:null);
      }
      else{
        
        wonPrices = MyApplication.sampleForTesting.findRecentWonPrices(
        WonPricesOrder.price,MyApplication.currentUser != null?
        MyApplication.currentUser!.sectionName:null);
      }
    });
  }

  @override 
  Widget build(BuildContext context)=>Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      const Text('Recent Wins',
        style: TextStyle(
          fontSize: 20,
        ),
      ),
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Ordered By',
              style: TextStyle(
                fontSize: 18,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Radio(value: 'Location', groupValue: 'Price Order', onChanged: ((value) => wonPriceChanged(value))),
                Radio(value: 'Price', groupValue: 'Price Order', onChanged: ((value) => wonPriceChanged(value)), autofocus: true,),
              ],
            ),
          ],
        ),
      ),
      GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 5,
          mainAxisSpacing: 5,
          childAspectRatio: 2/3,
        ), 
        itemBuilder: ((context, index) {
          return buildWonPriceCard(context, index);
        }),
      ),
    ],
  );

  Widget buildWonPriceCard(context, index){

    GrandPrice grandPrice = wonPrices[index].grandPrice;
    User winner = wonPrices[index].competition.winner!;

    return Card(
      color: Colors.orange,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: GestureDetector(
        onTap:(() {
          setState(() {
            Navigator.of(context).push(
              CustomPageRoute(
                child: WinnerScreen(
                  wonPrice: wonPrices[index],
                ),
              ),
            );
          });
        }),
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: NetworkImage(grandPrice.findImageLocation()),
                ),
                gradient: MyApplication.priceslinearGradient,
              ),
            ),
            CircleAvatar(
              backgroundColor: Colors.orange,
              radius: MediaQuery.of(context).size.width/1.2,
              backgroundImage: NetworkImage(
                winner.findImageLocation()
              ),
            ),
          ],
        ),
      ),
    );
  }
}