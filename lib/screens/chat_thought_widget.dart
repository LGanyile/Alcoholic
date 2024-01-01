import 'package:flutter/material.dart';
import '../screens/thought_widget.dart';

class ChatThoughtsWidget extends ThoughtWidget{
  
  

  ChatThoughtsWidget({
    required message,
    required color,

  }):super(message:message, color: color);
  
  @override 
  ChatThoughtsWidgetState createState()=>ChatThoughtsWidgetState();

}

class ChatThoughtsWidgetState extends State<ChatThoughtsWidget>{

  // The Parent List Builder Should Be Wrapped With The ClipRRect Widget 
  // With 30 Top Right And Top Left Radius.
  @override 
  Widget build(BuildContext context)=>Container(
    margin: const EdgeInsets.only(
      top: 5, 
      bottom: 5,
      right: 20,
    ),
    padding: const EdgeInsets.symmetric(
      horizontal: 20,
      vertical: 10,
    ),
    decoration: BoxDecoration(
      color:widget.color ?? Colors.white,
      borderRadius: const BorderRadius.only(
        topRight: Radius.circular(20),
        bottomRight: Radius.circular(20),
      )
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            CircleAvatar(
              radius: 35,
              backgroundImage: NetworkImage(widget.message.sender.findImageLocation()),
            ),
            const SizedBox(width: 10,),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
              Text(widget.message.sender.username,
                style: const TextStyle(
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: FontWeight.bold
                ),
              ),
              const SizedBox(height: 5,),
              Container(
                width: MediaQuery.of(context).size.width/0.2,
                child: Text(widget.message.text,
                  style: const TextStyle(
                    color: Colors.blueGrey,
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              )
            ],)
          ],
        ),
        Row(
          children: [
            Column(
              children: [
                Text('${widget.message.sentTime.hour}:${widget.message.sentTime.minute} ${widget.message.sentTime.hour>=12}?PM:AM',
                  style:const TextStyle(
                    color: Colors.grey,
                    fontSize: 15,
                    fontWeight: FontWeight.bold
                  ),
                ),
                const SizedBox(height: 5,),
                widget.message.isRead?const Text(''):Container(
                  width: 40,
                  height: 20,
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(30),
                  ),
                  alignment: Alignment.center,
                  child: const Text('New',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),

                ),
              ],
            ),
            Column(
              children: [
                // Emojies Icon,
                // Like Icon,
                // Dislike Icon
              ],
            ),
          ],
        ),
      ],
    ),
  );
}