import 'package:flutter/material.dart';

import 'store_info_widget.dart';
import '../models/old_competition.dart';
import 'competition_screen_helper.dart';

class OnWaitWidget extends StoreInfoWidget{

  OnWaitWidget({
    required store
  }):super(store:store);

  @override
  State createState() =>OnWaitWidgetState();

  void createInfoColumn(BuildContext context, DateTime specialDate){
    super.fillColumn(context);
    super.column.children.add(remainingTime(specialDate));
  }

  Widget remainingTime(DateTime specialDate){
    
    DateTime justNow = DateTime.now();
    int newHours = specialDate.hour,  
    newMinutes = specialDate.minute, 
    newSeconds = specialDate.second;

    if(specialDate.second>=justNow.second){
      newSeconds = specialDate.second-justNow.second;
    }
    else{
      if(specialDate.minute>0){
        newMinutes--;
      }
      else{
        newHours--;
        newMinutes = 59;
      }
      newSeconds = specialDate.second + 60 - justNow.second;  
    }

    DateTime newDate = DateTime(
        specialDate.year, 
        specialDate.month, 
        specialDate.day, 
        newHours-justNow.hour, 
        newMinutes-justNow.minute,
        newSeconds-justNow.second,
      );

    return Text(
        'Remaining Time ${newDate.hour}:${newDate.minute}:${newDate.second}',
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      );
  }

}



class OnWaitWidgetState extends State<OnWaitWidget>{

  @override
  Widget build(BuildContext context) {
    widget.createInfoColumn(context,
    widget.store.competitions[
    widget.findSpecialDateIndex()].dateTime);
    return Column(
        children: [
          widget.column,
          IconButton(
            onPressed: ()=>{
              // Add Alarm So That A User Will Be Informed When The Draw/Competition Begins.
            }, 
            icon: const Icon(
              Icons.add_alarm,
              size: 25,
            ),
          ),
          buildCanvas(),
        ],
      );
  }
  
  Widget buildCanvas()=> Expanded(
    flex: 3,
    child: _buildGrandPrices(),
  );

  Widget _buildGrandPrices(){

    int specialDateIndex = widget.findSpecialDateIndex();
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
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 2),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 3),
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
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 2),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 3),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 4),
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
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 2),
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 3),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 4),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 5),
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
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 1),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 2),
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 3),
                  // Middle Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 4),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 5),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 6),
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
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 1),
                  // Middle Top Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 2),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 3),
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 4),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 5),
                  // Middle Bottom Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 6),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 7),
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
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 0),
                  // Top Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 1),
                  // Middle Top Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 2),
                ],
              ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Middle Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 3),
                  // Middle Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 4),
                  // Middle Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 5),
                ],
              ),           
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Bottom Left Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 6),
                  // Middle Bottom Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 7),
                  // Bottom Right Grand Price.
                  CompetitionScreenHelper(isLive:false,competition: competition, grandPriceIndex: 8),
                ],
              ),
          ],
        );
    
    }
      
    return grid;
  
  }

}