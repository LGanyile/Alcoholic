import 'package:flutter/material.dart';
import '../dao/search_dao.dart';
import '../screens/no_such_alcohol.dart';
import '../dao/store_dao.dart';

import '../main.dart';
import '../models/utilities.dart';
import '../models/old_store.dart';
import 'store_searched_alcohol_widget.dart';

class AlcoholSearchWidget extends StatefulWidget{

  final String searchedAlcohol;
  static int _grandPriceIndex = 0;

  const AlcoholSearchWidget({super.key, 
    required this.searchedAlcohol,
  });

  static int retrieveGrandPriceIndex(){
    return _grandPriceIndex;
  }

  static void UpdateGrandPriceIndex(){
    _grandPriceIndex = _grandPriceIndex + 1;
  }

  @override 
  AlcoholSearchState createState()=>AlcoholSearchState();
}

class AlcoholSearchState extends State<AlcoholSearchWidget>{

  List<Store> stores = [];

  int selectedStoreIndex = 0;
  int selectedGrandPriceIndex = 0;

  String? searchOrder;
  
  @override 
  void initState(){
    super.initState();
    updateAlcoholOrder();
  }

  void selectedGrandPriceChanged(int selectedGrandPriceIndex){

    setState(() {
        this.selectedGrandPriceIndex = selectedGrandPriceIndex;
    });
    
  }

  void selectedStoreChanged(int selectedStoreIndex){

    if(this.selectedStoreIndex != selectedStoreIndex){
      setState(() {
        selectedStoreIndex = selectedStoreIndex;
      });
    }

    
  }

  void updateAlcoholOrder(){
    setState(() {
      if(searchOrder=='Nearest Stores'){
        if(MyApplication.currentUser != null){
          
          stores = MyApplication.sampleForTesting.findStoreWithAlcohol(
            widget.searchedAlcohol, 
            AlcoholSearchedBy.nearest,
            DateTime.now(),
            MyApplication.currentUser!.cellNumber
          );
        }
      }
      else if(searchOrder=='Alcohol Price'){
        
        stores = MyApplication.sampleForTesting.findStoreWithAlcohol(
          widget.searchedAlcohol, 
          AlcoholSearchedBy.price,
          DateTime.now(),
          MyApplication.currentUser!.cellNumber
        );
      }
      else{
        
        stores = MyApplication.sampleForTesting.findStoreWithAlcohol(
          widget.searchedAlcohol, 
          AlcoholSearchedBy.dates,
          DateTime.now(),
          MyApplication.currentUser!.cellNumber
        );
      }
    });
    
  }
  
  @override 
  Widget build(BuildContext context)=>
  MyApplication.sampleForTesting.storeExist(widget.searchedAlcohol)==false?
  NoSuchAlcoholWidget(): Padding(
    padding: const EdgeInsets.symmetric(
      horizontal: 20.0,
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        
        Column(   
          
          children: [
            // Ordered By Text.
            const Text("Ordered By",
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold,
              ),
            ),
            // Ordered By Radio Buttons.
            Padding(
              padding: const EdgeInsets.only(left:40, right:20),
              child: Column(
                children: [
                  Radio(
                    value: 'Nearest Stores', 
                    groupValue: 'Searched Alcohol Order', 
                    onChanged: ((value) {
                      setState(() {
                        searchOrder = value;
                      });
                      updateAlcoholOrder();
                    })
                  ),
                  Radio(
                    value: 'Alcohol Price', 
                    groupValue: 'Searched Alcohol Order', 
                    onChanged: ((value) {
                      setState(() {
                        searchOrder = value;
                      });
                      updateAlcoholOrder();
                    })
                  ),
                  Radio(
                    value: 'Competition Date', 
                    groupValue: 'Searched Alcohol Order', 
                    onChanged: ((value) {
                      setState(() {
                        searchOrder = value;
                      });
                      updateAlcoholOrder();
                    })
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 15,),
        // First Display All The Grand Prices from The Closest Future Special Date,
        // To The Furthest For A Particular Store. Then Do The Same On Other Stores.
        // However This Order Will Change Hence Our Implementation Should As Well.
        ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: stores.length,
          itemBuilder: ((context, index) => StoreSearchedAlcoholWidget(
            onGrandPriceChange: selectedStoreChanged,
            onStoreChange: selectedGrandPriceChanged,
            store: stores[index],
            storeIndex: index,
            searchedAlcohol: widget.searchedAlcohol,
            selectedGrandPriceIndex: selectedGrandPriceIndex,
          )),
        ),
        
        // The Image Of A Store On Which The Currently Selected Grand Price Belongs. 
        AspectRatio(
          aspectRatio: 3/2,
          child: Container(
            margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
            decoration: BoxDecoration(
              color: Colors.orange,
              borderRadius: BorderRadius.circular(20),
              image: DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage(stores[selectedStoreIndex].picPath)
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        // Information About The Hosting Store.
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // The Name Of A Store.
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Store Name',
                  style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                  ),
                ),
                Text(stores[selectedStoreIndex].storeName,
                  style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                  ),
                ),
              ],
            ),
                    // The Address Of A Store.
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Store Address',
                          style: TextStyle(
                            fontSize: MyApplication.infoTextFontSize,
                          ),
                        ),
                        Text(stores[selectedStoreIndex].address,
                          style: TextStyle(
                            fontSize: MyApplication.infoTextFontSize,
                          ),
                        ),
                     ],
                    ),
                  ],
                ),
        
      ],
    ),
  );

}

