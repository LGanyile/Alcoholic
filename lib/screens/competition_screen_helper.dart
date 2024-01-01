import 'package:flutter/material.dart';
import '/main.dart';
import '../models/old_competition.dart';

class CompetitionScreenHelper extends StatefulWidget{

  final Competition competition;
  final int grandPriceIndex;  
  final bool isLive;

  const CompetitionScreenHelper({super.key, 
    required this.competition,
    required this.grandPriceIndex,
    required this.isLive,
    
  });
  

  @override 
  CompetitionScreenHelperState createState()=>CompetitionScreenHelperState();
}

class CompetitionScreenHelperState extends State<CompetitionScreenHelper>{

  void updateIsPointed(){
    setState(() {
      MyApplication.sampleForTesting.updateGrandPriceIsPointed(widget.competition.competitionId!, 
      widget.competition.grandPrices[widget.grandPriceIndex].grandPriceId!);
    });
  }

  Widget? _buildPointer(){

    if(widget.competition.grandPrices[widget.grandPriceIndex].isPointed){
      return 
      // Display this ball on the correct current price to win.
      Container(
        width: 35,
        height: 35,
        decoration: const BoxDecoration(
          color: Colors.red,
          shape: BoxShape.circle,

        ),  
      );
    }

    return null;
    
  }
  
  Widget showGrandPrice(){
    return Container(
        height: 50,
        width: 50,
        decoration: BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.circular(30),
          
        ),
        child: Image.network(
          
          MyApplication.sampleForTesting.readGrandPrice(widget.competition.competitionId!, 
          widget.competition.grandPrices[widget.grandPriceIndex].grandPriceId!
          )!.imageLocation??= MyApplication.sampleForTesting.readGrandPrice(widget.competition.
          competitionId!, widget.competition.grandPrices[widget.grandPriceIndex].
          grandPriceId!)!.drinks[0].imageLocation,
          color: Colors.green,
          fit: BoxFit.cover,
        ),             
      );
    
  }

  @override
  Widget build(BuildContext context)=>widget.isLive?Stack(
    children: [
      _buildPointer()!,
      showGrandPrice()
    ],
  ):showGrandPrice();
  
}