import 'package:flutter/material.dart';
import '../models/utilities.dart';
import '../screens/store_name_search_widget.dart';

import 'alcohol_search_widget.dart';
import 'suburb_search_widget.dart';

class SearchWidget extends StatefulWidget{
  @override 
  _SearchWidgetState createState()=> _SearchWidgetState();
}

class _SearchWidgetState extends State<SearchWidget>{

  //bool searchForAlcohol = true;
  //String? seachedAlcohol;
  String? query;
  SearchCategory searchCategory = SearchCategory.searchByAlcohol;


  void updateSearchBy(String selectedSearch){
    setState(() {

      switch(selectedSearch){
        case 'Alcohol':
          searchCategory = SearchCategory.searchByAlcohol;
        break;
        case 'Store':
          searchCategory = SearchCategory.searchByStore;
        break;
        default:
          searchCategory = SearchCategory.searchBySuburb;
      }
    });
    
  }

  @override 
  Widget build(BuildContext context)=>Container(
          width: double.infinity,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(30),
            ),
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Find Your
              const Text('Find Your',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 25,
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              // Search Type Horizontal Radio Buttons.
              Padding(
                padding: const EdgeInsets.only(left:40, right:20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // How Do I Make A Radio Button's Name Huge?
                    Radio(
                      autofocus: true,
                      value: 'Alcohol', 
                      groupValue: 'searchType', 
                      onChanged: ((value) => updateSearchBy(value!))
                    ),
                    // How Do I Make A Radio Button's Name Huge?
                    Radio(
                      value: 'Store', 
                      groupValue: 'searchType', 
                      onChanged: ((value) => updateSearchBy(value!))
                    ),
                    // How Do I Make A Radio Button's Name Huge?
                    Radio(
                      value: 'Suburb', 
                      groupValue: 'searchType', 
                      onChanged: ((value) => updateSearchBy(value!))
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height:20,
              ),
              // Search Insertion Text Field.
              Container(
                padding: const EdgeInsets.all(5),
                decoration: BoxDecoration(
                  color: const Color.fromRGBO(244, 243, 243, 1),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: TextField(
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    prefixIcon: const Icon(Icons.search, 
                      color:Colors.black87,
                    ),
                    hintText: "Search For ${findHint()}",
                    hintStyle: const TextStyle(
                      color:Colors.grey, 
                      fontSize: 15,
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height:10,
              ),
              /* Either Display Searched Store, Searched 
              Alcohol, Searched Suburb, Alcohol Not Found Error Page, 
              Store Not Found Error Page or Suburb Not Found Error Page.*/
              showWhatToDisplay(),
            ]
          ),
        );

        Widget showWhatToDisplay(){
          switch(searchCategory){
            case SearchCategory.searchByAlcohol:
              return AlcoholSearchWidget(searchedAlcohol: query!);
            case SearchCategory.searchByStore:
              return StoreNameSearchWidget(storeName: query!);
            default:
              return SuburbSearchWidget(suburbName:query!);
          }
        }

      String findHint(){
        switch(searchCategory){
          case SearchCategory.searchByAlcohol:
            return 'Beer, Vodka, Wine...';
          case SearchCategory.searchByStore:
            return 'A Store Name';
          default:
            return 'Your Suburb';
        }
      }
}