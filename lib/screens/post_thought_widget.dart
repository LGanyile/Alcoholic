import 'package:flutter/material.dart';

import 'thought_widget.dart';

class PostThoughtWidget extends ThoughtWidget{

  bool isMember;

  PostThoughtWidget({
    required this.isMember,
    required message,
    required color,

  }):super(message:message, color: color);
  
  @override 
  PostThoughtWidgetState createState()=>PostThoughtWidgetState();

}

class PostThoughtWidgetState extends State<PostThoughtWidget>{

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
                ),
              ),
            ],)
          ],
        ),
        Row(
          children: [
            Column(
              children: [
                Text('$widget.time.hour:$widget.time.minute $widget.time.hour>=12?PM:AM',
                  style:const TextStyle(
                    color: Colors.grey,
                    fontSize: 15,
                    fontWeight: FontWeight.bold
                  ),
                ),
                const SizedBox(height: 5,),
                Container(
                  width: 40,
                  height: 20,
                  decoration: BoxDecoration(
                    color: widget.isMember?Colors.green:Colors.red,
                    borderRadius: BorderRadius.circular(30),
                  ),
                  alignment: Alignment.center,
                  child: Text(widget.isMember?'Member':'Stranger',
                  style: const TextStyle(
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
                // Like Icon,
                IconButton(
                  onPressed: ()=>{
                    // Should Be Replaced With Like Button.
                  }, 
                  icon: const Icon(
                    Icons.favorite,
                  ),
                ),
                // Emojies Icon,
                IconButton(
                  onPressed: ()=>{
                    // Show All Possible Emojies.
                  }, 
                  icon: const Icon(
                    Icons.emoji_emotions,
                  ),
                ),
                
                // Dislike Icon
              ],
            ),
          ],
        ),
      ],
    ),
  );
}