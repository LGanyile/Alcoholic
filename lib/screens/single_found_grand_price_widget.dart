import 'package:flutter/material.dart';

import 'alcohol_search_widget.dart';

typedef UpdateSelectedGrandPrice = Function(int selectedGrandPriceIndex);
typedef UpdateSelectedStore = Function(int selectedStoreIndex);

class SingleFoundGrandPriceWidget extends StatefulWidget{

  final String image;
  final UpdateSelectedGrandPrice onGrandPriceChange;
  final UpdateSelectedStore onStoreChange;
  final int storeIndex;
  int selectedGrandPriceIndex;
  int grandPriceIndex = AlcoholSearchWidget.retrieveGrandPriceIndex();
  

  SingleFoundGrandPriceWidget({
    super.key, required this.image,
    required this.onGrandPriceChange,
    required this.onStoreChange,
    required this.storeIndex,
    required this.selectedGrandPriceIndex,
  });

  @override 
  SingleFoundGrandPriceWidgetState createState()=>SingleFoundGrandPriceWidgetState();

}

class SingleFoundGrandPriceWidgetState extends State<SingleFoundGrandPriceWidget>{
  
  @override 
  Widget build(BuildContext context)=>GestureDetector(
    onTap: (() {
      widget.onStoreChange(widget.storeIndex);
      widget.onGrandPriceChange(AlcoholSearchWidget.retrieveGrandPriceIndex());
    }),
    child: priceCard(widget.image),
    
  );

  // If selectedGrandPriceIndex==SearchedAlcoholWidget.retrieveGrandPriceIndex()
  // then we put a border around our container.
  Widget priceCard(image){
    AlcoholSearchWidget.UpdateGrandPriceIndex();
    return AspectRatio(
      aspectRatio: 2/3,
      child: Container(
        margin: const EdgeInsets.only(right: 15,),
        decoration: BoxDecoration(
          color: Colors.green,
          borderRadius: BorderRadius.circular(20),
          
          image: DecorationImage(
            fit: BoxFit.cover,
            image: AssetImage(image)
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
    );
  }

}

