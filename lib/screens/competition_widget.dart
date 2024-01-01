import 'package:flutter/material.dart';

import '../models/old_competition.dart';
import '../models/old_store.dart';
import 'competition_screen_helper.dart';

class CompetitionWidget extends StatefulWidget{

  
  final Store store;

  const CompetitionWidget({
    super.key, 
    required this.store,
  });

  @override 
  CompetitionWidgetState createState()=>CompetitionWidgetState();
}

class CompetitionWidgetState extends State<CompetitionWidget>{
  
  int _findSpecialDateIndex(){

    for(int i = 0; i < widget.store.competitions.length;i++){
      if(widget.store.competitions[i].dateTime.year==DateTime.now().year &&
      widget.store.competitions[i].dateTime.month==DateTime.now().month &&
      widget.store.competitions[i].dateTime.day==DateTime.now().day){
        return i;
      }
    }
    return -1;
  }


  Widget _buildGrandPrices(){

    int specialDateIndex = _findSpecialDateIndex();
    Competition competition = widget.store.competitions[specialDateIndex];
    Widget grid;

    switch(widget.store.competitions[specialDateIndex].maxNoOfGrandPrices){
      case 4:
        grid = Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 2),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 3),
                ],
              ),
          ],
        );
        break;
      case 5:
        grid = Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 2),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 3),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 4),
                ],
              ),
          ],
        );
        break;
      case 6:
        grid = Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 2),
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 3),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 4),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 5),
                ],
              ),
          ],
        );
        break;
      case 7:
        grid = Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 2),
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 3),
                  // Middle Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 4),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 5),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 6),
                ],
              ),
          ],
        );
        break;
      case 8:
        grid = Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 1),
                  // Middle Top Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 2),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 3),
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 4),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 5),
                  // Middle Bottom Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 6),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 7),
                ],
              ),
          ],
        );
        break;
      default:
        grid = Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 1),
                  // Middle Top Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 2),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 3),
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 4),
                  // Middle Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 5),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 6),
                  // Middle Bottom Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 7),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:true,competition: competition, grandPriceIndex: 8),
                ],
              ),
          ],
        );
    
    }
      
    return grid;
  
  }

  Widget buildCanvas()=> Expanded(
    flex: 3,
    child: _buildGrandPrices(),
  );

  Widget showStoreInfo(BuildContext context)=> Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          
          // Image Of The Searched And Found Store.
          AspectRatio(
            aspectRatio: 3/2,
            child: Container(
              //width: MediaQuery.of(context).size.width/2,
              //height: MediaQuery.of(context).size.height/1.2,
              decoration: BoxDecoration(
                color: Colors.green,
                borderRadius: BorderRadius.circular(15),
                image: const DecorationImage(
                  fit: BoxFit.cover,
                  // Image Of The Current Store From Cloud Storage.
                  image: AssetImage('assets/store.jpg'),
                ),
              ),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  gradient: LinearGradient(
                    begin: Alignment.bottomRight,
                    stops: const [0.1, 0.9],
                    colors: [
                      Colors.black.withOpacity(.8),
                      Colors.black.withOpacity(.1),
                    ],
                  ),
                ),
              ),
            ),
          ),
          // Name Of The Searched And Found Store.
          Text(
            widget.store.storeName,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          // Address Of The Searched And Found Store.
          Text(
            widget.store.address,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          
        ],
      ),
    );
  

  @override 
  Widget build(BuildContext context)=> Scaffold(
    appBar: AppBar(
      leading: IconButton(
        onPressed: ()=>Navigator.of(context).pop(), 
        icon: const Icon(Icons.arrow_back),
      ),
      title: const Text('Competition',
        style: TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.bold,
        ),
      ),
      
    ),
    body: Column(
    children: [
      // Show The 'Live' Word On The Top Right Corner.
      Container(
        width: double.infinity,
        alignment: Alignment.centerRight,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal:30,vertical: 20),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: Colors.red,
            borderRadius: BorderRadius.circular(30),
          ),
          child: const Text('Live',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
      // Shows The Store Image, Store Name And The Store Address.
      showStoreInfo(context),
      // This Is Where The Moving Pointing Ball Exist.
      buildCanvas(),
    ],
    ),
  );
}