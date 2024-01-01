import 'package:flutter/material.dart';

typedef UpdateSelectedIndex = Function(int newIndex);

class CategorySelectorWidget extends StatefulWidget{

  UpdateSelectedIndex onSelectedIndexChange;
  int selectedIndex;

  CategorySelectorWidget({ 
    required this.selectedIndex,
    required this.onSelectedIndexChange,
  });

  @override 
  _CategorySelectorWidgetState createState()=> _CategorySelectorWidgetState();
}

class _CategorySelectorWidgetState extends State<CategorySelectorWidget>{
  List<String> categories = ['Messages', 'Online', 'Stores', 'Claims'];

  @override 
  Widget build(BuildContext context)=>Column(
    children: [
      Container(
        color: Theme.of(context).primaryColor,
        height: 90,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: categories.length,
          itemBuilder: ((context, index) {
            return GestureDetector(
              onTap: (() => setState(() {
                widget.selectedIndex = index;
                widget.onSelectedIndexChange(index);
              })),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 30,
                ),
                child: Text(categories[index],
                  style: TextStyle(
                    color: index==widget.selectedIndex?Colors.white: Colors.white60,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.2,
                  ),
                ),
              ),
            );
          })
        ),
      ),
    ],
  );

}

