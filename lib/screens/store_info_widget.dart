import 'package:flutter/material.dart';

import '../main.dart';
import '../models/old_store.dart';

class StoreInfoWidget extends StatefulWidget{

  Store store;
  Column column = Column();

  StoreInfoWidget({super.key, 
    required this.store,
  });

  int findSpecialDateIndex(){

    for(int i = 0; i < store.competitions.length;i++){
      if(store.competitions[i].dateTime.year==DateTime.now().year &&
      store.competitions[i].dateTime.month==DateTime.now().month &&
      store.competitions[i].dateTime.day==DateTime.now().day){
        return i;
      }
    }
    return -1;
  }

  

  void fillColumn(BuildContext context){
    column = Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          
          // The Image Of A Store On Which The Winner Won From. 
                AspectRatio(
                  aspectRatio: 3/2,
                  child: Container(
                    margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
                    decoration: BoxDecoration(
                      color: Colors.orange,
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        fit: BoxFit.cover,
                        image: NetworkImage(store.picPath)
                      ),
                    ),
                  )
                ),
                const SizedBox(height: 8),
                // Information About The Hosting Store.
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // The Name Of A Store On Which The Winner Won From.
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Store Name',
                          style: TextStyle(
                            fontSize: MyApplication.infoTextFontSize,
                          ),
                        ),
                        Text(store.storeName,
                          style: TextStyle(
                            fontSize: MyApplication.infoTextFontSize,
                          ),
                        ),
                     ],
                    ),
                    // The Address Of A Store On Which The Winner Won From.
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Store Address',
                          style: TextStyle(
                            fontSize: MyApplication.infoTextFontSize,
                          ),
                        ),
                        Text(store.address,
                          style: TextStyle(
                            fontSize: MyApplication.infoTextFontSize,
                          ),
                        ),
                     ],
                    ),
                  ],
                ),
                const SizedBox(height: 8),
        ],
      );
  }
  
  @override
  State<StatefulWidget> createState() => StoreInfoWidgetState();
  
}

class StoreInfoWidgetState extends State<StoreInfoWidget>{

  
  @override
  Widget build(BuildContext context){
    widget.fillColumn(context);
    return Expanded(
      child: widget.column,
    );
  }

}