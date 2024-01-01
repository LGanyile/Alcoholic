import 'package:flutter/material.dart';
import '../main.dart';
import 'communications/communication_screen.dart';
import 'drinks_screen.dart';
import 'home_widget.dart';
import 'stores_widget.dart';

class StartScreen extends StatefulWidget{

  static int currentIndex = 0;

  @override
  _StartScreenState createState()=> _StartScreenState();
}

class _StartScreenState extends State<StartScreen>{

  
  List<String> titles = ['Wins', 'Searches', 'Posts', 'Communications'];



  @override 
  Widget build(BuildContext context)=>DefaultTabController(
    
    length: 4,
    child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.menu),
            iconSize: 30,
            color: Colors.white,
            onPressed: (() {
              
            }),
          ),
          title: Text(titles[StartScreen.currentIndex], 
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          elevation: 0,
          centerTitle: true,
          actions: [
            // Not Needed
            IconButton(
              icon: const Icon(Icons.search),
              iconSize: 30,
              color: Colors.white,
              onPressed: (() {
                
              }),
            ),
            IconButton(
              icon: const Icon(Icons.notifications_none),
              iconSize: 30,
              color: Colors.white,
              onPressed: (() {
                
              }),
            ),
          ],
          flexibleSpace: Container(
            decoration: BoxDecoration(
              gradient: MyApplication.appBarlinearGradient,
            ),
          ),
          bottom: const TabBar(
            indicatorColor: Colors.white,
            indicatorWeight: 5,
            tabs: [
              Tab(
                icon:Icon(Icons.home),
                text: 'Home',
              ),
              Tab(
                icon:Icon(Icons.message),
                text: 'Drinks',
              ),
              Tab(
                icon:Icon(Icons.local_drink),
                text: 'Stores',
              ),
              Tab(
                icon:Icon(Icons.manage_accounts),
                text: 'Chats',
              ),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            HomeWidget(),
            DrinksScreen(),
            StoresWidget(),
            CommunicationScreen(),
          ]
        ),
    ),
  );
}