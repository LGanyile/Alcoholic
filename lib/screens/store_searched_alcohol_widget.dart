import 'package:flutter/material.dart';

import '../models/old_grand_price.dart';
import '../models/old_competition.dart';
import '../models/old_store.dart';
import 'single_found_grand_price_widget.dart';

class StoreSearchedAlcoholWidget extends StatelessWidget{

  final Store store;
  final String searchedAlcohol;
  final List<GrandPrice> specialGrandPrices = [];
  

  UpdateSelectedGrandPrice onGrandPriceChange;
  int selectedGrandPriceIndex;
  UpdateSelectedStore onStoreChange;
  final int storeIndex;


  StoreSearchedAlcoholWidget({super.key, 
    required this.store,
    required this.searchedAlcohol,
    required this.onGrandPriceChange,
    required this.storeIndex,
    required this.selectedGrandPriceIndex,
    required this.onStoreChange,
  }); 

  int findNumberOfGrandPrices(){

    int count = 0;
    for(Competition competition in store.competitions){
        for(GrandPrice grandPrice in competition.grandPrices){
          if(grandPrice.contains(searchedAlcohol)){
            specialGrandPrices.add(grandPrice);
            count++;
          }
        }
    }

    return count;
  }
  

  @override 
  Widget build(BuildContext context)=>SizedBox(
    height: 20,
    child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: findNumberOfGrandPrices(),
        itemBuilder: ((context, index) => SingleFoundGrandPriceWidget(
          image: specialGrandPrices[index].findImageLocation(),
          onGrandPriceChange: onGrandPriceChange,
          onStoreChange: onStoreChange,
          storeIndex: storeIndex,
          selectedGrandPriceIndex: selectedGrandPriceIndex,
        )),
    ),
  );
}

