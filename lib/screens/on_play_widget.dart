import 'package:flutter/material.dart';

import 'competition_widget.dart';
import 'page_navigation.dart';
import 'store_info_widget.dart';

class OnPlayWidget extends StoreInfoWidget{

  OnPlayWidget({
    required store
  }):super(store:store);
  
  @override 
  State createState() =>OnPlayWidgetState();

}

class OnPlayWidgetState extends State<OnPlayWidget>{

  @override
  Widget build(BuildContext context) {
    widget.fillColumn(context);
    return Column(
        children: [
          widget.column,
          Center(
          child: IconButton(
            onPressed: (() => Navigator.of(context).push(
            CustomPageRoute( child: CompetitionWidget(store: widget.store,)),)),
            icon: const Icon(
              Icons.play_circle,
              size: 20,
            ),
          ),
        ),
        ],
      );
  }
}