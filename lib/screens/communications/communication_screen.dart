import 'package:flutter/material.dart';
import '/main.dart';
import '/models/utilities.dart';
import '../../screens/communications/chat_screen.dart';
import '../../screens/entrance_widget.dart';

class CommunicationScreen extends StatefulWidget{
  @override 
  _CommunicationScreenState createState()=>_CommunicationScreenState();
}

class _CommunicationScreenState extends State<CommunicationScreen>{

  @override 
  Widget build(BuildContext context)=>
  MyApplication.userPhoneNumber==''?const EntranceWidget(toPage: ToPage.chatsWidget,)
  :ChatsScreen();
}